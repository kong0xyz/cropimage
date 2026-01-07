import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";
export const maxDuration = 30;

interface CompressParams {
  format: "png" | "jpeg" | "webp" | "avif";
  quality: number;
  maxWidthOrHeight?: number;
  originalSize?: number;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;
    const params = JSON.parse(
      formData.get("params") as string
    ) as CompressParams;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    const originalSize = imageFile.size;

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let sharpInstance = sharp(buffer);
    const metadata = await sharpInstance.metadata();

    // 如果指定了最大尺寸，进行等比缩放
    if (params.maxWidthOrHeight && metadata.width && metadata.height) {
      const maxDim = Math.max(metadata.width, metadata.height);
      if (maxDim > params.maxWidthOrHeight) {
        sharpInstance = sharpInstance.resize(
          params.maxWidthOrHeight,
          params.maxWidthOrHeight,
          {
            fit: "inside",
            withoutEnlargement: true,
          }
        );
      }
    }

    let { quality } = params;
    let outputBuffer: Buffer;

    switch (params.format) {
      case "png":
        outputBuffer = await sharpInstance
          .png({
            quality: Math.round(quality * 100),
            compressionLevel: 9,
          })
          .toBuffer();
        break;

      case "jpeg":
        outputBuffer = await sharpInstance
          .jpeg({
            quality: Math.round(quality * 100),
            mozjpeg: true,
          })
          .toBuffer();
        break;

      case "webp":
        outputBuffer = await sharpInstance
          .webp({
            quality: Math.round(quality * 100),
            effort: 6,
          })
          .toBuffer();
        break;

      case "avif":
        const originalFileSize = params.originalSize || originalSize;

        // 平衡策略：适当降低质量，适中压缩力度
        if (originalFileSize < 200 * 1024) {
          quality = Math.min(quality, 0.65);
        } else if (originalFileSize < 500 * 1024) {
          quality = Math.min(quality, 0.7);
        } else {
          quality = Math.min(quality, 0.75);
        }

        outputBuffer = await sharpInstance
          .avif({
            quality: Math.round(quality * 100),
            effort: 7,
            chromaSubsampling: "4:2:0",
            lossless: false,
          })
          .toBuffer();
        break;

      default:
        return NextResponse.json(
          { error: "Unsupported format" },
          { status: 400 }
        );
    }

    return new NextResponse(new Uint8Array(outputBuffer), {
      headers: {
        "Content-Type": `image/${params.format}`,
        "Content-Length": outputBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Compression error:", error);
    return NextResponse.json(
      { error: "Failed to compress image" },
      { status: 500 }
    );
  }
}
