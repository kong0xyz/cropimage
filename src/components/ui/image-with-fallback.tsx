"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
  fallbackClassName?: string;
}

// 定义多级备用图片
const DEFAULT_FALLBACKS = [
  // 通用的技术/编程图片
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&w=800&fit=max&q=80",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&w=800&fit=max&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&w=800&fit=max&q=80",
  // 简单的几何图案 - 内联SVG，保证可用性
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjIyNSIgcj0iNTAiIGZpbGw9IiM2Qjc1ODAiLz4KPHRleHQgeD0iMzUwIiB5PSIyODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzZCNzU4MCI+QmxvZyBJbWFnZTwvdGV4dD4KICA8L3N2Zz4="
];

export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  fallbackSrc,
  fallbackClassName,
  ...props
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackIndex, setFallbackIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // 构建完整的备用图片列表
  const allFallbacks = [
    ...(fallbackSrc ? [fallbackSrc] : []),
    ...DEFAULT_FALLBACKS
  ];

  // 重置状态当src改变时
  useEffect(() => {
    setCurrentSrc(src);
    setFallbackIndex(-1);
    setLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    console.warn(`图片加载失败: ${currentSrc}`);
    setLoading(false);
    
    const nextIndex = fallbackIndex + 1;
    
    if (nextIndex < allFallbacks.length) {
      // 尝试下一个备用图片
      console.info(`尝试备用图片 ${nextIndex + 1}: ${allFallbacks[nextIndex]}`);
      setFallbackIndex(nextIndex);
      setCurrentSrc(allFallbacks[nextIndex]);
      setLoading(true);
    } else {
      // 所有备用图片都失败了
      console.error('所有图片都加载失败，显示占位符');
      setHasError(true);
    }
  };

  const handleLoad = () => {
    console.info(`图片加载成功: ${currentSrc}`);
    setLoading(false);
    setHasError(false);
  };

  // 显示最终错误占位符
  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-muted-foreground border-2 border-dashed border-gray-300 dark:border-gray-600",
          fill ? "absolute inset-0" : "",
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="relative">
            <ImageIcon className="w-12 h-12 opacity-40" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium opacity-60">图片无法加载</p>
            <p className="text-xs opacity-40 max-w-32 truncate">{alt}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 animate-pulse",
            className
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="w-8 h-8 opacity-30 animate-pulse" />
            <div className="w-16 h-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            <span className="text-xs opacity-50">加载中...</span>
          </div>
        </div>
      )}
      <Image
        src={currentSrc}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={cn(
          className, 
          fallbackIndex >= 0 ? fallbackClassName : "",
          loading ? "opacity-0" : "opacity-100",
          "transition-opacity duration-500"
        )}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
} 