import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user, userDeletionRecord } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";

interface RestoreAccountRequest {
  email: string;
  restoreReason?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, restoreReason = "用户请求恢复" }: RestoreAccountRequest = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "邮箱地址是必需的" },
        { status: 400 }
      );
    }

    // 查找被软删除的用户
    const deletedUser = await db
      .select()
      .from(user)
      .where(and(
        eq(user.email, email),
        eq(user.isDeleted, true)
      ))
      .limit(1);

    if (deletedUser.length === 0) {
      return NextResponse.json(
        { error: "未找到可恢复的账户" },
        { status: 404 }
      );
    }

    const userData = deletedUser[0];

    // 查找最近的删除记录
    const deletionRecords = await db
      .select()
      .from(userDeletionRecord)
      .where(and(
        eq(userDeletionRecord.userId, userData.id),
        eq(userDeletionRecord.canRestore, true),
        isNull(userDeletionRecord.restoredAt)
      ))
      .orderBy(userDeletionRecord.requestedAt)
      .limit(1);

    if (deletionRecords.length === 0) {
      return NextResponse.json(
        { error: "该账户不允许恢复或已被永久删除" },
        { status: 400 }
      );
    }

    const deletionRecord = deletionRecords[0];

    // 检查是否超过恢复期限
    const now = new Date();
    const scheduledDeletionAt = deletionRecord.scheduledDeletionAt;
    
    if (scheduledDeletionAt && now > scheduledDeletionAt) {
      return NextResponse.json(
        { error: "恢复期限已过，账户无法恢复" },
        { status: 400 }
      );
    }

    // 开始恢复流程
    const result = await db.transaction(async (tx) => {
      // 1. 恢复用户账户
      await tx.update(user)
        .set({
          isDeleted: false,
          deletedAt: null,
          updatedAt: now,
        })
        .where(eq(user.id, userData.id));

      // 2. 更新删除记录
      await tx.update(userDeletionRecord)
        .set({
          restoredAt: now,
          restoredBy: "user_self",
          notes: restoreReason,
        })
        .where(eq(userDeletionRecord.id, deletionRecord.id));

      return { userId: userData.id, email: userData.email };
    });

    // 记录恢复操作
    console.log(`用户账户已恢复:`, {
      userId: result.userId,
      email: result.email,
      deletionRecordId: deletionRecord.id,
      restoreReason,
      timestamp: now.toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "账户恢复成功",
      details: {
        userId: result.userId,
        email: result.email,
        restoredAt: now,
        originalDeletionDate: deletionRecord.requestedAt,
        deletionReason: deletionRecord.deletionReason,
      },
    });

  } catch (error) {
    console.error("恢复账户时出错:", error);
    return NextResponse.json(
      { error: "恢复账户失败，请稍后重试" },
      { status: 500 }
    );
  }
}

// 获取可恢复的账户信息
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: "邮箱地址是必需的" },
        { status: 400 }
      );
    }

    // 查找删除记录
    const deletionRecords = await db
      .select()
      .from(userDeletionRecord)
      .where(eq(userDeletionRecord.userEmail, email))
      .orderBy(userDeletionRecord.requestedAt);

    if (deletionRecords.length === 0) {
      return NextResponse.json(
        { error: "未找到删除记录" },
        { status: 404 }
      );
    }

    // 检查当前状态
    const latestRecord = deletionRecords[0];
    const now = new Date();
    const canRestore = latestRecord.canRestore && 
                      !latestRecord.restoredAt && 
                      (!latestRecord.scheduledDeletionAt || now <= latestRecord.scheduledDeletionAt);

    return NextResponse.json({
      canRestore,
      records: deletionRecords.map(record => ({
        ...record,
        totalSpent: record.totalSpent ? record.totalSpent / 100 : 0,
        isExpired: record.scheduledDeletionAt ? now > record.scheduledDeletionAt : false,
      })),
    });

  } catch (error) {
    console.error("获取删除记录时出错:", error);
    return NextResponse.json(
      { error: "获取删除记录失败" },
      { status: 500 }
    );
  }
} 