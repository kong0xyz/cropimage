"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Download,
  FileImage,
  Lock,
  Maximize2,
  RefreshCw,
  Scaling,
  Settings,
  Unlock,
  Upload,
  Zap,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface ResizeOptions {
  method: "percentage" | "pixels" | "preset";
  percentage: number;
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  quality: number;
  format: "jpeg" | "png" | "webp";
}

interface ImageInfo {
  originalFile: File;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalFormat: string;
  resizedSize?: number;
  resizedWidth?: number;
  resizedHeight?: number;
  scaleFactor?: number;
  aspectRatio?: number;
}

// 这些将在组件内部定义，以便使用翻译

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function ImageResizer() {
  const t = useTranslations("resize");
  
  const [originalImage, setOriginalImage] = useState<string>("");
  const [resizedImage, setResizedImage] = useState<string>("");
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [resizeOptions, setResizeOptions] = useState<ResizeOptions>({
    method: "percentage",
    percentage: 100,
    width: 800,
    height: 600,
    maintainAspectRatio: true,
    quality: 0.9,
    format: "jpeg",
  });
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeProgress, setResizeProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 调整大小预设配置
  const RESIZE_PRESETS = [
    { label: t("component.presets.thumbnail"), value: "thumbnail", width: 150, height: 150 },
    { label: t("component.presets.small"), value: "small", width: 400, height: 300 },
    { label: t("component.presets.medium"), value: "medium", width: 800, height: 600 },
    { label: t("component.presets.large"), value: "large", width: 1200, height: 900 },
    { label: t("component.presets.hd"), value: "hd", width: 1920, height: 1080 },
    { label: t("component.presets.4k"), value: "4k", width: 3840, height: 2160 },
    {
      label: t("component.presets.instagramPost"),
      value: "instagram_post",
      width: 1080,
      height: 1080,
    },
    {
      label: t("component.presets.instagramStory"),
      value: "instagram_story",
      width: 1080,
      height: 1920,
    },
    {
      label: t("component.presets.facebookCover"),
      value: "facebook_cover",
      width: 1200,
      height: 630,
    },
    {
      label: t("component.presets.twitterHeader"),
      value: "twitter_header",
      width: 1500,
      height: 500,
    },
    {
      label: t("component.presets.youtubeThumb"),
      value: "youtube_thumb",
      width: 1280,
      height: 720,
    },
  ];

  // 格式选项配置
  const FORMAT_OPTIONS = [
    { label: t("component.formats.jpeg"), value: "jpeg" },
    { label: t("component.formats.png"), value: "png" },
    { label: t("component.formats.webp"), value: "webp" },
  ];

  // 清理定时器
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // 根据原图格式映射到支持的输出格式
  const mapToSupportedFormat = (
    originalFormat: string
  ): "jpeg" | "png" | "webp" => {
    const format = originalFormat.toLowerCase();

    // 直接支持的格式
    if (format === "jpeg" || format === "jpg") return "jpeg";
    if (format === "png") return "png";
    if (format === "webp") return "webp";

    // 其他格式映射到默认格式
    // GIF, TIFF, BMP 等转换为PNG保持透明度
    if (format === "gif" || format === "tiff" || format === "bmp") return "png";

    // 默认返回JPEG
    return "jpeg";
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 处理文件上传
  const handleFileUpload = useCallback((file: File) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error(t("component.messages.fileSizeExceeds", { maxSize: formatFileSize(MAX_FILE_SIZE) }));
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error(t("component.messages.invalidImageFile"));
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setResizedImage("");

      // 获取图片信息
      const img = document.createElement("img");
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const originalFormat = file.type.split("/")[1].toUpperCase();
        const supportedFormat = mapToSupportedFormat(originalFormat);

        const info: ImageInfo = {
          originalFile: file,
          originalSize: file.size,
          originalWidth: img.width,
          originalHeight: img.height,
          originalFormat,
          aspectRatio,
        };
        setImageInfo(info);

        // 更新默认尺寸为当前图片尺寸，并设置格式为原图格式（如果支持）
        setResizeOptions((prev) => ({
          ...prev,
          width: img.width,
          height: img.height,
          format: supportedFormat,
        }));

        setIsLoading(false);
        toast.success(t("component.messages.uploadSuccess"));
      };
      img.onerror = () => {
        setIsLoading(false);
        toast.error(t("component.messages.loadImageError"));
      };
      img.src = result;
    };

    reader.onerror = () => {
      toast.error(t("component.messages.readFileError"));
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  }, [t]);

  // Canvas-based resizing function
  const resizeImageWithCanvas = useCallback(
    async (
      file: File,
      targetWidth: number,
      targetHeight: number,
      quality: number,
      format: string
    ): Promise<Blob> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Draw the resized image
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Canvas toBlob failed"));
              }
            },
            `image/${format}`,
            quality
          );
        };

        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
      });
    },
    []
  );

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // 处理拖拽上传
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 清除调整结果的辅助函数
  const clearResizeResults = useCallback(() => {
    setResizedImage("");
    setImageInfo((prev) =>
      prev
        ? {
            originalFile: prev.originalFile,
            originalSize: prev.originalSize,
            originalWidth: prev.originalWidth,
            originalHeight: prev.originalHeight,
            originalFormat: prev.originalFormat,
            aspectRatio: prev.aspectRatio,
          }
        : null
    );
  }, []);

  // 重置所有状态
  const resetAll = useCallback(() => {
    setOriginalImage("");
    setResizedImage("");
    setImageInfo(null);
    setResizeOptions({
      method: "percentage",
      percentage: 100,
      width: 800,
      height: 600,
      maintainAspectRatio: true,
      quality: 0.9,
      format: "jpeg",
    });
    setIsResizing(false);
    setResizeProgress(0);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // 处理预设选择
  const handlePresetChange = (value: string) => {
    const preset = RESIZE_PRESETS.find((p) => p.value === value);
    if (preset && imageInfo) {
      let width = preset.width;
      let height = preset.height;

      setResizeOptions((prev) => ({
        ...prev,
        method: "preset",
        width,
        height,
      }));
      clearResizeResults();
    }
  };

  // 处理方法变化
  const handleMethodChange = (value: string) => {
    if (value === "percentage" || value === "pixels" || value === "preset") {
      setResizeOptions((prev) => ({ ...prev, method: value }));
      clearResizeResults();
    }
  };

  // 处理尺寸变化
  const handleDimensionChange = (type: "width" | "height", value: number) => {
    if (!imageInfo) return;

    setResizeOptions((prev) => {
      const newOptions = { ...prev };

      if (type === "width") {
        newOptions.width = value;
        if (prev.maintainAspectRatio && imageInfo.aspectRatio) {
          newOptions.height = Math.round(value / imageInfo.aspectRatio);
        }
      } else {
        newOptions.height = value;
        if (prev.maintainAspectRatio && imageInfo.aspectRatio) {
          newOptions.width = Math.round(value * imageInfo.aspectRatio);
        }
      }

      return newOptions;
    });
    clearResizeResults();
  };

  // 处理百分比变化
  const handlePercentageChange = (value: number) => {
    if (!imageInfo) return;

    setResizeOptions((prev) => ({
      ...prev,
      percentage: value,
      width: Math.round((imageInfo.originalWidth * value) / 100),
      height: Math.round((imageInfo.originalHeight * value) / 100),
    }));
    clearResizeResults();
  };

  // 切换宽高比锁定
  const toggleAspectRatio = () => {
    setResizeOptions((prev) => {
      const newOptions = {
        ...prev,
        maintainAspectRatio: !prev.maintainAspectRatio,
      };

      // 如果启用了宽高比锁定，重新计算高度
      if (newOptions.maintainAspectRatio && imageInfo?.aspectRatio) {
        newOptions.height = Math.round(
          newOptions.width / imageInfo.aspectRatio
        );
      }

      return newOptions;
    });
    clearResizeResults();
  };

  // 主要的 resize 函数
  const resizeImage = useCallback(async () => {
    if (!imageInfo?.originalFile) {
      toast.error(t("component.messages.selectImageFirst"));
      return;
    }

    setIsResizing(true);
    setResizeProgress(0);

    // 模拟进度条
    progressIntervalRef.current = setInterval(() => {
      setResizeProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);

    try {
      let targetWidth = resizeOptions.width;
      let targetHeight = resizeOptions.height;

      // 根据方法计算目标尺寸
      if (resizeOptions.method === "percentage") {
        targetWidth = Math.round(
          (imageInfo.originalWidth * resizeOptions.percentage) / 100
        );
        targetHeight = Math.round(
          (imageInfo.originalHeight * resizeOptions.percentage) / 100
        );
      }

      // 如果需要保持宽高比，重新计算尺寸
      if (resizeOptions.maintainAspectRatio && imageInfo.aspectRatio) {
        const aspectRatio = imageInfo.aspectRatio;
        if (resizeOptions.method === "pixels") {
          // 根据宽度计算高度，或者根据高度计算宽度
          const widthBasedHeight = Math.round(targetWidth / aspectRatio);
          const heightBasedWidth = Math.round(targetHeight * aspectRatio);

          // 选择更接近原始比例的计算方式
          if (
            Math.abs(widthBasedHeight - targetHeight) <=
            Math.abs(heightBasedWidth - targetWidth)
          ) {
            targetHeight = widthBasedHeight;
          } else {
            targetWidth = heightBasedWidth;
          }
        }
      }

      const resizedBlob = await resizeImageWithCanvas(
        imageInfo.originalFile,
        targetWidth,
        targetHeight,
        resizeOptions.quality,
        resizeOptions.format
      );

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setResizeProgress(100);

      // 创建调整后图片的预览
      const resizedImageUrl = URL.createObjectURL(resizedBlob);
      setResizedImage(resizedImageUrl);

      // 更新图片信息
      const scaleFactor = targetWidth / imageInfo.originalWidth;

      setImageInfo((prev) =>
        prev
          ? {
              ...prev,
              resizedSize: resizedBlob.size,
              resizedWidth: targetWidth,
              resizedHeight: targetHeight,
              scaleFactor,
            }
          : null
      );

      setTimeout(() => {
        setIsResizing(false);
        setResizeProgress(0);
      }, 500);

      toast.success(t("component.messages.resizeCompleted"));
    } catch (error) {
      console.error("Resize error:", error);
      toast.error(t("component.messages.resizeError"));
      setIsResizing(false);
      setResizeProgress(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  }, [imageInfo, resizeOptions, resizeImageWithCanvas, t]);

  // 下载调整后的图片
  const downloadResizedImage = useCallback(async () => {
    if (!imageInfo?.originalFile || !resizedImage) {
      toast.error(t("component.messages.noResizedError"));
      return;
    }

    try {
      let targetWidth = resizeOptions.width;
      let targetHeight = resizeOptions.height;

      if (resizeOptions.method === "percentage") {
        targetWidth = Math.round(
          (imageInfo.originalWidth * resizeOptions.percentage) / 100
        );
        targetHeight = Math.round(
          (imageInfo.originalHeight * resizeOptions.percentage) / 100
        );
      }

      if (resizeOptions.maintainAspectRatio && imageInfo.aspectRatio) {
        const aspectRatio = imageInfo.aspectRatio;
        if (resizeOptions.method === "pixels") {
          const widthBasedHeight = Math.round(targetWidth / aspectRatio);
          const heightBasedWidth = Math.round(targetHeight * aspectRatio);

          if (
            Math.abs(widthBasedHeight - targetHeight) <=
            Math.abs(heightBasedWidth - targetWidth)
          ) {
            targetHeight = widthBasedHeight;
          } else {
            targetWidth = heightBasedWidth;
          }
        }
      }

      const resizedBlob = await resizeImageWithCanvas(
        imageInfo.originalFile,
        targetWidth,
        targetHeight,
        resizeOptions.quality,
        resizeOptions.format
      );

      const url = URL.createObjectURL(resizedBlob);
      const link = document.createElement("a");
      link.href = url;

      const originalName = imageInfo.originalFile.name.split(".")[0];
      link.download = `${originalName}_resized_${targetWidth}x${targetHeight}.${resizeOptions.format}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(t("component.messages.downloadSuccess"));
    } catch (error) {
      console.error("Download error:", error);
      toast.error(t("component.messages.downloadError"));
    }
  }, [imageInfo, resizeOptions, resizedImage, resizeImageWithCanvas, t]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label={t("component.upload.ariaLabel")}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Scaling className="w-6 h-6" />
                {t("component.resizer.title")}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {t("component.resizer.resizeDescription")}
              </p>
            </div>
            <div className="flex items-center flex-wrap justify-end gap-2">
              {!originalImage && (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {t("component.ui.upload")}
                </Button>
              )}
              {originalImage && (
                <Button
                  onClick={resetAll}
                  disabled={isLoading || isResizing}
                  variant="destructive"
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t("component.ui.reset")}
                </Button>
              )}

              <Button
                onClick={resizeImage}
                disabled={isResizing || !imageInfo}
                size="sm"
              >
                {isResizing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {t("component.ui.resizing")} {Math.round(resizeProgress)}%
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    {t("component.ui.resize")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!originalImage ? (
            /* Upload Area */
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center space-y-4 hover:border-muted-foreground/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex justify-center">
                <FileImage className="w-12 h-12 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("component.upload.title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("component.upload.description")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("component.upload.supportedFormats", { maxSize: formatFileSize(MAX_FILE_SIZE) })}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Original Image */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <FileImage className="w-4 h-4" />
                        {t("component.resizer.originalImage")}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isLoading}
                          variant="outline"
                          size="sm"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {t("component.ui.upload")}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="border rounded-lg p-3 min-h-[180px] flex items-center justify-center bg-muted/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={originalImage}
                        alt={t("component.ui.original")}
                        className="max-w-full max-h-40 object-contain rounded"
                      />
                    </div>
                    {imageInfo && (
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("component.preview.size")}</span>
                          <span className="font-mono">
                            {formatFileSize(imageInfo.originalSize)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {t("component.preview.dimensions")}
                          </span>
                          <span className="font-mono">
                            {imageInfo.originalWidth} ×{" "}
                            {imageInfo.originalHeight}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("component.preview.format")}</span>
                          <span className="font-mono">
                            {imageInfo.originalFormat}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Resized Image */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Maximize2 className="w-4 h-4" />
                        {t("component.resizer.resizedImage")}
                      </h3>
                      <div className="flex items-center gap-1">
                        {resizedImage && (
                          <Button onClick={downloadResizedImage} size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            {t("component.ui.download")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="border rounded-lg p-3 min-h-[180px] flex items-center justify-center bg-muted/20">
                      {resizedImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={resizedImage}
                          alt={t("component.ui.resized")}
                          className="max-w-full max-h-40 object-contain rounded"
                        />
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <Maximize2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">{t("component.preview.previewWillAppear")}</p>
                        </div>
                      )}
                    </div>
                    {resizedImage && imageInfo?.resizedSize && (
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("component.preview.size")}</span>
                          <span className="font-mono">
                            {formatFileSize(imageInfo.resizedSize)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {t("component.preview.dimensions")}
                          </span>
                          <span className="font-mono">
                            {imageInfo.resizedWidth} × {imageInfo.resizedHeight}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("component.preview.format")}</span>
                          <span className="font-mono">
                            {resizeOptions.format.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("component.preview.change")}</span>
                          <span
                            className={`font-mono ${
                              imageInfo.resizedSize < imageInfo.originalSize
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          >
                            {imageInfo.resizedSize < imageInfo.originalSize
                              ? "↓"
                              : "↑"}
                            {Math.round(
                              ((imageInfo.resizedSize -
                                imageInfo.originalSize) /
                                imageInfo.originalSize) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="py-2">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Method Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-primary" />
                        <h3 className="font-medium text-sm">{t("component.resizer.method")}</h3>
                      </div>

                      <div className="space-y-4">
                        {/* Radio button options */}
                        <div className="space-y-3">
                          {/* Percentage Method */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                id="method-percentage"
                                name="resize-method"
                                value="percentage"
                                checked={resizeOptions.method === "percentage"}
                                onChange={(e) =>
                                  handleMethodChange(
                                    e.target.value as
                                      | "percentage"
                                      | "pixels"
                                      | "preset"
                                  )
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                aria-label="Percentage scale method"
                              />
                              <Label
                                htmlFor="method-percentage"
                                className="text-sm font-medium cursor-pointer"
                              >
                                {t("component.controls.percentageScale")}
                              </Label>
                            </div>
                            {resizeOptions.method === "percentage" && (
                              <div className="ml-7 space-y-2">
                                <div className="flex items-center gap-3">
                                  <Input
                                    type="number"
                                    value={resizeOptions.percentage}
                                    onChange={(e) =>
                                      handlePercentageChange(
                                        parseFloat(e.target.value) || 100
                                      )
                                    }
                                    min="1"
                                    max="1000"
                                    step="1"
                                    className="h-8 w-20"
                                    placeholder="100"
                                  />
                                  <span className="text-xs font-medium">%</span>
                                </div>
                                {imageInfo && (
                                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                    {t("component.preview.result")}{" "}
                                    {Math.round(
                                      (imageInfo.originalWidth *
                                        resizeOptions.percentage) /
                                        100
                                    )}
                                    ×
                                    {Math.round(
                                      (imageInfo.originalHeight *
                                        resizeOptions.percentage) /
                                        100
                                    )}
                                    px
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Pixels Method */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                id="method-pixels"
                                name="resize-method"
                                value="pixels"
                                checked={resizeOptions.method === "pixels"}
                                onChange={(e) =>
                                  handleMethodChange(
                                    e.target.value as
                                      | "percentage"
                                      | "pixels"
                                      | "preset"
                                  )
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                aria-label="Exact dimensions method"
                              />
                              <Label
                                htmlFor="method-pixels"
                                className="text-sm font-medium cursor-pointer"
                              >
                                {t("component.controls.exactDimensions")}
                              </Label>
                            </div>
                            {resizeOptions.method === "pixels" && (
                              <div className="ml-7 space-y-3">
                                {/* Mobile-friendly layout */}
                                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                                  <div className="flex items-center gap-2 flex-1">
                                    <Input
                                      type="number"
                                      value={resizeOptions.width}
                                      onChange={(e) =>
                                        handleDimensionChange(
                                          "width",
                                          parseInt(e.target.value) || 0
                                        )
                                      }
                                      min="1"
                                      max="20000"
                                      className="h-8 flex-1 min-w-0"
                                      placeholder={t("component.controls.width")}
                                    />
                                    <span className="text-xs text-muted-foreground">
                                      ×
                                    </span>
                                    <Input
                                      type="number"
                                      value={resizeOptions.height}
                                      onChange={(e) =>
                                        handleDimensionChange(
                                          "height",
                                          parseInt(e.target.value) || 0
                                        )
                                      }
                                      min="1"
                                      max="20000"
                                      className="h-8 flex-1 min-w-0"
                                      placeholder={t("component.controls.height")}
                                    />
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                      px
                                    </span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-3 whitespace-nowrap"
                                    onClick={toggleAspectRatio}
                                    title={
                                      resizeOptions.maintainAspectRatio
                                        ? t("component.controls.unlock")
                                        : t("component.controls.lock")
                                    }
                                  >
                                    {resizeOptions.maintainAspectRatio ? (
                                      <>
                                        <Lock className="w-3 h-3 mr-1" />
                                        <span className="hidden sm:inline">
                                          {t("component.controls.lock")}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <Unlock className="w-3 h-3 mr-1" />
                                        <span className="hidden sm:inline">
                                          {t("component.controls.unlock")}
                                        </span>
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Preset Method */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                id="method-preset"
                                name="resize-method"
                                value="preset"
                                checked={resizeOptions.method === "preset"}
                                onChange={(e) =>
                                  handleMethodChange(
                                    e.target.value as
                                      | "percentage"
                                      | "pixels"
                                      | "preset"
                                  )
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                aria-label="Preset sizes method"
                              />
                              <Label
                                htmlFor="method-preset"
                                className="text-sm font-medium cursor-pointer"
                              >
                                {t("component.controls.presetSizes")}
                              </Label>
                            </div>
                            {resizeOptions.method === "preset" && (
                              <div className="ml-7">
                                <Select onValueChange={handlePresetChange}>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder={t("component.controls.choosePresetSize")} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {RESIZE_PRESETS.map((preset) => (
                                      <SelectItem
                                        key={preset.value}
                                        value={preset.value}
                                      >
                                        {preset.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Settings */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-primary" />
                        <h3 className="font-medium text-sm">{t("component.resizer.settings")}</h3>
                      </div>

                      <div className="space-y-4">
                        {/* Format */}
                        <div>
                          <Label className="text-xs font-medium mb-2 block">
                            {t("component.controls.format")}
                          </Label>
                          <Select
                            value={resizeOptions.format}
                            onValueChange={(value: "jpeg" | "png" | "webp") => {
                              setResizeOptions((prev) => ({
                                ...prev,
                                format: value,
                              }));
                              clearResizeResults();
                            }}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {FORMAT_OPTIONS.map((format) => (
                                <SelectItem
                                  key={format.value}
                                  value={format.value}
                                >
                                  {format.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Quality */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <Label className="text-xs font-medium">
                              {t("component.controls.quality")}
                            </Label>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(resizeOptions.quality * 100)}%
                            </span>
                          </div>
                          <Input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.05"
                            value={resizeOptions.quality}
                            className="h-2"
                            onChange={(e) => {
                              setResizeOptions((prev) => ({
                                ...prev,
                                quality: parseFloat(e.target.value),
                              }));
                              clearResizeResults();
                            }}
                          />
                        </div>

                        {/* Keep Ratio (for non-pixel mode) */}
                        {resizeOptions.method !== "pixels" && (
                          <div>
                            <Label className="text-xs font-medium mb-2 block">
                              {t("component.controls.options")}
                            </Label>
                            <div className="flex items-center gap-2">
                              <Switch
                                id="aspect-ratio"
                                checked={resizeOptions.maintainAspectRatio}
                                onCheckedChange={toggleAspectRatio}
                              />
                              <Label htmlFor="aspect-ratio" className="text-xs">
                                {t("component.controls.keepAspectRatio")}
                              </Label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Resize Button moved to Resized card */}
                  <div className="mt-4">
                    <Button
                      onClick={resizeImage}
                      disabled={isResizing || !imageInfo}
                      size="default"
                      className="w-full"
                    >
                      {isResizing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          {t("component.ui.resizing")} {Math.round(resizeProgress)}%
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          {t("component.ui.resize")}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Bar */}
              {isResizing && (
                <div className="space-y-2">
                  <Progress value={resizeProgress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    {t("component.ui.resizeProgress")} {Math.round(resizeProgress)}%
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
