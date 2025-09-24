"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Upload,
  Download,
  FileImage,
  Archive,
  Settings,
  Info,
  Zap,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface CompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
}

interface ImageInfo {
  originalFile: File;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  originalFormat: string;
  compressedSize?: number;
  compressedWidth?: number;
  compressedHeight?: number;
  compressionRatio?: number;
  sizeReduction?: number;
}

// 压缩预设将在组件内部使用翻译函数动态生成

// 格式选项将在组件内部使用翻译函数动态生成

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function ImageCompressor() {
  const t = useTranslations("compress.component");
  
  // 压缩预设配置
const COMPRESSION_PRESETS = [
  {
      label: t("presets.highQuality"),
    value: "high",
      description: t("presets.highQualityDescription"),
    maxSizeMB: 5,
    maxWidthOrHeight: 1920,
    quality: 0.9,
  },
  {
      label: t("presets.balanced"),
    value: "balanced",
      description: t("presets.balancedDescription"),
    maxSizeMB: 2,
    maxWidthOrHeight: 1280,
    quality: 0.8,
  },
  {
      label: t("presets.smallSize"),
    value: "small",
      description: t("presets.smallSizeDescription"),
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    quality: 0.7,
  },
  {
      label: t("presets.webOptimized"),
    value: "web",
      description: t("presets.webOptimizedDescription"),
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    quality: 0.75,
  },
  {
      label: t("presets.custom"),
    value: "custom",
      description: t("presets.customDescription"),
    maxSizeMB: 1,
    maxWidthOrHeight: 1280,
    quality: 0.8,
  },
];

  // 格式选项配置
const FORMAT_OPTIONS = [
    { label: "JPEG", value: "jpeg", description: t("formats.jpegDescription") },
    { label: "PNG", value: "png", description: t("formats.pngDescription") },
    { label: "WebP", value: "webp", description: t("formats.webpDescription") },
  ];
  
  const [originalImage, setOriginalImage] = useState<string>("");
  const [compressedImage, setCompressedImage] = useState<string>("");
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [compressionOptions, setCompressionOptions] = useState<CompressionOptions>({
    maxSizeMB: 1,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
    quality: 0.8,
    format: 'jpeg',
  });
  const [preset, setPreset] = useState<string>("balanced");
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionProgress, setCompressionProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 处理文件上传
  const handleFileUpload = useCallback(
    (file: File) => {
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        toast.error(t("messages.fileSizeExceeds", { maxSize: formatFileSize(MAX_FILE_SIZE) }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error(t("messages.invalidImageFile"));
        return;
      }

      setIsLoading(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result as string;
        setOriginalImage(result);
        setCompressedImage("");

        // 获取图片信息
        const img = document.createElement('img');
        img.onload = () => {
          const info: ImageInfo = {
            originalFile: file,
            originalSize: file.size,
            originalWidth: img.width,
            originalHeight: img.height,
            originalFormat: file.type.split('/')[1].toUpperCase(),
          };
          setImageInfo(info);
          setIsLoading(false);
          toast.success(t("messages.uploadSuccess"));
        };
        img.onerror = () => {
          setIsLoading(false);
          toast.error(t("messages.loadImageError"));
        };
        img.src = result;
      };

      reader.onerror = () => {
        toast.error(t("messages.readFileError"));
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    },
    [t]
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

  // 处理预设模式变化
  const handlePresetChange = (value: string) => {
    setPreset(value);
    const presetConfig = COMPRESSION_PRESETS.find(p => p.value === value);
    if (presetConfig && value !== "custom") {
      setCompressionOptions(prev => ({
        ...prev,
        maxSizeMB: presetConfig.maxSizeMB,
        maxWidthOrHeight: presetConfig.maxWidthOrHeight,
        quality: presetConfig.quality,
      }));
    }
    // 清除之前的压缩结果
    setCompressedImage("");
    setImageInfo(prev => prev ? {
      originalFile: prev.originalFile,
      originalSize: prev.originalSize,
      originalWidth: prev.originalWidth,
      originalHeight: prev.originalHeight,
      originalFormat: prev.originalFormat,
    } : null);
  };

  // 清除压缩结果的辅助函数
  const clearCompressionResults = useCallback(() => {
    setCompressedImage("");
    setImageInfo(prev => prev ? {
      originalFile: prev.originalFile,
      originalSize: prev.originalSize,
      originalWidth: prev.originalWidth,
      originalHeight: prev.originalHeight,
      originalFormat: prev.originalFormat,
    } : null);
  }, []);

  // 重置所有状态
  const resetAll = useCallback(() => {
    setOriginalImage("");
    setCompressedImage("");
    setImageInfo(null);
    setPreset("balanced");
    setCompressionOptions({
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      quality: 0.8,
      format: 'jpeg',
    });
    setIsCompressing(false);
    setCompressionProgress(0);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // 压缩图片
  const compressImage = useCallback(async () => {
    if (!imageInfo?.originalFile) {
      toast.error(t("messages.selectImageFirst"));
      return;
    }

    setIsCompressing(true);
    setCompressionProgress(0);

    // 模拟进度条
    progressIntervalRef.current = setInterval(() => {
      setCompressionProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);

    try {
      const options = {
        maxSizeMB: compressionOptions.maxSizeMB,
        maxWidthOrHeight: compressionOptions.maxWidthOrHeight,
        useWebWorker: compressionOptions.useWebWorker,
        initialQuality: compressionOptions.quality,
        fileType: `image/${compressionOptions.format}`,
      };

      const compressedFile = await imageCompression(imageInfo.originalFile, options);
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setCompressionProgress(100);

      // 创建压缩后图片的预览
      const compressedImageUrl = URL.createObjectURL(compressedFile);
      setCompressedImage(compressedImageUrl);

      // 获取压缩后图片的尺寸信息
      const img = document.createElement('img');
      img.onload = () => {
        const sizeReduction = ((imageInfo.originalSize - compressedFile.size) / imageInfo.originalSize) * 100;
        const compressionRatio = imageInfo.originalSize / compressedFile.size;

        setImageInfo(prev => prev ? {
          ...prev,
          compressedSize: compressedFile.size,
          compressedWidth: img.width,
          compressedHeight: img.height,
          compressionRatio,
          sizeReduction,
        } : null);

        setIsCompressing(false);
        toast.success(t("messages.compressionCompleted", { reduction: sizeReduction.toFixed(1) }));
      };
      img.src = compressedImageUrl;

    } catch (error) {
      console.error("Compression failed:", error);
      toast.error(t("messages.compressError"));
      setIsCompressing(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  }, [imageInfo, compressionOptions, t]);

  // 下载压缩后的图片
  const downloadCompressedImage = useCallback(async () => {
    if (!compressedImage || !imageInfo?.originalFile) {
      toast.error(t("messages.noCompressedError"));
      return;
    }

    try {
      const options = {
        maxSizeMB: compressionOptions.maxSizeMB,
        maxWidthOrHeight: compressionOptions.maxWidthOrHeight,
        useWebWorker: compressionOptions.useWebWorker,
        initialQuality: compressionOptions.quality,
        fileType: `image/${compressionOptions.format}`,
      };

      const compressedFile = await imageCompression(imageInfo.originalFile, options);
      
      const link = document.createElement("a");
      link.href = URL.createObjectURL(compressedFile);
      
      const originalName = imageInfo.originalFile.name.split('.')[0];
      const extension = compressionOptions.format === 'jpeg' ? 'jpg' : compressionOptions.format;
      link.download = `${originalName}_compressed.${extension}`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(t("messages.downloadSuccess"));
    } catch (error) {
      console.error("Download failed:", error);
      toast.error(t("messages.downloadError"));
    }
  }, [compressedImage, imageInfo, compressionOptions, t]);

  const currentPreset = COMPRESSION_PRESETS.find(p => p.value === preset);

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label={t("upload.ariaLabel")}
      />

      {/* Compression Mode Selection */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              {t("compressor.preset")}
            </label>
            <Select value={preset} onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("compressor.selectPreset")} />
              </SelectTrigger>
              <SelectContent>
                {COMPRESSION_PRESETS.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Preset Description */}
          {currentPreset && (
            <p className="text-sm text-muted-foreground">
              {currentPreset.description}
            </p>
          )}
        </div>
      </div>

      {/* Main Card */}
      <Card className="w-full">
        {/* Card Header */}
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div>
              <CardTitle className="text-xl font-semibold">
                <h2>{t("compressor.title")}</h2>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {currentPreset?.label || t("compressor.settings")}
              </p>
            </div>
            <div className="flex items-center flex-wrap justify-end gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                {t("upload.button")}
              </Button>
              {originalImage && (
                <Button
                  onClick={resetAll}
                  disabled={isLoading || isCompressing}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t("controls.reset")}
                </Button>
              )}
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
                  {t("upload.title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("upload.description")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("upload.supportedFormats", { maxSize: formatFileSize(MAX_FILE_SIZE) })}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Compression Settings - Only show for custom preset */}
              {preset === "custom" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      {t("compressor.settings")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>{t("controls.outputFormat")}</Label>
                        <Select 
                          value={compressionOptions.format} 
                          onValueChange={(value: 'jpeg' | 'png' | 'webp') => {
                            setCompressionOptions(prev => ({ ...prev, format: value }));
                            clearCompressionResults();
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {FORMAT_OPTIONS.map((format) => (
                              <SelectItem key={format.value} value={format.value}>
                                {format.label} - {format.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>{t("controls.maxFileSize")}</Label>
                        <Input
                          type="number"
                          value={compressionOptions.maxSizeMB}
                          onChange={(e) => {
                            setCompressionOptions(prev => ({
                              ...prev,
                              maxSizeMB: parseFloat(e.target.value) || 1
                            }));
                            clearCompressionResults();
                          }}
                          min="0.1"
                          max="10"
                          step="0.1"
                        />
                      </div>

                      <div>
                        <Label>{t("controls.maxDimensions")}</Label>
                        <Input
                          type="number"
                          value={compressionOptions.maxWidthOrHeight}
                          onChange={(e) => {
                            setCompressionOptions(prev => ({
                              ...prev,
                              maxWidthOrHeight: parseInt(e.target.value) || 1280
                            }));
                            clearCompressionResults();
                          }}
                          min="100"
                          max="4000"
                          step="10"
                        />
                      </div>

                      <div>
                        <Label>{t("controls.quality", { quality: Math.round(compressionOptions.quality * 100) })}</Label>
                        <Slider
                          value={[compressionOptions.quality]}
                          onValueChange={([value]) => {
                            setCompressionOptions(prev => ({
                              ...prev,
                              quality: value
                            }));
                            clearCompressionResults();
                          }}
                          min={0.1}
                          max={1}
                          step={0.05}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Image Preview Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original Image */}
                <div className="space-y-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileImage className="w-5 h-5" />
                    {t("compressor.originalImage")}
                  </h3>
                  <div className="flex-1 border rounded-lg p-4 space-y-4 min-h-[360px] flex flex-col">
                    <div className="flex-1 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={originalImage}
                        alt={t("ui.original")}
                        className="max-w-full max-h-64 object-contain rounded"
                      />
                    </div>
                    {imageInfo && (
                      <div className="space-y-2 flex-shrink-0">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t("preview.size")}</span>
                          <Badge variant="outline">{formatFileSize(imageInfo.originalSize)}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t("preview.dimensions")}</span>
                          <Badge variant="outline">
                            {imageInfo.originalWidth} × {imageInfo.originalHeight}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t("preview.format")}</span>
                          <Badge variant="outline">{imageInfo.originalFormat}</Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Compressed Image */}
                <div className="space-y-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Archive className="w-5 h-5" />
                    {t("compressor.compressedImage")}
                  </h3>
                  <div className="flex-1 border rounded-lg p-4 space-y-4 min-h-[360px] flex flex-col">
                    {compressedImage ? (
                      <>
                        <div className="flex-1 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={compressedImage}
                            alt={t("ui.compressed")}
                            className="max-w-full max-h-64 object-contain rounded"
                          />
                        </div>
                        {imageInfo?.compressedSize && (
                          <div className="space-y-2 flex-shrink-0">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{t("preview.size")}</span>
                              <Badge variant="default">{formatFileSize(imageInfo.compressedSize)}</Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{t("preview.dimensions")}</span>
                              <Badge variant="default">
                                {imageInfo.compressedWidth} × {imageInfo.compressedHeight}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{t("preview.reduction")}</span>
                              <Badge variant="default" className="bg-green-500">
                                -{imageInfo.sizeReduction?.toFixed(1)}%
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{t("preview.ratio")}</span>
                              <Badge variant="default">
                                {imageInfo.compressionRatio?.toFixed(1)}:1
                              </Badge>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                          <Archive className="w-12 h-12 text-muted-foreground" />
                          <div>
                            <h4 className="font-semibold mb-2">{t("compressor.readyToCompress")}</h4>
                            <p className="text-muted-foreground text-sm mb-4">
                              {t("compressor.compressDescription")}
                            </p>
                            <Button
                              onClick={compressImage}
                              disabled={isCompressing}
                              size="lg"
                            >
                              {isCompressing ? (
                                <Zap className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <Archive className="w-4 h-4 mr-2" />
                              )}
                              {isCompressing ? t("controls.compressing") : t("controls.compress")}
                            </Button>
                          </div>
                        </div>
                        {/* 占位信息区域，保持高度一致 */}
                        <div className="space-y-2 flex-shrink-0 opacity-0">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t("preview.size")}</span>
                            <Badge variant="outline">-</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t("preview.dimensions")}</span>
                            <Badge variant="outline">-</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t("preview.format")}</span>
                            <Badge variant="outline">-</Badge>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Compression Progress */}
              {isCompressing && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{t("controls.compressing")}</span>
                        <span>{Math.round(compressionProgress)}%</span>
                      </div>
                      <Progress value={compressionProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  disabled={isCompressing}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {t("upload.newImage")}
                </Button>
                
                <Button
                  onClick={resetAll}
                  variant="outline"
                  disabled={isCompressing}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t("controls.resetAll")}
                </Button>
                
                {!compressedImage && (
                  <Button
                    onClick={compressImage}
                    disabled={isCompressing}
                    size="lg"
                  >
                    {isCompressing ? (
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Archive className="w-4 h-4 mr-2" />
                    )}
                    {isCompressing ? t("controls.compressing") : t("controls.compress")}
                  </Button>
                )}

                {compressedImage && (
                  <Button
                    onClick={downloadCompressedImage}
                    variant="default"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("controls.download")}
                  </Button>
                )}
              </div>

              {/* Statistics Card */}
              {imageInfo?.compressedSize && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      {t("statistics.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-green-600">
                          {imageInfo.sizeReduction?.toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground">{t("statistics.sizeReduction")}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">
                          {formatFileSize(imageInfo.originalSize - imageInfo.compressedSize)}
                        </p>
                        <p className="text-xs text-muted-foreground">{t("statistics.spaceSaved")}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">
                          {imageInfo.compressionRatio?.toFixed(1)}:1
                        </p>
                        <p className="text-xs text-muted-foreground">{t("statistics.compressionRatio")}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-blue-600">
                          {compressionOptions.format.toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">{t("controls.outputFormat")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
