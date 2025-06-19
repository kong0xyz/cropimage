import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  // 邮箱密码认证
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // 暂时禁用邮箱验证
    autoSignIn: true,
  },

  // 社交登录配置
  socialProviders: {
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID!,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET!,
    },
    microsoft: {
      clientId: process.env.BETTER_AUTH_MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.BETTER_AUTH_MICROSOFT_CLIENT_SECRET!,
    },
    discord: {
      clientId: process.env.BETTER_AUTH_DISCORD_CLIENT_ID!,
      clientSecret: process.env.BETTER_AUTH_DISCORD_CLIENT_SECRET!,
    }
  },

  // 会话配置
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 天
    updateAge: 60 * 60 * 24, // 每天更新一次
  },

  // 密钥配置（必需）
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "fallback-secret-for-development-only-change-in-production",

  // 基础 URL
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,

  // 信任的来源
  trustedOrigins: [
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
    "http://localhost:3000",
  ],
});

// 导出类型
export type Session = typeof auth.$Infer.Session;
