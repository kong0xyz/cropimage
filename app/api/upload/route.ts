import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Not found file" }, { status: 400 });
    }

    // 检查是否为图片
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be image format" },
        { status: 400 }
      );
    }

    // 读取文件内容
    const buffer = await file.arrayBuffer();

    // 上传到Sanity - 使用writeClient
    const asset = await writeClient.assets.upload(
      "image",
      Buffer.from(buffer),
      {
        filename: file.name,
        contentType: file.type,
      }
    );

    return NextResponse.json({
      success: true,
      assetId: asset._id,
      url: asset.url,
    });
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Upload failed", message: error.message },
      { status: 500 }
    );
  }
}

// 限制请求体大小为10MB
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
