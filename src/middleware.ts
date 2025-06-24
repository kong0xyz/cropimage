import { routing } from "@/i18n/routing";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// 创建国际化中间件
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过 API 路由和静态文件
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 使用 next-intl 处理国际化路由
  try {
    return intlMiddleware(request);
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  // 匹配所有路径，但排除 API 路由、静态文件和资源文件
  matcher: [
    // 匹配所有页面路由，但排除以下路径：
    // - /api/* (API 路由)
    // - /_next/* (Next.js 内部文件)
    // - 包含点的文件路径 (静态资源)
    "/((?!api/|_next/|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
