import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user, account, session } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET(request: NextRequest) {
  try {
    // 验证用户身份
    const sessionData = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionData?.user) {
      return NextResponse.json({ error: "未授权访问" }, { status: 401 });
    }

    const userId = sessionData.user.id;

    // 获取用户基本信息
    const userData = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        stripeCustomerId: user.stripeCustomerId,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (userData.length === 0) {
      return NextResponse.json({ error: "用户不存在" }, { status: 404 });
    }

    const currentUser = userData[0];

    // 统计关联账户数量
    const [linkedAccountsCount] = await db
      .select({ count: count() })
      .from(account)
      .where(eq(account.userId, userId));

    // 统计活跃会话数量
    const [activeSessionsCount] = await db
      .select({ count: count() })
      .from(session)
      .where(eq(session.userId, userId));

    // 检查 Stripe 订阅状态
    let stripeInfo = {
      hasCustomer: false,
      activeSubscriptions: 0,
      subscriptions: [] as any[],
      totalSpent: 0,
    };

    if (currentUser.stripeCustomerId) {
      try {
        // 获取 Stripe 客户信息
        const customer = await stripe.customers.retrieve(
          currentUser.stripeCustomerId
        );

        if (customer && !customer.deleted) {
          stripeInfo.hasCustomer = true;

          // 获取所有订阅
          const subscriptions = await stripe.subscriptions.list({
            customer: currentUser.stripeCustomerId,
            limit: 100,
          });

          stripeInfo.subscriptions = subscriptions.data.map(
            (sub: Stripe.Subscription) => ({
              id: sub.id,
              status: sub.status,
              endedAt: sub.ended_at,
              priceId: sub.items.data[0]?.price.id,
              amount: sub.items.data[0]?.price.unit_amount,
              currency: sub.items.data[0]?.price.currency,
            })
          );

          stripeInfo.activeSubscriptions = subscriptions.data.filter(
            (sub) => sub.status === "active" || sub.status === "trialing"
          ).length;

          // 获取总消费金额（最近的发票）
          const invoices = await stripe.invoices.list({
            customer: currentUser.stripeCustomerId,
            limit: 100,
          });

          stripeInfo.totalSpent =
            invoices.data.reduce((total, invoice) => {
              return total + (invoice.amount_paid || 0);
            }, 0) / 100; // 转换为实际金额
        }
      } catch (stripeError) {
        console.error("获取 Stripe 信息时出错:", stripeError);
        // 继续返回其他信息
      }
    }

    // 计算账户年龄
    const accountAge = currentUser.createdAt
      ? Math.floor(
          (new Date().getTime() - new Date(currentUser.createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

    const accountStatus = {
      user: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        emailVerified: currentUser.emailVerified,
        accountAge: accountAge,
        memberSince: currentUser.createdAt,
      },
      connections: {
        linkedAccounts: linkedAccountsCount.count,
        activeSessions: activeSessionsCount.count,
      },
      billing: stripeInfo,
      riskFactors: {
        hasActiveSubscriptions: stripeInfo.activeSubscriptions > 0,
        hasSpentMoney: stripeInfo.totalSpent > 0,
        isNewAccount: accountAge < 30, // 少于30天的新账户
        hasMultipleConnections: linkedAccountsCount.count > 1,
      },
    };

    return NextResponse.json(accountStatus);
  } catch (error) {
    console.error("获取账户状态时出错:", error);
    return NextResponse.json({ error: "获取账户状态失败" }, { status: 500 });
  }
}
