import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    // 检查所有可能使用 slug 的文档类型
    const query = `*[
      _type in ["post", "product", "category", "tag", "collection"] && 
      slug.current == $slug
    ][0]`;
    
    const exists = await client.fetch(query, { slug });

    return NextResponse.json({ exists: !!exists });
  } catch (error) {
    console.error("Error checking slug:", error);
    return NextResponse.json(
      { error: "Failed to check slug" },
      { status: 500 }
    );
  }
} 