# 基于 API 的功能开关系统

## 设计理念
- **服务端控制**：环境变量只在服务端存在，不暴露给客户端
- **API 获取配置**：客户端通过 API 获取功能状态
- **安全性优先**：客户端无法直接访问环境变量

## 架构图
```
环境变量 (.env.local) 
    ↓
服务端配置 (src/config/feature.ts)
    ↓
API 端点 (/api/config)
    ↓
客户端 Hook (useFeatureConfig)
    ↓
功能守卫组件 (FeatureGuard)
```

## 环境变量配置

```bash
# .env.local (仅服务端可见)
FEATURE_AUTH_ENABLED=true
FEATURE_STRIPE_ENABLED=true
FEATURE_SOCIAL_AUTH_ENABLED=true
FEATURE_DOCS_ENABLED=true
FEATURE_BLOG_ENABLED=true
FEATURE_SUBMISSION_ENABLED=true
```

## 核心文件

### 1. 服务端配置 (`src/config/feature.ts`)
```typescript
export const featureConfig = {
  authEnabled: process.env.FEATURE_AUTH_ENABLED === "true",
  stripeEnabled: process.env.FEATURE_STRIPE_ENABLED === "true",
  // ...
} as const;
```

### 2. API 端点 (`src/app/api/config/route.ts`)
```typescript
export async function GET() {
  return NextResponse.json({
    features: {
      auth: featureConfig.authEnabled,
      stripe: featureConfig.stripeEnabled,
      // ...
    },
  }, {
    headers: {
      'Cache-Control': 'public, max-age=3600', // 缓存1小时
    },
  });
}
```

### 3. 客户端 Hook (`src/hooks/use-feature-config.ts`)
```typescript
export function useFeatureConfig() {
  const [config, setConfig] = useState<FeatureConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 通过 API 获取配置
    fetch("/api/config")
      .then(res => res.json())
      .then(data => setConfig(data.features));
  }, []);

  return { config, loading, error };
}
```

### 4. 功能守卫组件 (`src/components/common/feature-guard.tsx`)
```typescript
export function FeatureGuard({ children, feature, fallback }) {
  const { config, loading, error } = useFeatureConfig();
  
  if (loading) return null;
  if (error || !config?.[feature]) return fallback || null;
  
  return <>{children}</>;
}
```

## 使用方式

### 1. 通用功能守卫
```typescript
import { FeatureGuard } from "@/components/common/feature-guard";

export default function SomeComponent() {
  return (
    <FeatureGuard 
      feature="auth" 
      fallback={<div>认证功能未启用</div>}
      showLoading={true}
    >
      <UserComponent />
    </FeatureGuard>
  );
}
```

### 2. 预定义守卫组件
```typescript
import { AuthGuard, StripeGuard, BlogGuard } from "@/components/common/feature-guard";

export default function Layout() {
  return (
    <div>
      <AuthGuard fallback={<LoginPrompt />}>
        <UserNav />
      </AuthGuard>
      
      <StripeGuard>
        <PricingButton />
      </StripeGuard>
      
      <BlogGuard>
        <BlogSection />
      </BlogGuard>
    </div>
  );
}
```

### 3. 直接使用 Hook
```typescript
import { useFeatureConfig } from "@/hooks/use-feature-config";

export default function CustomComponent() {
  const { config, loading, error } = useFeatureConfig();
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;
  
  return (
    <div>
      {config?.auth && <AuthSection />}
      {config?.stripe && <PricingSection />}
      {config?.blog && <BlogSection />}
    </div>
  );
}
```

### 4. 页面级控制（服务端）
```typescript
// src/app/[locale]/(main)/pricing/page.tsx
import { featureConfig } from "@/config/feature";
import { notFound } from "next/navigation";

export default function PricingPage() {
  // 服务端直接检查，返回 404
  if (!featureConfig.stripeEnabled) {
    notFound();
  }
  
  return <PricingSection />;
}
```

## 安全性优势

1. **环境变量隔离**：客户端无法直接访问环境变量
2. **API 控制**：所有功能状态通过 API 获取，可以添加权限控制
3. **缓存策略**：API 响应可以缓存，减少服务器负载
4. **错误处理**：API 失败时有降级策略

## 性能优化

1. **HTTP 缓存**：API 响应设置 1 小时缓存
2. **React 缓存**：Hook 中的状态会被 React 缓存
3. **条件渲染**：功能未启用时不渲染相关组件
4. **懒加载**：可以结合动态导入进一步优化

## 扩展功能

### 1. 用户级功能控制
```typescript
// 可以扩展 API 支持用户级功能控制
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  const userFeatures = await getUserFeatures(userId);
  
  return NextResponse.json({
    features: {
      ...globalFeatures,
      ...userFeatures, // 用户特定功能
    },
  });
}
```

### 2. A/B 测试支持
```typescript
// 可以添加 A/B 测试逻辑
export function useFeatureConfig() {
  // 获取用户的实验组信息
  const experimentGroup = useExperimentGroup();
  
  // 根据实验组调整功能配置
  const adjustedConfig = adjustForExperiment(config, experimentGroup);
  
  return { config: adjustedConfig, loading, error };
}
```

## 部署注意事项

1. **环境变量同步**：确保所有环境的环境变量正确设置
2. **API 可用性**：确保 `/api/config` 端点在所有环境都可访问
3. **缓存策略**：生产环境可以设置更长的缓存时间
4. **监控**：监控 API 调用频率和错误率 