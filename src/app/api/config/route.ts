import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Cache-Control": "public, max-age=3600", // 缓存1小时
      },
    }
  );
}
