# Better Auth v1.2.9 集成设置指南

本指南将帮助您完成 Better Auth v1.2.9 在 Next.js 项目中的集成和配置。

## 1. 安装依赖

首先安装必需的依赖包：

```bash
pnpm install better-auth@^1.2.9
```

**注意：** 最新版本的 Better Auth 已经内置了 Drizzle 适配器，无需单独安装 `@better-auth/drizzle`。

## 2. 环境变量配置

在项目根目录创建 `.env.local` 文件，添加以下环境变量：

```bash
# 数据库配置 (Supabase)
DATABASE_URL="postgresql://user:password@db.your-project.supabase.co:5432/postgres"

# Better Auth 配置
AUTH_SECRET="your-super-secret-auth-secret-key-here-min-32-chars"
AUTH_COOKIE_DOMAIN="yourdomain.com"  # 生产环境域名，开发环境使用 localhost

# 站点配置
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"  # 开发环境: http://localhost:3000

# GitHub OAuth 配置
AUTH_GITHUB_CLIENT_ID="your-github-client-id"
AUTH_GITHUB_CLIENT_SECRET="your-github-client-secret"

# Google OAuth 配置
AUTH_GOOGLE_CLIENT_ID="your-google-client-id"
AUTH_GOOGLE_CLIENT_SECRET="your-google-client-secret"

# 邮件配置（用于邮箱验证和密码重置）
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"
```

## 3. 数据库设置

### 3.1 运行数据库迁移

执行以下命令来创建必要的数据库表：

```bash
# 生成数据库迁移
pnpm drizzle-kit generate

# 运行迁移（或手动执行 drizzle/0001_better_auth_tables.sql）
pnpm drizzle-kit migrate
```

### 3.2 或者手动执行 SQL

您也可以直接在 Supabase 控制台中执行 `drizzle/0001_better_auth_tables.sql` 文件中的 SQL 语句。

## 4. OAuth 提供商配置

### 4.1 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - Application name: `Your App Name`
   - Homepage URL: `https://yourdomain.com`
   - Authorization callback URL: `https://yourdomain.com/api/auth/callback/github`
4. 创建应用并获取 Client ID 和 Client Secret

### 4.2 Google OAuth 应用

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID：
   - 应用类型：Web 应用
   - 授权重定向 URI: `https://yourdomain.com/api/auth/callback/google`
5. 获取客户端 ID 和密钥

## 5. 项目结构

集成完成后，项目将包含以下新文件：

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts              # Auth API 路由
│   └── [locale]/
│       ├── (auth)/
│       │   ├── sign-in/
│       │   │   └── page.tsx              # 登录页面
│       │   └── sign-up/
│       │       └── page.tsx              # 注册页面
│       └── (main)/
│           └── dashboard/
│               └── page.tsx              # 仪表板页面
├── components/
│   └── auth/
│       ├── sign-in-form.tsx              # 登录表单组件
│       ├── sign-up-form.tsx              # 注册表单组件
│       └── user-nav.tsx                  # 用户导航组件
├── lib/
│   ├── auth.ts                          # Auth 配置（服务端）
│   └── auth-client.ts                   # Auth 客户端配置
└── db/
    └── schema.ts                        # 数据库表结构
```

## 6. 使用方法

### 6.1 在组件中使用认证

```tsx
'use client';

import { useSession, signIn, signOut } from '@/lib/auth-client';

