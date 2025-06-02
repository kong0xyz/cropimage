#!/bin/bash

echo "🚀 开始升级 shadcn/ui..."

# 检查更新
echo "📋 检查可用更新..."
npx shadcn@latest diff

# 更新核心依赖
echo "📦 更新核心依赖..."
pnpm update class-variance-authority clsx tailwind-merge lucide-react

# 更新 Radix UI 组件
echo "🔧 更新 Radix UI 组件..."
pnpm update $(pnpm list | grep @radix-ui | awk '{print $1}' | tr '\n' ' ')

# 更新其他相关包
echo "🔄 更新其他相关包..."
pnpm update cmdk vaul sonner

echo "✅ 升级完成！请运行测试确保一切正常。"
echo "💡 提示：运行 'pnpm dev' 启动开发服务器进行测试" 