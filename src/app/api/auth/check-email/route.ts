import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "邮箱地址是必需的" },
        { status: 400 }
      );
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "邮箱格式不正确" },
        { status: 400 }
      );
    }

    // 查询数据库中是否存在该邮箱
    const existingUser = await db
      .select({ id: user.id, email: user.email })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    const exists = existingUser.length > 0;

    return NextResponse.json({ exists });
  } catch (error) {
    console.error("检查邮箱时出错:", error);
    return NextResponse.json(
      { error: "服务器内部错误" },
      { status: 500 }
    );
  }
} 