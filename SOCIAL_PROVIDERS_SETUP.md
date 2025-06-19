# 社交登录提供商配置指南

本文档将指导您如何配置 better-auth 的社交登录提供商（GitHub、Google、Microsoft、Discord）。

## 环境变量设置

首先，在您的 `.env.local` 文件中添加以下环境变量：

```bash
# GitHub OAuth 应用
BETTER_AUTH_GITHUB_CLIENT_ID=your_github_client_id
BETTER_AUTH_GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth 应用
BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_GOOGLE_CLIENT_SECRET=your_google_client_secret

# Microsoft OAuth 应用
BETTER_AUTH_MICROSOFT_CLIENT_ID=your_microsoft_client_id
BETTER_AUTH_MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

# Discord OAuth 应用
BETTER_AUTH_DISCORD_CLIENT_ID=your_discord_client_id
BETTER_AUTH_DISCORD_CLIENT_SECRET=your_discord_client_secret
```

## 1. GitHub OAuth 配置

### 创建 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: 您的应用名称
   - **Homepage URL**: https://yourdomain.com
   - **Authorization callback URL**: https://yourdomain.com/api/auth/callback/github

### 获取凭据

- **Client ID**: 在应用页面直接可见
- **Client Secret**: 点击 "Generate a new client secret" 生成

## 2. Google OAuth 配置

### 创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API

### 配置 OAuth 同意屏幕

1. 在侧边栏选择 "APIs & Services" > "OAuth consent screen"
2. 选择 "External" 用户类型
3. 填写必要信息（应用名称、用户支持邮箱等）

### 创建 OAuth 凭据

1. 在侧边栏选择 "APIs & Services" > "Credentials"
2. 点击 "Create Credentials" > "OAuth client ID"
3. 选择 "Web application"
4. 添加授权的重定向 URI：
   - https://yourdomain.com/api/auth/callback/google

## 3. Microsoft OAuth 配置

### 在 Azure 门户创建应用

1. 访问 [Azure Portal](https://portal.azure.com/)
2. 搜索并选择 "Azure Active Directory"
3. 在左侧菜单选择 "App registrations"
4. 点击 "New registration"

### 配置应用

1. 填写应用信息：
   - **Name**: 您的应用名称
   - **Supported account types**: 选择适合的选项
   - **Redirect URI**: https://yourdomain.com/api/auth/callback/microsoft

### 获取凭据

- **Application (client) ID**: 在应用概述页面可见
- **Client Secret**: 在 "Certificates & secrets" 部分创建

## 4. Discord OAuth 配置

### 创建 Discord 应用

1. 访问 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 "New Application"
3. 输入应用名称并创建

### 配置 OAuth2

1. 在左侧菜单选择 "OAuth2"
2. 在 "Redirects" 部分添加：
   - https://yourdomain.com/api/auth/callback/discord

### 获取凭据

- **Client ID**: 在 "General Information" 页面可见
- **Client Secret**: 在 "OAuth2" 页面生成

## 开发环境配置

对于本地开发，请将回调 URL 设置为：

```bash
# 本地开发回调 URL
http://localhost:3000/api/auth/callback/github
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/microsoft
http://localhost:3000/api/auth/callback/discord
```

## 测试配置

配置完成后，您可以：

1. 启动开发服务器：`pnpm dev`
2. 访问登录页面：http://localhost:3000/sign-in
3. 点击相应的社交登录按钮测试集成

## 故障排除

### 常见错误

1. **"redirect_uri_mismatch"**
   - 检查回调 URL 是否与各平台配置一致
   - 确保 URL 完全匹配（包括协议、域名、端口）

2. **"invalid_client"**
   - 检查 Client ID 和 Client Secret 是否正确
   - 确保环境变量名称正确

3. **"access_denied"**
   - 检查 OAuth 应用是否已启用
   - 确认用户授权流程

### 调试提示

- 在浏览器开发者工具中检查网络请求
- 查看服务器日志获取详细错误信息
- 确认各平台的 OAuth 应用状态

## 安全注意事项

1. **保护密钥**：
   - 永远不要在客户端代码中暴露 Client Secret
   - 使用环境变量存储敏感信息

2. **回调 URL 验证**：
   - 只添加必要的回调 URL
   - 避免使用通配符或过于宽泛的配置

3. **权限范围**：
   - 只请求应用所需的最小权限
   - 定期审查和更新权限范围

## 更多资源

- [better-auth 官方文档](https://www.better-auth.com/)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Google OAuth 文档](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft OAuth 文档](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
- [Discord OAuth 文档](https://discord.com/developers/docs/topics/oauth2) 