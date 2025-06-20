import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { verification, user } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, code, password, name } = await request.json();

    // 验证必填字段
    if (!email || !code || !password || !name) {
      return NextResponse.json(
        { error: "所有字段都是必需的" },
        { status: 400 }
      );
    }

    // 验证密码强度
    if (password.length < 8) {
      return NextResponse.json(
        { error: "密码至少需要8个字符" },
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

    try {
      // 使用 better-auth 的 signUp 方法创建用户
      const signUpResult = await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });

      if (!signUpResult || !signUpResult.user) {
        return NextResponse.json(
          { error: "注册失败，请稍后重试" },
          { status: 500 }
        );
      }

      // 删除已使用的验证码
      await db.delete(verification).where(eq(verification.identifier, email));

      // 更新用户邮箱验证状态
      await db
        .update(user)
        .set({
          emailVerified: true,
        })
        .where(eq(user.id, signUpResult.user.id));

      // 记录操作日志
      console.log(`用户注册成功: ${email}, 用户ID: ${signUpResult.user.id}`);

      return NextResponse.json({
        success: true,
        message: "注册成功！即将跳转到控制台",
        user: signUpResult.user,
      });
    } catch (authError: any) {
      console.error("Better Auth 注册错误:", authError);

      // 如果是重复邮箱错误，返回友好提示
      if (authError?.message && authError.message.includes("duplicate")) {
        return NextResponse.json(
          { error: "该邮箱已被注册，请使用其他邮箱或直接登录" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "注册失败，请稍后重试" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("验证并注册用户时出错:", error);
    return NextResponse.json(
      { error: "注册失败，请稍后重试" },
      { status: 500 }
    );
  }
}
