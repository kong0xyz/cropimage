"use client";

import { ReactNode } from "react";
import { useFeatureConfig, FeatureConfig } from "@/hooks/use-feature-config";

/**
 * 通用功能守卫组件
 * 根据功能配置条件性渲染子组件
 */
export function FeatureGuard({ 
  children, 
  fallback,
  feature,
  showLoading = false
}: { 
  children: ReactNode; 
  fallback?: ReactNode;
  feature: keyof FeatureConfig;
  showLoading?: boolean;
}) {
  const { config, loading, error } = useFeatureConfig();

  // 加载中状态
  if (loading) {
    return showLoading ? (
      <div className="animate-pulse">Loading...</div>
    ) : null;
  }

  // 错误状态或功能未启用
  if (error || !config?.[feature]) {
    return fallback || null;
  }

  return <>{children}</>;
}

// 预定义的功能守卫组件
export const AuthGuard = ({ children, fallback, showLoading }: {
  children: ReactNode;
  fallback?: ReactNode;
  showLoading?: boolean;
}) => (
  <FeatureGuard feature="auth" fallback={fallback} showLoading={showLoading}>
    {children}
  </FeatureGuard>
);

export const StripeGuard = ({ children, fallback, showLoading }: {
  children: ReactNode;
  fallback?: ReactNode;
  showLoading?: boolean;
}) => (
  <FeatureGuard feature="stripe" fallback={fallback} showLoading={showLoading}>
    {children}
  </FeatureGuard>
);

export const BlogGuard = ({ children, fallback, showLoading }: {
  children: ReactNode;
  fallback?: ReactNode;
  showLoading?: boolean;
}) => (
  <FeatureGuard feature="blog" fallback={fallback} showLoading={showLoading}>
    {children}
  </FeatureGuard>
); 