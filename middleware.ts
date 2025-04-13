// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";
import { featureSettings } from "@/config/site";

// const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
// export default clerkMiddleware(() => {});
// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect();
//   }
// });

export function middleware(request: NextRequest) {
  // 获取请求路径
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/submit") && !featureSettings.submissionEnabled) {
    // redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  // sanity write api
  if (
    (pathname.startsWith("/api/submit") ||
      pathname.startsWith("/api/upload")) &&
    !featureSettings.submissionEnabled
  ) {
    // return 403
    return NextResponse.json(
      { message: "Submission is disabled" },
      { status: 403 }
    );
  }

  // 对于其他路径，继续处理请求
  return NextResponse.next();
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
