# 社交登录提供商配置指南

## 环境变量配置

在您的 `.env.local` 文件中添加以下环境变量：

```bash
# Better Auth 基础配置
BETTER_AUTH_SECRET=your-super-secret-key-here
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# 数据库配置
DATABASE_URL=your-supabase-postgresql-url

# GitHub OAuth
BETTER_AUTH_GITHUB_CLIENT_ID=your-github-client-id
BETTER_AUTH_GITHUB_CLIENT_SECRET=your-github-client-secret

# Google OAuth
BETTER_AUTH_GOOGLE_CLIENT_ID=your-google-client-id
BETTER_AUTH_GOOGLE_CLIENT_SECRET=your-google-client-secret

# Microsoft OAuth
BETTER_AUTH_MICROSOFT_CLIENT_ID=your-microsoft-client-id
BETTER_AUTH_MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret

# Facebook OAuth
BETTER_AUTH_FACEBOOK_CLIENT_ID=your-facebook-app-id
BETTER_AUTH_FACEBOOK_CLIENT_SECRET=your-facebook-app-secret

# Discord OAuth
BETTER_AUTH_DISCORD_CLIENT_ID=your-discord-client-id
BETTER_AUTH_DISCORD_CLIENT_SECRET=your-discord-client-secret
```

## OAuth 应用配置

### 1. GitHub OAuth App

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: 您的应用名称
   - **Homepage URL**: `http://localhost:3000` (开发环境)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. 创建后获取 Client ID 和 Client Secret

### 2. Google OAuth 2.0

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建或选择项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID：
   - **应用类型**: Web 应用
   - **授权重定向 URI**: `http://localhost:3000/api/auth/callback/google`
5. 获取客户端 ID 和客户端密钥

### 3. Microsoft Azure AD

1. 访问 [Azure Portal](https://portal.azure.com/)
2. 进入 "Azure Active Directory" > "App registrations"
3. 点击 "New registration"
4. 填写应用信息：
   - **Name**: 您的应用名称
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/microsoft`
5. 在 "Certificates & secrets" 中创建新的客户端密钥
6. 获取 Application (client) ID 和客户端密钥

### 4. Facebook App

1. 访问 [Facebook Developers](https://developers.facebook.com/)
2. 创建新应用
3. 添加 "Facebook Login" 产品
4. 在 Facebook Login 设置中：
   - **Valid OAuth Redirect URIs**: `http://localhost:3000/api/auth/callback/facebook`
5. 在应用设置中获取 App ID 和 App Secret

### 5. Discord Application

1. 访问 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 "New Application"
3. 填写应用名称
4. 在 "OAuth2" 设置中：
   - **Redirects**: `http://localhost:3000/api/auth/callback/discord`
   - **Scopes**: 选择 `identify` 和 `email`
5. 获取 Client ID 和 Client Secret

## 生产环境配置

在生产环境中，请将回调 URL 更改为您的实际域名：

```
https://yourdomain.com/api/auth/callback/{provider}
```

## 支持的社交登录功能

- ✅ **GitHub**: 获取用户基本信息和邮箱
- ✅ **Google**: 获取用户资料和邮箱
- ✅ **Microsoft**: 获取 Azure AD 用户信息
- ✅ **Facebook**: 获取用户基本资料
- ✅ **Discord**: 获取用户信息和邮箱

## 注意事项

1. **开发环境**: 确保在各个平台的开发者控制台中正确设置回调 URL
2. **生产环境**: 更新所有平台的回调 URL 为生产域名
3. **权限范围**: 某些平台可能需要额外的权限来获取邮箱信息
4. **验证状态**: 有些平台要求应用通过验证才能被所有用户使用

## 测试配置

启动开发服务器后，访问以下地址测试社交登录：

- 登录页面: `http://localhost:3000/sign-in`
- 注册页面: `http://localhost:3000/sign-up`
- 个人资料: `http://localhost:3000/dashboard/profile`（账户关联功能） 