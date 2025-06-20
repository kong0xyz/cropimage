import { db } from "@/db";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { stripe } from "@better-auth/stripe"
import { nextCookies } from "better-auth/next-js";
import Stripe from "stripe"
import { sendVerificationEmail, sendResetPasswordEmail } from "@/lib/email";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

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
    },
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

  // 邮箱验证配置
  emailVerification: {
    sendOnSignUp: true, // 注册时自动发送验证邮箱
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendVerificationEmail({
        to: user.email,
        name: user.name || "用户",
        verificationUrl: url,
      });
    },
    autoSignInAfterVerification: true, // 验证后自动登录
  },

  // 邮箱密码配置
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // 强制邮箱验证后才能登录
    autoSignIn: false, // 注册后不自动登录，需要先验证邮箱
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendResetPasswordEmail({
        to: user.email,
        name: user.name || "用户",
        resetUrl: url,
      });
    },
    resetPasswordTokenExpiresIn: 3600, // 1小时过期
  },

  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
    }),
    nextCookies(), // 必须放在最后，确保服务端API调用能正确处理session cookies
  ],
});

// 导出类型
export type Session = typeof auth.$Infer.Session;
