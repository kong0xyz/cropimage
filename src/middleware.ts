import { featureConfig } from "@/config/feature";
import { fumadocsI18n } from "@/config/i18n";
import { routing } from "@/i18n/routing";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { createI18nMiddleware } from "fumadocs-core/i18n";
import createIntlMiddleware from "next-intl/middleware";
import type { NextFetchEvent } from "next/server";
import { NextRequest, NextResponse } from "next/server";
import { denyRoutes } from "./config/menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSessionCookie } from "better-auth/cookies";

// 定义公共路由
const isPublicRoute = createRouteMatcher([
  "/pricing",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)",
]);
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

const i18nMiddleware = createI18nMiddleware(fumadocsI18n);
// 创建国际化中间件
const intlMiddleware = createIntlMiddleware(routing);

// 组合中间件
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 先处理国际化
  const intlResponse = intlMiddleware(request);

  // 提取语言环境
  const locale = pathname.split("/")[1];
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  // 需要认证的路径
  const protectedPaths = [
    "/dashboard",
    "/dashboard/settings",
    "/dashboard/billing",
    "/dashboard/profile",
  ];

  // 检查是否为受保护的路径
  const isProtectedPath = protectedPaths.some((path) =>
    pathWithoutLocale.startsWith(path)
  );

  if (isProtectedPath) {
    try {
      // 验证会话
      const sessionCookie = getSessionCookie(request);
      if (!sessionCookie) {
        // 未认证，重定向到登录页
        const signInUrl = new URL(`/${locale}/sign-in`, request.url);
        signInUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(signInUrl);
      }
    } catch (error) {
      // 会话验证失败，重定向到登录页
      const signInUrl = new URL(`/${locale}/sign-in`, request.url);
      signInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // 已登录用户访问认证页面时重定向到仪表板
  const authPaths = ["/sign-in", "/sign-up"];
  const isAuthPath = authPaths.some((path) => pathWithoutLocale === path);

  if (isAuthPath) {
    try {
      const sessionCookie = getSessionCookie(request);
      if (sessionCookie) {
        const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
        return NextResponse.redirect(dashboardUrl);
      }
    } catch (error) {
      // 会话验证失败，继续访问认证页面
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
