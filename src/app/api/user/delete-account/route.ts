import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user, subscription, account, session as sessionTable, userDeletionRecord } from "@/db/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { nanoid } from "nanoid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

interface DeleteAccountRequest {
  confirmationText: string;
  password?: string;
  reason: string;
  exportData?: boolean;
  deletionType?: "soft" | "hard" | "scheduled";
  scheduledDays?: number; // 延迟删除天数
}

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "未授权访问" },
        { status: 401 }
      );
    }

    const { 
      confirmationText, 
      reason, 
      exportData, 
      deletionType = "soft",
      scheduledDays = 30 
    }: DeleteAccountRequest = await request.json();

    // 验证确认文本
    if (confirmationText !== "DELETE") {
      return NextResponse.json(
        { error: "确认文本不正确，请输入 DELETE" },
        { status: 400 }
      );
    }

    // 验证删除原因
    if (!reason || reason.trim().length < 5) {
      return NextResponse.json(
        { error: "请提供详细的删除原因（至少5个字符）" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // 获取用户完整信息
    const userData = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (userData.length === 0) {
      return NextResponse.json(
        { error: "用户不存在" },
        { status: 404 }
      );
    }

    const currentUser = userData[0];

    // 检查用户是否已被软删除
    if (currentUser.isDeleted) {
      return NextResponse.json(
        { error: "账户已被删除" },
        { status: 400 }
      );
    }

    // 获取账户状态信息用于记录
    let accountStatus = {
      linkedAccounts: 0,
      activeSessions: 0,
      stripeInfo: {
        hasCustomer: false,
        activeSubscriptions: 0,
        totalSpent: 0,
      }
    };

    // 统计关联账户
    const linkedAccounts = await db
      .select()
      .from(account)
      .where(eq(account.userId, userId));
    accountStatus.linkedAccounts = linkedAccounts.length;

    // 统计活跃会话
    const activeSessions = await db
      .select()
      .from(sessionTable)
      .where(eq(sessionTable.userId, userId));
    accountStatus.activeSessions = activeSessions.length;

    // 处理 Stripe 相关数据
    let stripeCustomerId = currentUser.stripeCustomerId;
    let hasActiveSubscriptions = false;
    let totalSpent = 0;

    if (stripeCustomerId) {
      try {
        // 获取 Stripe 客户信息
        const customer = await stripe.customers.retrieve(stripeCustomerId);
        
        if (customer && !customer.deleted) {
          accountStatus.stripeInfo.hasCustomer = true;

          // 获取活跃订阅
          const subscriptions = await stripe.subscriptions.list({
            customer: stripeCustomerId,
            status: 'active',
          });

          hasActiveSubscriptions = subscriptions.data.length > 0;
          accountStatus.stripeInfo.activeSubscriptions = subscriptions.data.length;

          // 取消活跃订阅（仅在硬删除时）
          if (deletionType === "hard" && hasActiveSubscriptions) {
            for (const subscription of subscriptions.data) {
              await stripe.subscriptions.cancel(subscription.id, {
                cancellation_details: {
                  comment: `用户删除账户时自动取消 - 原因: ${reason}`,
                },
              });
            }
          }

          // 获取总消费金额
          const invoices = await stripe.invoices.list({
            customer: stripeCustomerId,
            limit: 100,
          });

          totalSpent = invoices.data.reduce((total, invoice) => {
            return total + (invoice.amount_paid || 0);
          }, 0);
          accountStatus.stripeInfo.totalSpent = totalSpent / 100;

          // 仅在硬删除时删除 Stripe 客户
          if (deletionType === "hard") {
            await stripe.customers.del(stripeCustomerId);
          }
        }
      } catch (stripeError) {
        console.error("处理 Stripe 数据时出错:", stripeError);
        // 继续删除流程，但记录错误
      }
    }

    // 获取请求信息
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // 计算删除时间
    const now = new Date();
    const scheduledDeletionAt = deletionType === "scheduled" ? 
      new Date(now.getTime() + scheduledDays * 24 * 60 * 60 * 1000) : 
      (deletionType === "soft" ? new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) : null);

    // 开始数据库事务
    const result = await db.transaction(async (tx) => {
      // 1. 创建删除记录
      const deletionRecordId = nanoid();
      await tx.insert(userDeletionRecord).values({
        id: deletionRecordId,
        userId: userId,
        userEmail: currentUser.email,
        userName: currentUser.name,
        deletionReason: reason.trim(),
        deletionType: deletionType,
        requestedAt: now,
        scheduledDeletionAt: scheduledDeletionAt,
        actualDeletionAt: deletionType === "hard" ? now : null,
        deletedBy: "user_self",
        ipAddress: ipAddress,
        userAgent: userAgent,
        accountStatus: JSON.stringify(accountStatus),
        stripeCustomerId: stripeCustomerId,
        hasActiveSubscriptions: hasActiveSubscriptions,
        totalSpent: totalSpent,
        linkedAccountsCount: accountStatus.linkedAccounts,
        canRestore: deletionType !== "hard",
      });

      if (deletionType === "hard") {
        // 硬删除：真实删除所有数据
        await tx.delete(sessionTable).where(eq(sessionTable.userId, userId));
        await tx.delete(account).where(eq(account.userId, userId));
        await tx.delete(subscription).where(eq(subscription.stripeCustomerId, stripeCustomerId || ''));
        await tx.delete(user).where(eq(user.id, userId));
      } else {
        // 软删除：标记为已删除，清除敏感会话
        await tx.update(user)
          .set({
            isDeleted: true,
            deletedAt: now,
            // 可选：清除敏感信息
            // name: "[已删除用户]",
            // image: null,
          })
          .where(eq(user.id, userId));

        // 删除所有活跃会话（强制退出）
        await tx.delete(sessionTable).where(eq(sessionTable.userId, userId));

        // 软删除时可以选择保留账户关联信息用于恢复
        // 或者也可以删除：await tx.delete(account).where(eq(account.userId, userId));
      }

      return { deletionRecordId, deletionType };
    });

    // 记录删除操作日志
    console.log(`用户账户删除请求处理完成:`, {
      userId,
      email: currentUser.email,
      deletionType,
      reason: reason.substring(0, 100),
      hasActiveSubscriptions,
      totalSpent: totalSpent / 100,
      timestamp: now.toISOString(),
      deletionRecordId: result.deletionRecordId,
    });

    // 根据删除类型返回不同的响应
    let message = "";
    let nextSteps = [];

    switch (deletionType) {
      case "hard":
        message = "账户已永久删除";
        nextSteps = ["所有数据已被永久清除", "Stripe订阅已取消", "此操作无法撤销"];
        break;
      case "scheduled":
        message = `账户将在${scheduledDays}天后删除`;
        nextSteps = [
          `在${scheduledDeletionAt?.toLocaleDateString()}之前可以取消删除`,
          "期间账户将被暂时停用",
          "可以联系客服恢复账户"
        ];
        break;
      default: // soft
        message = "账户已停用，30天内可恢复";
        nextSteps = [
          "账户数据已保留30天",
          "期间可以联系客服恢复",
          "30天后将自动永久删除"
        ];
        break;
    }

    return NextResponse.json({
      success: true,
      message,
      details: {
        deletionType,
        deletionRecordId: result.deletionRecordId,
        scheduledDeletionAt,
        canRestore: deletionType !== "hard",
        hadActiveSubscriptions: hasActiveSubscriptions,
        stripeCustomerDeleted: deletionType === "hard" && !!stripeCustomerId,
        nextSteps,
      },
    });

  } catch (error) {
    console.error("删除账户时出错:", error);
    return NextResponse.json(
      { error: "删除账户失败，请稍后重试" },
      { status: 500 }
    );
  }
} 