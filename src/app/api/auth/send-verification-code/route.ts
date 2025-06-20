import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { verification, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { sendVerificationCodeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "邮箱地址是必需的" },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "邮箱格式不正确" },
        { status: 400 }
      );
    }

    // 检查邮箱是否已被注册
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "该邮箱已被注册，请使用其他邮箱或直接登录" },
        { status: 400 }
      );
    }

    // 生成6位数验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationId = nanoid();
    
    // 设置验证码过期时间（10分钟）
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 删除该邮箱的旧验证码
    await db
      .delete(verification)
      .where(eq(verification.identifier, email));

    // 保存新的验证码
    await db.insert(verification).values({
      id: verificationId,
      identifier: email,
      value: code,
      expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 发送验证码邮件
    await sendVerificationCodeEmail({
      to: email,
      code,
    });

    // 记录操作日志
    console.log(`验证码已发送到邮箱: ${email}, 验证码: ${code}, 过期时间: ${expiresAt.toISOString()}`);

    return NextResponse.json({
      success: true,
      message: "验证码已发送到您的邮箱",
      expiresIn: 600, // 10分钟，以秒为单位
    });

  } catch (error) {
    console.error("发送验证码时出错:", error);
    return NextResponse.json(
      { error: "发送验证码失败，请稍后重试" },
      { status: 500 }
    );
  }
} 