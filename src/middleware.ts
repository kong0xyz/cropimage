import { featureConfig } from "@/config/feature";
import { fumadocsI18n, Locale } from "@/config/i18n";
import { routing } from "@/i18n/routing";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { createI18nMiddleware } from "fumadocs-core/i18n";
import createIntlMiddleware from "next-intl/middleware";
import type { NextFetchEvent } from "next/server";
import { NextRequest, NextResponse } from "next/server";
import { denyRoutes } from "./config/menu";

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
export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  // 1. 处理国际化路由
  const response = intlMiddleware(request);

  // 2. 处理功能开关
  const { pathname } = request.nextUrl;

  const pathnameParts = pathname.split("/");
  const locale = pathnameParts?.[1] as Locale;

  const realPathname = routing.locales.includes(locale)
    ? `/${pathnameParts.slice(2).join("/")}`
    : pathname;

  console.log(`realPathname: ${realPathname}, pathname: ${pathname}`);

  for (const route of denyRoutes) {
    if (realPathname.startsWith(route)) {
      console.warn(`Denied route: ${realPathname}`);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (realPathname.startsWith("/submit") && !featureConfig.submissionEnabled) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (realPathname.startsWith("/api/submit") ||
      realPathname.startsWith("/api/upload")) &&
    !featureConfig.submissionEnabled
  ) {
    return NextResponse.json(
      { message: "Submission is disabled" },
      { status: 403 }
    );
  }

  // 3. 认证处理
  if (featureConfig.clerkEnabled) {
    const auth = await clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) await auth.protect();
    });
  }
  return response;
}

export const config = {
  matcher: [
    // 匹配所有路径，除了静态资源和API路由
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
