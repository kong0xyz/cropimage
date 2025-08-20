"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Upload,
  Download,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Crop,
  RefreshCw,
  Move,
  FlipHorizontal,
  FlipVertical,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

interface CropMode {
  label: string;
  value: string;
  description: string;
  aspectRatio?: number;
  options?: any;
}

const CROP_MODES: CropMode[] = [
  {
    label: "Free Crop",
    value: "free",
    description: "Freely adjust crop area without ratio constraints",
    aspectRatio: NaN,
  },
  {
    label: "Square (1:1)",
    value: "square",
    description: "Perfect for profile photos and social media avatars",
    aspectRatio: 1,
  },
  {
    label: "Portrait (3:4)",
    value: "portrait",
    description: "Ideal for portrait photos and mobile wallpapers",
    aspectRatio: 3 / 4,
  },
  {
    label: "Landscape (4:3)",
    value: "landscape",
    description: "Great for computer wallpapers and photo prints",
    aspectRatio: 4 / 3,
  },
  {
    label: "Wide (16:9)",
    value: "wide",
    description: "Perfect for banners, covers and widescreen displays",
    aspectRatio: 16 / 9,
  },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageCropper() {
  const [image, setImage] = useState<string>("");
  const [livePreview, setLivePreview] = useState<string>("");
  const [dragMode, setDragMode] = useState<"crop" | "move">("crop");
  const [cropMode, setCropMode] = useState<string>("free");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [originalFileType, setOriginalFileType] = useState<string>("png");
  const [downloadFormat, setDownloadFormat] = useState<string>("png");
  const [imageQuality, setImageQuality] = useState<number>(0.9);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 图片详细信息状态
  const [imageInfo, setImageInfo] = useState<{
    width: number;
    height: number;
    type: string;
    lastModified: number;
    aspectRatio: string;
  } | null>(null);

  // 裁剪数据状态
  const [cropData, setCropData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
  });

  const cropperRef = useRef<ReactCropperElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    };
  }, []);

  // 更新裁剪数据
  const updateCropData = useCallback(() => {
    if (cropperRef.current?.cropper && image) {
      try {
        const cropper = cropperRef.current.cropper;
        const data = cropper.getData();
        const imageData = cropper.getImageData();

        setCropData({
          x: Math.round(data.x || 0),
          y: Math.round(data.y || 0),
          width: Math.round(data.width || 0),
          height: Math.round(data.height || 0),
          rotate: Math.round(data.rotate || 0),
          scaleX: Number((imageData.scaleX || 1).toFixed(2)),
          scaleY: Number((imageData.scaleY || 1).toFixed(2)),
        });
      } catch (error) {
        console.warn("Error updating crop data:", error);
      }
    }
  }, [image]);

  // 防抖的实时预览生成
  const generateLivePreviewDebounced = useCallback(() => {
    // 清除之前的定时器
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }

    // 设置防抖延迟
    previewTimeoutRef.current = setTimeout(() => {
      if (cropperRef.current?.cropper && image) {
        try {
          const cropper = cropperRef.current.cropper;

          // 获取裁剪数据的实际像素尺寸
          const cropData = cropper.getData();
          const maxPreviewSize = 400;

          // 计算预览尺寸，保持原始比例
          let previewWidth = cropData.width;
          let previewHeight = cropData.height;

          if (previewWidth > maxPreviewSize || previewHeight > maxPreviewSize) {
            const ratio = Math.min(
              maxPreviewSize / previewWidth,
              maxPreviewSize / previewHeight
            );
            previewWidth = Math.round(previewWidth * ratio);
            previewHeight = Math.round(previewHeight * ratio);
          }

          // 异步生成预览，避免阻塞UI
          requestAnimationFrame(() => {
            try {
              const canvas = cropper.getCroppedCanvas({
                width: previewWidth,
                height: previewHeight,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: "high",
              });

              if (canvas) {
                const previewUrl = canvas.toDataURL("image/png", imageQuality);
                setLivePreview(previewUrl);
              }
            } catch (error) {
              console.warn("Error in async preview generation:", error);
            }
          });
        } catch (error) {
          console.warn("Error generating live preview:", error);
        }
      }
    }, 150); // 150ms 防抖延迟
  }, [image, imageQuality]);

  // 生成实时预览 (保留原函数用于非防抖场景)
  const generateLivePreview = useCallback(() => {
    if (cropperRef.current?.cropper && image) {
      try {
        const cropper = cropperRef.current.cropper;

        // 获取裁剪数据的实际像素尺寸
        const cropData = cropper.getData();
        const maxPreviewSize = 400;

        // 计算预览尺寸，保持原始比例
        let previewWidth = cropData.width;
        let previewHeight = cropData.height;

        if (previewWidth > maxPreviewSize || previewHeight > maxPreviewSize) {
          const ratio = Math.min(
            maxPreviewSize / previewWidth,
            maxPreviewSize / previewHeight
          );
          previewWidth = Math.round(previewWidth * ratio);
          previewHeight = Math.round(previewHeight * ratio);
        }

        // 生成动态尺寸的实时预览
        const canvas = cropper.getCroppedCanvas({
          width: previewWidth,
          height: previewHeight,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high",
        });

        if (canvas) {
          const previewUrl = canvas.toDataURL("image/png", imageQuality);
          setLivePreview(previewUrl);
        }
      } catch (error) {
        console.warn("Error generating live preview:", error);
      }
    }
  }, [image, imageQuality]);

  // 组合更新函数
  const handleCropperChange = useCallback(() => {
    updateCropData();
    generateLivePreviewDebounced();
  }, [updateCropData, generateLivePreviewDebounced]);

  // Handle file upload
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File size exceeds 10MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`
        );
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      setIsLoading(true);
      setFileName(file.name);
      setFileSize(file.size);

      // 获取原文件类型
      const fileType = file.type.split("/")[1];
      setOriginalFileType(fileType);
      setDownloadFormat(fileType);

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setImage(imageUrl);
        setLivePreview("");

        // 创建Image对象获取图片尺寸
        const img = new Image();
        img.onload = () => {
          // 计算宽高比
          const gcd = (a: number, b: number): number =>
            b === 0 ? a : gcd(b, a % b);
          const commonDivisor = gcd(img.width, img.height);
          const ratioWidth = img.width / commonDivisor;
          const ratioHeight = img.height / commonDivisor;
          const aspectRatio = `${ratioWidth}:${ratioHeight}`;

          // 设置图片详细信息
          setImageInfo({
            width: img.width,
            height: img.height,
            type: file.type,
            lastModified: file.lastModified,
            aspectRatio: aspectRatio,
          });

          setIsLoading(false);
          toast.success("Image uploaded and analyzed successfully");
        };
        img.onerror = () => {
          setIsLoading(false);
          toast.error("Failed to analyze image dimensions");
        };
        img.src = imageUrl;
      };
      reader.onerror = () => {
        toast.error("Failed to read the file");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  // Handle crop mode change
  const handleCropModeChange = useCallback(
    (newMode: string) => {
      setCropMode(newMode);
      const mode = CROP_MODES.find((m) => m.value === newMode);

      if (cropperRef.current?.cropper && mode) {
        cropperRef.current.cropper.setAspectRatio(mode.aspectRatio || NaN);
        setTimeout(() => handleCropperChange(), 100);
      }
    },
    [handleCropperChange]
  );

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Handle download - 快速下载原分辨率
  const handleDownload = useCallback(() => {
    if (cropperRef.current?.cropper) {
      try {
        // 获取裁剪数据的实际像素尺寸
        const cropData = cropperRef.current.cropper.getData();

        // 使用裁剪后的实际像素尺寸，限制最大尺寸避免性能问题
        const maxOutputSize = 1500;
        let outputWidth = Math.round(cropData.width);
        let outputHeight = Math.round(cropData.height);

        if (outputWidth > maxOutputSize || outputHeight > maxOutputSize) {
          const ratio = Math.min(
            maxOutputSize / outputWidth,
            maxOutputSize / outputHeight
          );
          outputWidth = Math.round(outputWidth * ratio);
          outputHeight = Math.round(outputHeight * ratio);
        }

        const canvas = cropperRef.current.cropper.getCroppedCanvas({
          width: outputWidth,
          height: outputHeight,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "medium", // 中等质量，快速处理
        });

        if (canvas) {
          const croppedDataUrl = canvas.toDataURL(
            `image/${downloadFormat}`,
            0.85
          ); // 固定85%质量，快速下载
          const link = document.createElement("a");
          link.download = `cropped-${fileName.split(".")[0]}.${downloadFormat}`;
          link.href = croppedDataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success(
            `Quick download completed (${outputWidth}×${outputHeight})`
          );
        }
      } catch (error) {
        toast.error("Download failed. Please try again.");
        console.error("Download error:", error);
      }
    } else {
      toast.error("No image available to download");
    }
  }, [fileName, downloadFormat]);

  // Handle high quality download - 最高质量原分辨率下载
  const handleHighQualityDownload = useCallback(() => {
    if (cropperRef.current?.cropper) {
      try {
        // 获取裁剪数据的实际像素尺寸
        const cropData = cropperRef.current.cropper.getData();

        // 使用完整原始像素尺寸，无限制（用户选择的就是最高质量）
        const outputWidth = Math.round(cropData.width);
        const outputHeight = Math.round(cropData.height);

        const canvas = cropperRef.current.cropper.getCroppedCanvas({
          width: outputWidth,
          height: outputHeight,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high", // 最高质量
        });

        if (canvas) {
          const croppedDataUrl = canvas.toDataURL(
            `image/${downloadFormat}`,
            imageQuality
          ); // 使用用户设置的质量
          const link = document.createElement("a");
          link.download = `hq-cropped-${fileName.split(".")[0]}.${downloadFormat}`;
          link.href = croppedDataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success(
            `High quality download completed (${outputWidth}×${outputHeight})`
          );
        }
      } catch (error) {
        toast.error("High quality download failed. Please try again.");
        console.error("High quality download error:", error);
      }
    } else {
      toast.error("No image available for high quality download");
    }
  }, [downloadFormat, imageQuality, fileName]);

  // Handle copy to clipboard
  const handleCopyToClipboard = useCallback(async () => {
    if (cropperRef.current?.cropper) {
      try {
        // 获取裁剪数据的实际像素尺寸
        const cropData = cropperRef.current.cropper.getData();

        // 限制复制尺寸避免性能问题
        const maxCopySize = 1000;
        let outputWidth = Math.round(cropData.width);
        let outputHeight = Math.round(cropData.height);

        if (outputWidth > maxCopySize || outputHeight > maxCopySize) {
          const ratio = Math.min(
            maxCopySize / outputWidth,
            maxCopySize / outputHeight
          );
          outputWidth = Math.round(outputWidth * ratio);
          outputHeight = Math.round(outputHeight * ratio);
        }

        const canvas = cropperRef.current.cropper.getCroppedCanvas({
          width: outputWidth,
          height: outputHeight,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high",
        });

        if (canvas) {
          // 将canvas转换为blob
          canvas.toBlob(async (blob) => {
            if (blob) {
              try {
                // 使用Clipboard API复制图片
                await navigator.clipboard.write([
                  new ClipboardItem({
                    "image/png": blob,
                  }),
                ]);
                toast.success(
                  `Image copied to clipboard (${outputWidth}×${outputHeight})`
                );
              } catch (clipError) {
                // 如果Clipboard API失败，尝试复制为data URL
                console.warn(
                  "Clipboard API failed, trying fallback:",
                  clipError
                );
                const dataUrl = canvas.toDataURL("image/png");

                // 创建临时textarea复制data URL
                const textArea = document.createElement("textarea");
                textArea.value = dataUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);

                toast.success("Image data copied to clipboard");
              }
            } else {
              toast.error("Failed to create image blob for copying");
            }
          }, "image/png");
        }
      } catch (error) {
        toast.error(
          "Copy to clipboard failed. Please try downloading instead."
        );
        console.error("Copy error:", error);
      }
    } else {
      toast.error("No image available to copy");
    }
  }, []);

  // Cropper control functions
  const handleRotateLeft = () => cropperRef.current?.cropper.rotate(-90);
  const handleRotateRight = () => cropperRef.current?.cropper.rotate(90);
  const handleZoomIn = () => cropperRef.current?.cropper.zoom(0.1);
  const handleZoomOut = () => cropperRef.current?.cropper.zoom(-0.1);
  const handleReset = () => {
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.reset();
      setTimeout(() => handleCropperChange(), 100);
    }
  };

  // 添加更多控制功能
  const handleFlipHorizontal = () => {
    if (cropperRef.current?.cropper) {
      const imageData = cropperRef.current.cropper.getImageData();
      cropperRef.current.cropper.scaleX(-(imageData.scaleX || 1));
      setTimeout(() => handleCropperChange(), 100);
    }
  };

  const handleFlipVertical = () => {
    if (cropperRef.current?.cropper) {
      const imageData = cropperRef.current.cropper.getImageData();
      cropperRef.current.cropper.scaleY(-(imageData.scaleY || 1));
      setTimeout(() => handleCropperChange(), 100);
    }
  };

  const handleMove = (offsetX: number, offsetY: number) => {
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.move(offsetX, offsetY);
      setTimeout(() => handleCropperChange(), 100);
    }
  };

  const handleRotate = (degree: number) => {
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.rotate(degree);
      setTimeout(() => handleCropperChange(), 100);
    }
  };

  const handleZoomTo = (ratio: number) => {
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.zoomTo(ratio);
      setTimeout(() => handleCropperChange(), 100);
    }
  };

  // 45度旋转功能
  const handleRotate45 = () => {
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.rotate(45);
      setTimeout(() => handleCropperChange(), 100);
    }
  };

  const handleRotateMinus45 = () => {
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.rotate(-45);
      setTimeout(() => handleCropperChange(), 100);
    }
  };

  // dragMode 切换功能
  const handleToggleDragMode = () => {
    if (cropperRef.current?.cropper) {
      const newMode = dragMode === "crop" ? "move" : "crop";
      setDragMode(newMode);
      cropperRef.current.cropper.setDragMode(newMode);
    }
  };

  // 处理 ToggleGroup 的 dragMode 变化
  const handleDragModeChange = (newMode: "crop" | "move") => {
    if (cropperRef.current?.cropper && newMode) {
      setDragMode(newMode);
      cropperRef.current.cropper.setDragMode(newMode);
    }
  };

  // Reset all
  const handleResetAll = useCallback(() => {
    setImage("");
    setLivePreview("");
    setFileName("");
    setFileSize(0);
    setImageQuality(0.9); // 重置质量为默认值
    setImageInfo(null); // 清理图片信息
    setCropData({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    });
    // 清理防抖定时器
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("All data cleared");
  }, []);

  // Get current mode
  const mode = CROP_MODES.find((m) => m.value === cropMode) || CROP_MODES[0];

  return (
    <div className="container mx-auto p-6 max-w-6xl flex justify-center flex-col">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        aria-label="Upload image file"
      />

      {/* Tab Navigation for Crop Modes */}
      <Tabs
        value={cropMode}
        onValueChange={handleCropModeChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 h-auto">
          {CROP_MODES.map((mode) => (
            <TabsTrigger
              key={mode.value}
              value={mode.value}
              className="text-xs md:text-sm py-2 px-1 md:px-3"
            >
              {mode.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {CROP_MODES.map((mode) => (
          <TabsContent key={mode.value} value={mode.value} className="mt-6">
            {/* Main Card */}
            <Card className="w-full">
              {/* Card Header */}
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl font-semibold">
                      <h2>{mode.label} Cropper</h2>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {mode.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                      variant="outline"
                      className="gap-2 flex"
                      size="sm"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="hidden lg:block">
                        {isLoading
                          ? "Loading..."
                          : image
                            ? "Replace Image"
                            : "Upload Image"}
                      </span>
                    </Button>
                    {image && (
                      <Button
                        onClick={handleResetAll}
                        variant="destructive"
                        className="gap-2 flex"
                        size="sm"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span className="hidden lg:block">Reset All</span>
                      </Button>
                    )}
                  </div>
                </div>

                {fileName && imageInfo && (
                  <div className="mt-4">
                    {/* Image Properties */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          File Name
                        </div>
                        <div
                          className="text-sm font-medium truncate"
                          title={fileName}
                        >
                          {fileName}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          File Size
                        </div>
                        <div className="text-sm font-medium">
                          {formatFileSize(fileSize)}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          Dimensions
                        </div>
                        <div className="text-sm font-medium">
                          {imageInfo.width} × {imageInfo.height}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          Aspect Ratio
                        </div>
                        <div className="text-sm font-medium">
                          {imageInfo.aspectRatio}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">
                          File Type
                        </div>
                        <div className="text-sm font-medium">
                          {imageInfo.type.split("/")[1].toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardHeader>

              {/* Card Content */}
              {image && (
                <CardContent className="pb-4">
                  <div className="space-y-6">
                    {/* Main Content Area - Left: Cropper, Right: Preview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Side - Cropper + Tools (2/3) */}
                      <div className="lg:col-span-2 space-y-4">
                        <Label className="text-sm font-medium mb-3 block">
                          Crop Area
                        </Label>
                        <div className="w-full h-96 overflow-hidden rounded-lg border bg-muted/20">
                          <Cropper
                            ref={cropperRef}
                            src={image}
                            style={{ height: "100%", width: "100%" }}
                            aspectRatio={mode.aspectRatio || NaN}
                            viewMode={1}
                            dragMode={dragMode}
                            autoCrop={true}
                            autoCropArea={0.8}
                            responsive={true}
                            restore={false}
                            checkOrientation={false}
                            cropBoxMovable={true}
                            cropBoxResizable={true}
                            guides={true}
                            center={true}
                            highlight={true}
                            background={true}
                            modal={true}
                            movable={true}
                            rotatable={true}
                            scalable={true}
                            zoomable={true}
                            zoomOnTouch={true}
                            zoomOnWheel={true}
                            toggleDragModeOnDblclick={false}
                            minCropBoxWidth={50}
                            minCropBoxHeight={50}
                            ready={() => {
                              console.log("Cropper is ready");
                              handleCropperChange();
                            }}
                            crop={() => handleCropperChange()}
                            cropend={() => handleCropperChange()}
                            cropmove={() => handleCropperChange()}
                            zoom={() => handleCropperChange()}
                          />
                        </div>

                        {/* Tools & Controls */}
                        <Accordion
                          type="single"
                          collapsible
                          defaultValue="tools-controls"
                          className="w-full border rounded-lg px-4"
                        >
                          <AccordionItem value="tools-controls">
                            <AccordionTrigger className="text-sm font-medium">
                              Tools & Controls
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex justify-between gap-2">
                                  {/* Mode Controls */}
                                  <div>
                                    <Label className="text-xs text-muted-foreground mb-2 block">
                                      Mode
                                    </Label>
                                    <ToggleGroup
                                      size="sm"
                                      variant="outline"
                                      type="single"
                                      value={dragMode}
                                      onValueChange={(value) =>
                                        value &&
                                        handleDragModeChange(
                                          value as "crop" | "move"
                                        )
                                      }
                                      className="justify-start"
                                    >
                                      <ToggleGroupItem
                                        value="crop"
                                        aria-label="Crop mode"
                                        className="flex items-center"
                                      >
                                        <Crop className="w-4 h-4" />
                                        <span className="text-xs">Crop</span>
                                      </ToggleGroupItem>
                                      <ToggleGroupItem
                                        value="move"
                                        aria-label="Move mode"
                                        className="flex items-center"
                                      >
                                        <Move className="w-4 h-4" />
                                        <span className="text-xs">Move</span>
                                      </ToggleGroupItem>
                                    </ToggleGroup>
                                  </div>
                                  {/* Move Controls */}
                                  <div>
                                    <Label className="text-xs text-muted-foreground mb-2 block">
                                      Move
                                    </Label>
                                    <div className="grid grid-cols-4 gap-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleMove(0, -10)}
                                      >
                                        <ArrowUp className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleMove(-10, 0)}
                                      >
                                        <ArrowLeft className="w-4 h-4" />
                                      </Button>

                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleMove(10, 0)}
                                      >
                                        <ArrowRight className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleMove(0, 10)}
                                      >
                                        <ArrowDown className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>

                                {/* Transform Controls */}
                                <div>
                                  <Label className="text-xs text-muted-foreground mb-2 block">
                                    Transform
                                  </Label>
                                  <div className="grid grid-cols-4 gap-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleRotate(-90)}
                                    >
                                      <RotateCcw className="w-3 h-3 mr-1" />
                                      90°
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleRotate(90)}
                                    >
                                      <RotateCw className="w-3 h-3 mr-1" />
                                      90°
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleRotateMinus45}
                                    >
                                      <RotateCcw className="w-3 h-3 mr-1" />
                                      45°
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleRotate45}
                                    >
                                      <RotateCw className="w-3 h-3 mr-1" />
                                      45°
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleFlipHorizontal}
                                    >
                                      <FlipHorizontal className="w-3 h-3 mr-1" />
                                      H
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleFlipVertical}
                                    >
                                      <FlipVertical className="w-3 h-3 mr-1" />V
                                    </Button>
                                  </div>
                                </div>

                                {/* Zoom & Actions */}
                                <div>
                                  <Label className="text-xs text-muted-foreground mb-2 block">
                                    Zoom & Actions
                                  </Label>
                                  <div className="grid grid-cols-4 gap-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleZoomIn}
                                    >
                                      <ZoomIn className="w-3 h-3 mr-1" />
                                      In
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleZoomOut}
                                    >
                                      <ZoomOut className="w-3 h-3 mr-1" />
                                      Out
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleZoomTo(1)}
                                    >
                                      100%
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={handleReset}
                                    >
                                      Reset
                                    </Button>
                                  </div>
                                </div>

                                {/* Quality Control */}
                                <div>
                                  <Label className="text-xs text-muted-foreground mb-2 block">
                                    Export Quality
                                  </Label>
                                  <div className="space-y-2">
                                    <Select
                                      value={imageQuality.toString()}
                                      onValueChange={(value) =>
                                        setImageQuality(parseFloat(value))
                                      }
                                    >
                                      <SelectTrigger className="w-full h-8 text-xs">
                                        <SelectValue placeholder="Select quality" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="1">
                                          Best (100%)
                                        </SelectItem>
                                        <SelectItem value="0.95">
                                          High (95%)
                                        </SelectItem>
                                        <SelectItem value="0.9">
                                          Good (90%)
                                        </SelectItem>
                                        <SelectItem value="0.8">
                                          Medium (80%)
                                        </SelectItem>
                                        <SelectItem value="0.7">
                                          Low (70%)
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <div className="text-xs text-muted-foreground text-center">
                                      Export: {Math.round(imageQuality * 100)}%
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Right Side - Preview + Parameters + Actions (1/3) */}
                      <div className="lg:col-span-1 space-y-4">
                        <Label className="text-sm font-medium mb-3 block">
                          Live Preview
                        </Label>
                        <div className="w-full h-64 border rounded-lg bg-muted/20 overflow-hidden relative">
                          {livePreview ? (
                            <div className="w-full h-full flex items-center justify-center p-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={livePreview}
                                alt="Live preview"
                                className="w-full h-full object-contain rounded-lg"
                              />
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-center text-muted-foreground">
                              <div>
                                <Crop className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">
                                  Real-time crop preview
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Crop Parameters */}
                        <Accordion
                          type="single"
                          collapsible
                          defaultValue="crop-parameters"
                          className="w-full border px-4 rounded-lg"
                        >
                          <AccordionItem value="crop-parameters">
                            <AccordionTrigger className="text-sm font-medium">
                              Crop Parameters
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      X:
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="font-mono text-xs"
                                    >
                                      {cropData.x}px
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      Y:
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="font-mono text-xs"
                                    >
                                      {cropData.y}px
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      Width:
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="font-mono text-xs"
                                    >
                                      {cropData.width}px
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      Height:
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="font-mono text-xs"
                                    >
                                      {cropData.height}px
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      Rotate:
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="font-mono text-xs"
                                    >
                                      {cropData.rotate}°
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      Scale(X,Y):
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="font-mono text-xs"
                                    >
                                      {cropData.scaleX}×{cropData.scaleY}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        {/* Export & Share */}
                        <div>
                          <Label className="text-sm font-medium mb-3 block">
                            Export & Share
                          </Label>
                          <div className="space-y-3">
                            {/* Format Selection */}
                            <Select
                              value={downloadFormat}
                              onValueChange={setDownloadFormat}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="png">PNG</SelectItem>
                                <SelectItem value="jpeg">JPEG</SelectItem>
                                <SelectItem value="webp">WebP</SelectItem>
                              </SelectContent>
                            </Select>

                            {/* Action Buttons */}
                            <div className="space-y-2">
                              {/* Copy to Clipboard */}
                              <Button
                                onClick={handleCopyToClipboard}
                                size="sm"
                                variant="outline"
                                className="w-full"
                                disabled={!livePreview}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy to Clipboard
                              </Button>

                              {/* Quick Download */}
                              <Button
                                onClick={handleDownload}
                                size="sm"
                                className="w-full"
                                disabled={!livePreview}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Quick Download
                              </Button>

                              {/* High Quality Download */}
                              <Button
                                onClick={handleHighQualityDownload}
                                size="sm"
                                variant="outline"
                                className="w-full"
                                disabled={!livePreview}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Best Quality
                              </Button>
                            </div>

                            {/* Export Tips */}
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p>
                                • <strong>Copy:</strong> To clipboard (~1000px
                                max)
                              </p>
                              <p>
                                • <strong>Quick:</strong> Fast download (~1500px
                                max, 85% quality)
                              </p>
                              <p>
                                • <strong>Best:</strong> Full resolution with
                                custom quality
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}

              {/* No Image State */}
              {!image && (
                <CardContent>
                  <div className="text-center py-12">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">
                      No Image Selected
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Upload an image to start cropping with {mode.label} mode
                    </p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Image
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
