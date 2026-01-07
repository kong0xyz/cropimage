import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface CropParams {
  x: number;
  y: number;
  width: number;
  height: number;
  format: 'png' | 'jpeg' | 'webp' | 'avif';
  quality: number;
  originalSize?: number; // 原始文件大小（字节）
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const params = JSON.parse(formData.get('params') as string) as CropParams;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // 记录原始文件大小
    const originalSize = imageFile.size;

    // 将 File 转换为 Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 使用 Sharp 处理图像
    let sharpInstance = sharp(buffer);

    // 获取原始图像信息
    const metadata = await sharpInstance.metadata();

    // 裁剪
    sharpInstance = sharpInstance.extract({
      left: Math.round(params.x),
      top: Math.round(params.y),
      width: Math.round(params.width),
      height: Math.round(params.height),
    });

    console.log('Crop dimensions:', params.width, 'x', params.height);

    // 计算裁剪后的像素比例
    const pixelRatio = (params.width * params.height) / ((metadata.width || 1) * (metadata.height || 1));
    console.log('Pixel ratio:', pixelRatio.toFixed(2));

    // 根据格式转换和压缩
    let outputBuffer: Buffer;
    let quality = Math.round(params.quality * 100);

    switch (params.format) {
      case 'avif':
        // AVIF 优化策略：平衡质量、大小和速度
        const originalFileSize = params.originalSize || originalSize;
        
        // 平衡策略：适当降低质量，适中压缩力度
        if (originalFileSize < 200 * 1024) {
          // 小于 200KB：质量 65
          quality = Math.min(quality, 65);
        } else if (originalFileSize < 500 * 1024) {
          // 200KB - 500KB：质量 70
          quality = Math.min(quality, 70);
        } else {
          // 大于 500KB：质量 75
          quality = Math.min(quality, 75);
        }

        outputBuffer = await sharpInstance
          .avif({
            quality,
            effort: 7, // 平衡速度和压缩效果
            chromaSubsampling: '4:2:0',
            lossless: false,
          })
          .toBuffer();
        break;
      case 'webp':
        outputBuffer = await sharpInstance
          .webp({
            quality,
            effort: 4,
          })
          .toBuffer();
        break;
      case 'jpeg':
        outputBuffer = await sharpInstance
          .jpeg({
            quality,
            mozjpeg: true,
          })
          .toBuffer();
        break;
      case 'png':
      default:
        outputBuffer = await sharpInstance
          .png({
            quality,
            compressionLevel: 9,
          })
          .toBuffer();
        break;
    }

    // 返回处理后的图像
    return new NextResponse(outputBuffer as any, {
      headers: {
        'Content-Type': `image/${params.format}`,
        'Content-Length': outputBuffer.length.toString(),
        'Content-Disposition': `attachment; filename="cropped.${params.format}"`,
      },
    });
  } catch (error) {
    console.error('Image processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
