import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user, account, session } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // 验证用户身份
    const sessionData = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionData?.user) {
      return NextResponse.json(
        { error: "未授权访问" },
        { status: 401 }
      );
    }

    const userId = sessionData.user.id;

    // 获取用户基本信息
    const userData = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (userData.length === 0) {
      return NextResponse.json(
        { error: "用户不存在" },
        { status: 404 }
      );
    }

    // 获取关联的社交账户
    const linkedAccounts = await db
      .select({
        id: account.id,
        providerId: account.providerId,
        accountId: account.accountId,
        createdAt: account.createdAt,
      })
      .from(account)
      .where(eq(account.userId, userId));

    // 获取会话历史（最近10个）
    const recentSessions = await db
      .select({
        id: session.id,
        createdAt: session.createdAt,
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,
      })
      .from(session)
      .where(eq(session.userId, userId))
      .orderBy(session.createdAt)
      .limit(10);

    // 构建导出数据
    const exportData = {
      exportInfo: {
        exportedAt: new Date().toISOString(),
        exportedBy: userData[0].email,
        version: "1.0",
      },
      personalInfo: {
        profile: userData[0],
        linkedAccounts: linkedAccounts.map(account => ({
          provider: account.providerId,
          accountId: account.accountId,
          linkedAt: account.createdAt,
        })),
      },
      activityData: {
        recentSessions: recentSessions.map(s => ({
          sessionId: s.id,
          createdAt: s.createdAt,
          ipAddress: s.ipAddress ? s.ipAddress.substring(0, s.ipAddress.lastIndexOf('.')) + '.***' : null, // 部分隐藏IP
          userAgent: s.userAgent,
        })),
      },
      metadata: {
        totalLinkedAccounts: linkedAccounts.length,
        totalSessions: recentSessions.length,
        accountAge: userData[0].createdAt ? 
          Math.floor((new Date().getTime() - new Date(userData[0].createdAt).getTime()) / (1000 * 60 * 60 * 24)) + ' 天' : 
          '未知',
      },
    };

    // 设置响应头以下载文件
    const fileName = `${userData[0].email.replace('@', '_at_')}_data_export_${new Date().toISOString().split('T')[0]}.json`;
    
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error("导出用户数据时出错:", error);
    return NextResponse.json(
      { error: "导出数据失败，请稍后重试" },
      { status: 500 }
    );
  }
} 