import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { verification } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // 验证必填字段
    if (!email || !code) {
      return NextResponse.json(
        { error: "邮箱和验证码都是必需的" },
        { status: 400 }
      );
    }

    // 验证验证码
    const verificationRecord = await db
      .select()
      .from(verification)
      .where(
        and(
          eq(verification.identifier, email),
          eq(verification.value, code),
          gt(verification.expiresAt, new Date())
        )
      )
      .limit(1);

    if (verificationRecord.length === 0) {
      return NextResponse.json(
        { error: "验证码无效或已过期" },
        { status: 400 }
      );
    }

    // 验证成功，但不删除验证码（等到注册完成时再删除）
    console.log(`验证码验证成功: ${email}, 验证码: ${code}`);

    return NextResponse.json({
      success: true,
      message: "验证码验证成功",
    });

  } catch (error) {
    console.error("验证验证码时出错:", error);
    return NextResponse.json(
      { error: "验证码验证失败，请稍后重试" },
      { status: 500 }
    );
  }
} 