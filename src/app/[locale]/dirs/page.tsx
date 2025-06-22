"use client";

import { useFeatureConfig } from "@/hooks/use-feature-config";

export default function DirsPage() {
  const { config, loading, error } = useFeatureConfig();

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">功能配置状态</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">❌ 配置加载失败: {error}</p>
          <p className="text-sm text-red-500 mt-2">
            请检查 /api/config 端点是否正常工作
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">功能配置状态</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 认证功能 */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xl ${config?.auth ? '✅' : '❌'}`}>
              {config?.auth ? '✅' : '❌'}
            </span>
            <h3 className="font-semibold">认证功能</h3>
          </div>
          <p className="text-sm text-gray-600">
            用户注册、登录、社交登录等功能
          </p>
          <p className="text-xs mt-1">
            状态: {config?.auth ? '已启用' : '未启用'}
          </p>
        </div>

        {/* 支付功能 */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xl ${config?.stripe ? '✅' : '❌'}`}>
              {config?.stripe ? '✅' : '❌'}
            </span>
            <h3 className="font-semibold">支付功能</h3>
          </div>
          <p className="text-sm text-gray-600">
            Stripe 订阅、账单管理等功能
          </p>
          <p className="text-xs mt-1">
            状态: {config?.stripe ? '已启用' : '未启用'}
          </p>
        </div>

        {/* 社交登录 */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xl ${config?.socialAuth ? '✅' : '❌'}`}>
              {config?.socialAuth ? '✅' : '❌'}
            </span>
            <h3 className="font-semibold">社交登录</h3>
          </div>
          <p className="text-sm text-gray-600">
            GitHub、Google、Discord 等第三方登录
          </p>
          <p className="text-xs mt-1">
            状态: {config?.socialAuth ? '已启用' : '未启用'}
          </p>
        </div>

        {/* 文档功能 */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xl ${config?.docs ? '✅' : '❌'}`}>
              {config?.docs ? '✅' : '❌'}
            </span>
            <h3 className="font-semibold">文档功能</h3>
          </div>
          <p className="text-sm text-gray-600">
            产品文档、API 文档等内容
          </p>
          <p className="text-xs mt-1">
            状态: {config?.docs ? '已启用' : '未启用'}
          </p>
        </div>

        {/* 博客功能 */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xl ${config?.blog ? '✅' : '❌'}`}>
              {config?.blog ? '✅' : '❌'}
            </span>
            <h3 className="font-semibold">博客功能</h3>
          </div>
          <p className="text-sm text-gray-600">
            博客文章、分类、标签等功能
          </p>
          <p className="text-xs mt-1">
            状态: {config?.blog ? '已启用' : '未启用'}
          </p>
        </div>

        {/* 提交功能 */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xl ${config?.submission ? '✅' : '❌'}`}>
              {config?.submission ? '✅' : '❌'}
            </span>
            <h3 className="font-semibold">提交功能</h3>
          </div>
          <p className="text-sm text-gray-600">
            用户内容提交、审核等功能
          </p>
          <p className="text-xs mt-1">
            状态: {config?.submission ? '已启用' : '未启用'}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">📝 使用说明</h3>
        <ul className="text-sm space-y-1">
          <li>• 功能配置通过 API 获取，环境变量不会暴露给客户端</li>
          <li>• 未启用的功能组件不会渲染，提高安全性和性能</li>
          <li>• 配置更改后需要重启服务器才能生效</li>
          <li>• 支付功能依赖认证功能，认证未启用时支付也会被禁用</li>
        </ul>
      </div>

      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">🔧 调试信息</h3>
        <pre className="text-xs bg-white p-2 rounded border overflow-auto">
          {JSON.stringify({ config, loading, error }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
