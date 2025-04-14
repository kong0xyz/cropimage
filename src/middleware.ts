// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";
import { featureSettings } from "@/config/site";
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
// const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
// export default clerkMiddleware(() => {});
// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect();
//   }
// });

// export function middleware(request: NextRequest) {
//   // 获取请求路径
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith("/submit") && !featureSettings.submissionEnabled) {
//     // redirect to home
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // submit write api
//   if (
//     (pathname.startsWith("/api/submit") ||
//       pathname.startsWith("/api/upload")) &&
//     !featureSettings.submissionEnabled
//   ) {
//     // return 403
//     return NextResponse.json(
//       { message: "Submission is disabled" },
//       { status: 403 }
//     );
//   }

//   // 对于其他路径，继续处理请求
//   return NextResponse.next();
// }

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};