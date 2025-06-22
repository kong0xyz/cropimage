"use client";

import { useState, useEffect } from "react";

export interface FeatureConfig {
  auth: boolean;
  stripe: boolean;
  socialAuth: boolean;
  docs: boolean;
  blog: boolean;
  submission: boolean;
}

/**
 * 客户端功能配置 Hook
 * 通过 API 获取服务端配置，避免暴露环境变量
 */
export function useFeatureConfig() {
  const [config, setConfig] = useState<FeatureConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConfig(data.features);
      } catch (err) {
        console.error("Failed to fetch feature config:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        // 设置默认值，所有功能都禁用
        setConfig({
          auth: false,
          stripe: false,
          socialAuth: false,
          docs: false,
          blog: false,
          submission: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
} 