export function AuthExample() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>加载中...</div>;

  if (!session) {
    return (
      <button onClick={() => signIn.email({ 
        email: 'user@example.com', 
        password: 'password' 
      }, {
        onSuccess: () => {
          console.log('登录成功');
        },
        onError: (ctx) => {
          console.error('登录失败:', ctx.error.message);
        },
      })}>
        登录
      </button>
    );
  }

  return (
    <div>
      <p>欢迎, {session.user.name}!</p>
      <button onClick={() => signOut({
        fetchOptions: {
          onSuccess: () => {
            console.log('退出成功');
          },
        },
      })}>退出登录</button>
    </div>
  );
}
```

### 6.2 保护路由

中间件已配置为保护以下路由：
- `/dashboard/*`
- `/settings/*`
- `/billing/*`
- `/profile/*`

未认证用户访问这些路由将被重定向到登录页面。

### 6.3 服务端获取用户信息

```tsx
import { auth } from '@/lib/auth';

export default async function ServerComponent() {
  const session = await auth.api.getSession({
    headers: headers()
  });

  if (!session) {
    return <div>请先登录</div>;
  }

  return <div>用户: {session.user.name}</div>;
}
```

## 7. 功能特性

✅ **已集成功能：**
- 邮箱密码认证
- GitHub/Google 社交登录
- 会话管理和状态同步
- 路由保护中间件
- 账户关联（Account Linking）
- 密码修改和重置
- 用户信息更新
- 双因素认证（2FA）
- 组织/多租户支持
- 邮箱验证
- 响应式回调处理

✅ **UI 组件：**
- 登录/注册表单（支持回调）
- 用户导航菜单
- 仪表板页面
- 个人资料管理页面
- 账户关联管理
- 现代化设计（shadcn/ui + Tailwind CSS v4）
- 加载状态和错误处理

✅ **Better Auth v1.2.9 新特性：**
- 改进的 TypeScript 类型支持
- 更好的错误处理机制
- 内置 Drizzle 适配器
- 统一的客户端 API
- 增强的回调系统

## 8. 自定义配置

### 8.1 修改认证配置

编辑 `src/lib/auth.ts` 文件来自定义：
- 会话过期时间
- 支持的登录方式
- 用户字段
- 安全设置

### 8.2 添加新的 OAuth 提供商

在 `auth.ts` 中的 `socialProviders` 对象中添加新的提供商配置。

### 8.3 自定义邮件模板

修改 `sendResetPassword` 和 `sendVerificationEmail` 函数来自定义邮件内容。

## 9. 开发和调试

### 9.1 启动开发服务器

```bash
pnpm dev
```

### 9.2 测试认证流程

1. 访问 `http://localhost:3000/sign-up` 注册新账户
2. 访问 `http://localhost:3000/sign-in` 登录
3. 访问 `http://localhost:3000/dashboard` 查看受保护的页面

### 9.3 数据库查看

使用 Drizzle Studio 查看数据库：

```bash
pnpm drizzle-kit studio
```

## 10. 部署注意事项

### 10.1 环境变量

确保在生产环境中设置所有必需的环境变量。

### 10.2 HTTPS

Better Auth 在生产环境中需要 HTTPS。确保您的域名配置了 SSL 证书。

### 10.3 数据库连接

确保生产数据库的连接字符串正确，并且有足够的连接池大小。

## 11. 故障排除

### 11.1 常见问题

**Q: 社交登录失败**
A: 检查 OAuth 应用的回调 URL 是否正确配置

**Q: 邮箱验证不工作**
A: 检查邮件配置和 SMTP 设置

**Q: 会话丢失**
A: 检查 `AUTH_SECRET` 是否设置正确

### 11.2 日志调试

开启开发模式下的详细日志：

```bash
DEBUG=better-auth:* pnpm dev
```

## 12. 安全建议

1. 使用强随机字符串作为 `AUTH_SECRET`
2. 定期轮换 OAuth 应用密钥
3. 启用 2FA 以增强安全性
4. 配置适当的 CORS 设置
5. 监控异常登录活动

## 13. v1.2.9 版本更新说明

### 13.1 重要变化

1. **内置适配器**: Drizzle 适配器现在内置在主包中，导入路径为 `better-auth/adapters/drizzle`
2. **改进的客户端 API**: 所有客户端方法现在支持回调参数，提供更好的错误处理
3. **统一的状态管理**: `useSession` hook 返回 `isPending` 而不是 `isLoading`
4. **增强的类型安全**: 更好的 TypeScript 类型推断和错误提示

### 13.2 迁移指南

如果您从较早版本升级，请注意以下变化：

```bash
# 移除旧的适配器包
pnpm remove @better-auth/drizzle

# 更新到最新版本
pnpm add better-auth@^1.2.9
```

```typescript
// 旧的导入方式
import { drizzleAdapter } from "@better-auth/drizzle";

// 新的导入方式
import { drizzleAdapter } from "better-auth/adapters/drizzle";
```

```typescript
// 旧的 hook 返回值
const { data: session, isLoading } = useSession();

// 新的 hook 返回值
const { data: session, isPending } = useSession();
```

### 13.3 新功能亮点

- **自动会话刷新**: 会话现在可以自动刷新，无需手动管理
- **改进的错误处理**: 更详细的错误信息和类型安全的错误对象
- **账户关联**: 内置支持多账户关联，包括强制关联和手动关联
- **删除账户**: 支持多种删除账户的方式，包括密码验证和邮件验证

---

有任何问题，请参考 [Better Auth 官方文档](https://www.better-auth.com/) 或 [LLM 文档](https://www.better-auth.com/llms.txt)。 