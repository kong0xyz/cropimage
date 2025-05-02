import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { featureSettings } from "@/config/feature";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import type { NextFetchEvent } from "next/server";

import { createI18nMiddleware } from "fumadocs-core/i18n";
import { fumadocsI18n } from "@/config/i18n";
import { denyRoutes } from "./config/menu";

// 定义公共路由
const isPublicRoute = createRouteMatcher([
  "/pricing",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)",
]);

const i18nMiddleware = createI18nMiddleware(fumadocsI18n);
// 创建国际化中间件
const intlMiddleware = createIntlMiddleware(routing);

// 组合中间件
export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  // 1. 处理国际化路由
  const response = await intlMiddleware(request);

  // 2. 处理功能开关
  const { pathname } = request.nextUrl;

  for (const route of denyRoutes) {
    if (pathname.startsWith(route)) {
      console.warn(`Denied route: ${pathname}`);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/submit") && !featureSettings.submissionEnabled) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (pathname.startsWith("/api/submit") ||
      pathname.startsWith("/api/upload")) &&
    !featureSettings.submissionEnabled
  ) {
    return NextResponse.json(
      { message: "Submission is disabled" },
      { status: 403 }
    );
  }

  // 3. 认证处理
  const auth = await clerkMiddleware()(request, event);

  return response;
}

export const config = {
  matcher: [
    // 匹配所有路径，除了静态资源和API路由
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
