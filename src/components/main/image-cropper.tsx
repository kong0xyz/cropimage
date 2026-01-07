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
  SelectGroup,
  SelectLabel,
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
import { useTranslations } from "next-intl";

interface CropMode {
  label: string;
  value: string;
  description: string;
  category: string;
  aspectRatio?: number;
  options?: any;
}

const CROP_MODES: CropMode[] = [
  // 基础模式
  {
    label: "Free Crop",
    value: "free",
    description: "Freely adjust crop area without ratio constraints",
    category: "Basic",
    aspectRatio: NaN,
  },
  {
    label: "Square (1:1)",
    value: "square",
    description: "Perfect for profile photos and avatars",
    category: "Basic",
    aspectRatio: 1,
  },
  {
    label: "Portrait (3:4)",
    value: "portrait",
    description: "Traditional portrait orientation",
    category: "Basic",
    aspectRatio: 3 / 4,
  },
  {
    label: "Landscape (4:3)",
    value: "landscape",
    description: "Traditional landscape orientation",
    category: "Basic",
    aspectRatio: 4 / 3,
  },
  {
    label: "Wide (16:9)",
    value: "wide",
    description: "Widescreen format for banners and covers",
    category: "Basic",
    aspectRatio: 16 / 9,
  },

  // Instagram 尺寸
  {
    label: "Instagram Post (1:1)",
    value: "instagram_post",
    description: "Instagram square post format",
    category: "Instagram",
    aspectRatio: 1,
  },
  {
    label: "Instagram Portrait (4:5)",
    value: "instagram_portrait",
    description: "Instagram portrait post format",
    category: "Instagram",
    aspectRatio: 4 / 5,
  },
  {
    label: "Instagram Story (9:16)",
    value: "instagram_story",
    description: "Instagram Stories and Reels format",
    category: "Instagram",
    aspectRatio: 9 / 16,
  },

  // Facebook 尺寸
  {
    label: "Facebook Post (1.91:1)",
    value: "facebook_post",
    description: "Facebook timeline post format",
    category: "Facebook",
    aspectRatio: 1.91,
  },
  {
    label: "Facebook Cover (16:6)",
    value: "facebook_cover",
    description: "Facebook page cover photo",
    category: "Facebook",
    aspectRatio: 16 / 6,
  },
  {
    label: "Facebook Event (16:9)",
    value: "facebook_event",
    description: "Facebook event cover photo",
    category: "Facebook",
    aspectRatio: 16 / 9,
  },

  // Twitter/X 尺寸
  {
    label: "X/Twitter Post (16:9)",
    value: "twitter_post",
    description: "X/Twitter timeline post format",
    category: "X/Twitter",
    aspectRatio: 16 / 9,
  },
  {
    label: "X/Twitter Header (3:1)",
    value: "twitter_header",
    description: "X/Twitter profile header",
    category: "X/Twitter",
    aspectRatio: 3,
  },

  // TikTok 尺寸
  {
    label: "TikTok Video (9:16)",
    value: "tiktok_video",
    description: "TikTok vertical video format",
    category: "TikTok",
    aspectRatio: 9 / 16,
  },

  // YouTube 尺寸
  {
    label: "YouTube Thumbnail (16:9)",
    value: "youtube_thumbnail",
    description: "YouTube video thumbnail",
    category: "YouTube",
    aspectRatio: 16 / 9,
  },
  {
    label: "YouTube Shorts (9:16)",
    value: "youtube_shorts",
    description: "YouTube Shorts vertical format",
    category: "YouTube",
    aspectRatio: 9 / 16,
  },
  {
    label: "YouTube Channel Art (16:9)",
    value: "youtube_banner",
    description: "YouTube channel banner",
    category: "YouTube",
    aspectRatio: 16 / 9,
  },

  // LinkedIn 尺寸
  {
    label: "LinkedIn Post (1.91:1)",
    value: "linkedin_post",
    description: "LinkedIn timeline post format",
    category: "LinkedIn",
    aspectRatio: 1.91,
  },
  {
    label: "LinkedIn Cover (4:1)",
    value: "linkedin_cover",
    description: "LinkedIn profile cover photo",
    category: "LinkedIn",
    aspectRatio: 4,
  },

  // Pinterest 尺寸
  {
    label: "Pinterest Pin (2:3)",
    value: "pinterest_pin",
    description: "Pinterest standard pin format",
    category: "Pinterest",
    aspectRatio: 2 / 3,
  },
  {
    label: "Pinterest Square (1:1)",
    value: "pinterest_square",
    description: "Pinterest square pin format",
    category: "Pinterest",
    aspectRatio: 1,
  },

  // 打印和摄影尺寸
  {
    label: "A4 Portrait (210:297)",
    value: "a4_portrait",
    description: "A4 paper portrait orientation",
    category: "Print",
    aspectRatio: 210 / 297,
  },
  {
    label: "A4 Landscape (297:210)",
    value: "a4_landscape",
    description: "A4 paper landscape orientation",
    category: "Print",
    aspectRatio: 297 / 210,
  },
  {
    label: "Photo 4x6",
    value: "photo_4x6",
    description: "Standard 4x6 inch photo print",
    category: "Print",
    aspectRatio: 6 / 4,
  },
  {
    label: "Photo 5x7",
    value: "photo_5x7",
    description: "Standard 5x7 inch photo print",
    category: "Print",
    aspectRatio: 7 / 5,
  },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageCropper() {
  const t = useTranslations("crop.component");

  // 使用翻译创建动态的 CROP_MODES
  const CROP_MODES: CropMode[] = useMemo(
    () => [
      // 基础模式
      {
        label: t("modes.freeCrop.label"),
        value: "free",
        description: t("modes.freeCrop.description"),
        category: t("modes.basic"),
        aspectRatio: NaN,
      },
      {
        label: t("modes.square.label"),
        value: "square",
        description: t("modes.square.description"),
        category: t("modes.basic"),
        aspectRatio: 1,
      },
      {
        label: t("modes.portrait.label"),
        value: "portrait",
        description: t("modes.portrait.description"),
        category: t("modes.basic"),
        aspectRatio: 3 / 4,
      },
      {
        label: t("modes.landscape.label"),
        value: "landscape",
        description: t("modes.landscape.description"),
        category: t("modes.basic"),
        aspectRatio: 4 / 3,
      },
      {
        label: t("modes.wide.label"),
        value: "wide",
        description: t("modes.wide.description"),
        category: t("modes.basic"),
        aspectRatio: 16 / 9,
      },

      // 社交媒体 Instagram
      {
        label: t("modes.instagramPost.label"),
        value: "instagram_post",
        description: t("modes.instagramPost.description"),
        category: "Instagram",
        aspectRatio: 1,
      },
      {
        label: t("modes.instagramStory.label"),
        value: "instagram_story",
        description: t("modes.instagramStory.description"),
        category: "Instagram",
        aspectRatio: 9 / 16,
      },

      // Facebook
      {
        label: t("modes.facebookCover.label"),
        value: "facebook_cover",
        description: t("modes.facebookCover.description"),
        category: "Facebook",
        aspectRatio: 16 / 9,
      },

      // Twitter/X
      {
        label: t("modes.twitterPost.label"),
        value: "twitter_post",
        description: t("modes.twitterPost.description"),
        category: "X/Twitter",
        aspectRatio: 16 / 9,
      },

      // LinkedIn
      {
        label: t("modes.linkedinPost.label"),
        value: "linkedin_post",
        description: t("modes.linkedinPost.description"),
        category: "LinkedIn",
        aspectRatio: 1.91,
      },

      // YouTube
      {
        label: t("modes.youtubeThumb.label"),
        value: "youtube_thumbnail",
        description: t("modes.youtubeThumb.description"),
        category: "YouTube",
        aspectRatio: 16 / 9,
      },

      // Pinterest
      {
        label: t("modes.pinterestPin.label"),
        value: "pinterest_pin",
        description: t("modes.pinterestPin.description"),
        category: "Pinterest",
        aspectRatio: 2 / 3,
      },
    ],
    [t]
  );
  const [image, setImage] = useState<string>("");
  const [livePreview, setLivePreview] = useState<string>("");
  const [dragMode, setDragMode] = useState<"crop" | "move">("crop");
  const [cropMode, setCropMode] = useState<string>("free");
  const [customWidth, setCustomWidth] = useState<string>("1");
  const [customHeight, setCustomHeight] = useState<string>("1");
  const [showCustomRatio, setShowCustomRatio] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [originalFileType, setOriginalFileType] = useState<string>("png");
  const [originalFile, setOriginalFile] = useState<File | null>(null);
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
          t("messages.fileSizeExceeded", {
            size: (file.size / 1024 / 1024).toFixed(2),
          })
        );
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error(t("messages.invalidImageFile"));
        return;
      }

      setIsLoading(true);
      setFileName(file.name);
      setFileSize(file.size);
      setOriginalFile(file);

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
          toast.success(t("messages.imageUploadedSuccessfully"));
        };
        img.onerror = () => {
          setIsLoading(false);
          toast.error(t("messages.failedToAnalyzeImage"));
        };
        img.src = imageUrl;
      };
      reader.onerror = () => {
        toast.error(t("messages.failedToReadFile"));
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    },
    [t]
  );

  // Handle crop mode change
  const handleCropModeChange = useCallback(
    (newMode: string) => {
      setCropMode(newMode);
      setShowCustomRatio(newMode === "custom");

      if (newMode === "custom") {
        // 使用自定义比例
        const customRatio = parseFloat(customWidth) / parseFloat(customHeight);
        if (
          cropperRef.current?.cropper &&
          !isNaN(customRatio) &&
          customRatio > 0
        ) {
          cropperRef.current.cropper.setAspectRatio(customRatio);
          setTimeout(() => handleCropperChange(), 100);
        }
      } else {
        // 使用预定义比例
        const mode = CROP_MODES.find((m) => m.value === newMode);
        if (cropperRef.current?.cropper && mode) {
          cropperRef.current.cropper.setAspectRatio(mode.aspectRatio || NaN);
          setTimeout(() => handleCropperChange(), 100);
        }
      }
    },
    [handleCropperChange, customWidth, customHeight, CROP_MODES]
  );

  // Handle custom ratio change
  const handleCustomRatioChange = useCallback(() => {
    if (cropMode === "custom" && cropperRef.current?.cropper) {
      const customRatio = parseFloat(customWidth) / parseFloat(customHeight);
      if (!isNaN(customRatio) && customRatio > 0) {
        cropperRef.current.cropper.setAspectRatio(customRatio);
        setTimeout(() => handleCropperChange(), 100);
      }
    }
  }, [cropMode, customWidth, customHeight, handleCropperChange]);

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
          // AVIF 格式使用服务端 Sharp 处理
          if (downloadFormat === "avif") {
            (async () => {
              try {
                // 获取原始图像文件
                if (!originalFile) {
                  toast.error(t("messages.originalFileNotAvailable"));
                  return;
                }

                // 获取当前裁剪区域
                const currentCropData = cropperRef.current?.cropper.getData();
                if (!currentCropData) {
                  toast.error(t("messages.cannotGetCropData"));
                  return;
                }

                // 准备裁剪参数
                const params = {
                  x: Math.round(currentCropData.x),
                  y: Math.round(currentCropData.y),
                  width: Math.round(currentCropData.width),
                  height: Math.round(currentCropData.height),
                  format: downloadFormat,
                  quality: 0.7, // AVIF 使用较低质量，服务端会再次调整
                  originalSize: originalFile.size,
                };

                // 创建 FormData
                const formData = new FormData();
                formData.append("image", originalFile);
                formData.append("params", JSON.stringify(params));

                // 发送到服务端处理
                toast.loading(t("messages.processingAvifImage"));
                const response = await fetch("/api/crop-image", {
                  method: "POST",
                  body: formData,
                });

                if (!response.ok) {
                  throw new Error("Server processing failed");
                }

                // 下载处理后的图像
                const processedBlob = await response.blob();
                const url = URL.createObjectURL(processedBlob);
                const link = document.createElement("a");
                link.download = `cropped-${fileName.split(".")[0]}.${downloadFormat}`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                const sizeMB = (processedBlob.size / 1024 / 1024).toFixed(2);
                toast.dismiss();
                toast.success(
                  `${t("messages.quickDownloadCompleted", { width: outputWidth, height: outputHeight })} (${sizeMB}MB)`,
                  { duration: 4000 }
                );
              } catch (error) {
                console.error("AVIF processing error:", error);
                toast.dismiss();
                toast.error(t("messages.avifProcessingFailed"));
              }
            })();
          } else {
            // 其他格式使用客户端处理
            const quality = 0.85;
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.download = `cropped-${fileName.split(".")[0]}.${downloadFormat}`;
                  link.href = url;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                  toast.success(
                    t("messages.quickDownloadCompleted", {
                      width: outputWidth,
                      height: outputHeight,
                    })
                  );
                } else {
                  toast.error(t("messages.downloadFailed"));
                }
              },
              `image/${downloadFormat}`,
              quality
            );
          }
        }
      } catch (error) {
        toast.error(t("messages.downloadFailed"));
        console.error("Download error:", error);
      }
    } else {
      toast.error(t("messages.noImageAvailableToDownload"));
    }
  }, [fileName, downloadFormat, fileSize, originalFileType, t]);

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
          // AVIF 格式使用服务端 Sharp 处理
          if (downloadFormat === "avif") {
            (async () => {
              try {
                // 获取原始图像文件
                if (!originalFile) {
                  toast.error(t("messages.originalFileNotAvailable"));
                  return;
                }

                // 获取当前裁剪区域
                const currentCropData = cropperRef.current?.cropper.getData();
                if (!currentCropData) {
                  toast.error(t("messages.cannotGetCropData"));
                  return;
                }

                // 准备裁剪参数
                const params = {
                  x: Math.round(currentCropData.x),
                  y: Math.round(currentCropData.y),
                  width: Math.round(currentCropData.width),
                  height: Math.round(currentCropData.height),
                  format: downloadFormat,
                  quality: Math.min(imageQuality, 0.8), // AVIF 限制最高 0.8
                  originalSize: originalFile.size,
                };

                // 创建 FormData
                const formData = new FormData();
                formData.append("image", originalFile);
                formData.append("params", JSON.stringify(params));

                // 发送到服务端处理
                toast.loading(t("messages.processingHighQualityAvif"));
                const response = await fetch("/api/crop-image", {
                  method: "POST",
                  body: formData,
                });

                if (!response.ok) {
                  throw new Error("Server processing failed");
                }

                // 下载处理后的图像
                const processedBlob = await response.blob();
                const url = URL.createObjectURL(processedBlob);
                const link = document.createElement("a");
                link.download = `hq-cropped-${fileName.split(".")[0]}.${downloadFormat}`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                const sizeMB = (processedBlob.size / 1024 / 1024).toFixed(2);
                toast.dismiss();
                toast.success(
                  `${t("messages.highQualityDownloadCompleted", { width: outputWidth, height: outputHeight })} (${sizeMB}MB)`,
                  { duration: 4000 }
                );
              } catch (error) {
                console.error("AVIF processing error:", error);
                toast.dismiss();
                toast.error(t("messages.avifProcessingFailed"));
              }
            })();
          } else {
            // 其他格式使用客户端处理
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.download = `hq-cropped-${fileName.split(".")[0]}.${downloadFormat}`;
                  link.href = url;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                  toast.success(
                    t("messages.highQualityDownloadCompleted", {
                      width: outputWidth,
                      height: outputHeight,
                    })
                  );
                } else {
                  toast.error(t("messages.highQualityDownloadFailed"));
                }
              },
              `image/${downloadFormat}`,
              imageQuality
            );
          }
        }
      } catch (error) {
        toast.error(t("messages.highQualityDownloadFailed"));
        console.error("High quality download error:", error);
      }
    } else {
      toast.error(t("messages.noImageAvailableForHighQuality"));
    }
  }, [downloadFormat, imageQuality, fileName, fileSize, originalFileType, t]);

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
                  t("messages.imageCopiedToClipboard", {
                    width: outputWidth,
                    height: outputHeight,
                  })
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

                toast.success(t("messages.imageDataCopiedToClipboard"));
              }
            } else {
              toast.error(t("messages.failedToCreateImageBlob"));
            }
          }, "image/png");
        }
      } catch (error) {
        toast.error(t("messages.copyToClipboardFailed"));
        console.error("Copy error:", error);
      }
    } else {
      toast.error(t("messages.noImageAvailableToCopy"));
    }
  }, [t]);

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
    toast.success(t("messages.allDataCleared"));
  }, [t]);

  // Get current mode
  const mode = CROP_MODES.find((m) => m.value === cropMode) || CROP_MODES[0];

  return (
    <div className="mx-auto max-w-6xl flex justify-center flex-col gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        aria-label={t("messages.uploadImageFile")}
      />

      {/* Crop Mode Selection */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="">
            <label className="text-sm font-medium mb-2 block">
              {t("modes.basic")}
            </label>
            <Select value={cropMode} onValueChange={handleCropModeChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("modes.basic")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("ui.custom")}</SelectLabel>
                  <SelectItem value="custom">{t("ui.customRatio")}</SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>{t("modes.basic")}</SelectLabel>
                  {CROP_MODES.filter(
                    (mode) => mode.category === t("modes.basic")
                  ).map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>{t("ui.instagram")}</SelectLabel>
                  {CROP_MODES.filter(
                    (mode) => mode.category === "Instagram"
                  ).map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>{t("ui.facebook")}</SelectLabel>
                  {CROP_MODES.filter(
                    (mode) => mode.category === "Facebook"
                  ).map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>{t("ui.twitter")}</SelectLabel>
                  {CROP_MODES.filter(
                    (mode) => mode.category === "X/Twitter"
                  ).map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>{t("ui.tiktok")}</SelectLabel>
                  {CROP_MODES.filter((mode) => mode.category === "TikTok").map(
                    (mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>{t("ui.youtube")}</SelectLabel>
                  {CROP_MODES.filter((mode) => mode.category === "YouTube").map(
                    (mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>{t("ui.linkedin")}</SelectLabel>
                  {CROP_MODES.filter(
                    (mode) => mode.category === "LinkedIn"
                  ).map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>{t("ui.pinterest")}</SelectLabel>
                  {CROP_MODES.filter(
                    (mode) => mode.category === "Pinterest"
                  ).map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>{t("ui.print")}</SelectLabel>
                  {CROP_MODES.filter((mode) => mode.category === "Print").map(
                    (mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Ratio Inputs */}
          {showCustomRatio && (
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {t("ui.customRatioInput")}
              </label>

              <div className="flex items-center gap-2">
                <div>
                  <Input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    onBlur={handleCustomRatioChange}
                    className="w-20"
                    placeholder="1"
                    min="1"
                    step="1"
                  />
                </div>
                <div className="text-muted-foreground">:</div>
                <div>
                  <Input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    onBlur={handleCustomRatioChange}
                    className="w-20"
                    placeholder="1"
                    min="1"
                    step="1"
                  />
                </div>
                <Button variant="outline" onClick={handleCustomRatioChange}>
                  {t("ui.apply")}
                </Button>
              </div>
            </div>
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
                <h2>
                  {(() => {
                    const currentMode = CROP_MODES.find(
                      (m) => m.value === cropMode
                    );
                    return currentMode?.label || t("messages.customRatio");
                  })()}
                </h2>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {(() => {
                  const currentMode = CROP_MODES.find(
                    (m) => m.value === cropMode
                  );
                  return (
                    currentMode?.description || t("messages.setCustomRatio")
                  );
                })()}
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
                    ? t("upload.processing")
                    : image
                      ? t("upload.buttonText")
                      : t("upload.buttonText")}
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
                  <span className="hidden lg:block">
                    {t("controls.reset.resetAll")}
                  </span>
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
                    {t("ui.fileInfo.fileName")}
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
                    {t("ui.fileInfo.fileSize")}
                  </div>
                  <div className="text-sm font-medium">
                    {formatFileSize(fileSize)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">
                    {t("ui.fileInfo.dimensions")}
                  </div>
                  <div className="text-sm font-medium">
                    {imageInfo.width} × {imageInfo.height}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">
                    {t("ui.fileInfo.aspectRatio")}
                  </div>
                  <div className="text-sm font-medium">
                    {imageInfo.aspectRatio}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">
                    {t("ui.fileInfo.fileType")}
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
                    {t("ui.cropArea")}
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
                        console.log(t("messages.cropperReady"));
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
                        {t("ui.toolsAndControls")}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex justify-between gap-2">
                            {/* Mode Controls */}
                            <div>
                              <Label className="text-xs text-muted-foreground mb-2 block">
                                {t("ui.mode")}
                              </Label>
                              <ToggleGroup
                                size="sm"
                                variant="outline"
                                type="single"
                                value={dragMode}
                                onValueChange={(value) =>
                                  value &&
                                  handleDragModeChange(value as "crop" | "move")
                                }
                                className="justify-start"
                              >
                                <ToggleGroupItem
                                  value="crop"
                                  aria-label={t("ui.cropMode")}
                                  className="flex items-center"
                                >
                                  <Crop className="w-4 h-4" />
                                  <span className="text-xs">
                                    {t("ui.crop")}
                                  </span>
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                  value="move"
                                  aria-label={t("ui.moveMode")}
                                  className="flex items-center"
                                >
                                  <Move className="w-4 h-4" />
                                  <span className="text-xs">
                                    {t("ui.move")}
                                  </span>
                                </ToggleGroupItem>
                              </ToggleGroup>
                            </div>
                            {/* Move Controls */}
                            <div>
                              <Label className="text-xs text-muted-foreground mb-2 block">
                                {t("ui.moveImage")}
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

                          {/* Zoom & Actions */}
                          <div>
                            <Label className="text-xs text-muted-foreground mb-2 block">
                              {t("ui.zoomAndActions")}
                            </Label>
                            <div className="grid grid-cols-4 gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleZoomIn}
                              >
                                <ZoomIn className="w-3 h-3 mr-1" />
                                {t("ui.zoomIn")}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleZoomOut}
                              >
                                <ZoomOut className="w-3 h-3 mr-1" />
                                {t("ui.zoomOut")}
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
                                {t("ui.reset")}
                              </Button>
                            </div>
                          </div>

                          {/* Transform Controls */}
                          <div>
                            <Label className="text-xs text-muted-foreground mb-2 block">
                              {t("ui.transform")}
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
                                <FlipHorizontal className="w-3 h-3 mr-1" />H
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

                          {/* Quality Control */}
                          <div>
                            <Label className="text-xs text-muted-foreground mb-2 block">
                              {t("ui.exportQuality")}
                            </Label>
                            <div className="space-y-2">
                              <Select
                                value={imageQuality.toString()}
                                onValueChange={(value) =>
                                  setImageQuality(parseFloat(value))
                                }
                              >
                                <SelectTrigger className="w-full h-8 text-xs">
                                  <SelectValue
                                    placeholder={t("ui.selectQuality")}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">
                                    {t("ui.bestQuality")}
                                  </SelectItem>
                                  <SelectItem value="0.95">
                                    {t("ui.highQuality")}
                                  </SelectItem>
                                  <SelectItem value="0.9">
                                    {t("ui.goodQuality")}
                                  </SelectItem>
                                  <SelectItem value="0.8">
                                    {t("ui.mediumQuality")}
                                  </SelectItem>
                                  <SelectItem value="0.7">
                                    {t("ui.lowQuality")}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <div className="text-xs text-muted-foreground text-center">
                                {t("ui.export", {
                                  quality: Math.round(imageQuality * 100),
                                })}
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
                    {t("ui.livePreview")}
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
                          <p className="text-sm">{t("ui.realTimePreview")}</p>
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
                        {t("ui.cropParameters")}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-muted-foreground">
                                {t("ui.cropData.x")}
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
                                {t("ui.cropData.y")}
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
                                {t("ui.cropData.width")}
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
                                {t("ui.cropData.height")}
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
                                {t("ui.cropData.rotate")}
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
                                {t("ui.cropData.scale")}
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
                      {t("ui.exportAndShare")}
                    </Label>
                    <div className="space-y-3">
                      {/* Format Selection */}
                      <Select
                        value={downloadFormat}
                        onValueChange={(value) => {
                          setDownloadFormat(value);
                          if (value === "avif") {
                            toast.info(
                              "AVIF 将使用服务端 Sharp 处理（高质量压缩）",
                              { duration: 4000 }
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="jpeg">JPEG</SelectItem>
                          <SelectItem value="webp">WebP</SelectItem>
                          <SelectItem value="avif">AVIF</SelectItem>
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
                          {t("ui.copyToClipboard")}
                        </Button>

                        {/* Quick Download */}
                        <Button
                          onClick={handleDownload}
                          size="sm"
                          className="w-full"
                          disabled={!livePreview}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {t("ui.quickDownload")}
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
                          {t("ui.bestQualityDownload")}
                        </Button>
                      </div>

                      {/* Export Tips */}
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>
                          • <strong>{t("ui.exportTips.copy")}</strong>
                        </p>
                        <p>
                          • <strong>{t("ui.exportTips.quick")}</strong>
                        </p>
                        <p>
                          • <strong>{t("ui.exportTips.best")}</strong>
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
                {t("messages.noImageSelected")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("messages.uploadImageToStart")}
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                {t("messages.chooseImage")}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
