# Stripe 集成设置指南

## 环境变量配置

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key

# Stripe Price IDs
STRIPE_BASIC_PRICE_ID=price_basic_monthly
STRIPE_BASIC_ANNUAL_PRICE_ID=price_basic_yearly
STRIPE_PRO_PRICE_ID=price_pro_monthly
STRIPE_PRO_ANNUAL_PRICE_ID=price_pro_yearly
```

## Webhook 设置

- URL: `https://yourdomain.com/api/auth/stripe/webhook`
- 事件: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## 订阅计划

- **基础版**: ¥99/月 (¥79/月年付)
- **专业版**: ¥199/月 (¥159/月年付) + 14天试用

## 主要页面

- 定价页面: `/pricing`
- 账单管理: `/dashboard/billing`

## 功能特性

- ✅ 自动创建 Stripe 客户
- ✅ 订阅计划管理（基础版/专业版）
- ✅ Stripe Checkout 支付流程
- ✅ Stripe Customer Portal 管理
- ✅ Webhook 事件处理
- ✅ 试用期支持
- ✅ 年付折扣

## Stripe Dashboard 设置

### 1. 创建产品和价格

在 Stripe Dashboard 中创建以下产品：

**基础版产品**
- 产品名称：基础版
- 月付价格：¥99/月
- 年付价格：¥79/月 (20% 折扣)

**专业版产品**
- 产品名称：专业版
- 月付价格：¥199/月
- 年付价格：¥159/月 (20% 折扣)
- 14天免费试用

### 2. 配置 Webhook

创建 Webhook 端点：
- URL: `https://yourdomain.com/api/auth/stripe/webhook`
- 事件选择：
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `customer.subscription.created`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`

### 3. 获取密钥

从 Stripe Dashboard 获取：
- 可发布密钥 (Publishable Key)
- 密钥 (Secret Key)
- Webhook 签名密钥 (Webhook Secret)

## 订阅计划配置

当前支持的订阅计划：

### 免费计划
- 100 次 AI 生成/月
- 3 个项目
- 1GB 存储空间

### 基础版 (¥99/月, ¥79/月年付)
- 1000 次 AI 生成/月
- 5 个项目
- 10GB 存储空间
- 基础分析功能
- 48小时客服响应

### 专业版 (¥199/月, ¥159/月年付)
- 无限制 AI 生成
- 50 个项目
- 100GB 存储空间
- 高级分析功能
- 24小时客服响应
- 14天免费试用
- API 访问

## 页面和组件

### 定价页面
- 路径：`/pricing`
- 组件：`PricingSection`
- 功能：显示订阅计划，支持月付/年付切换

### 账单管理页面
- 路径：`/dashboard/billing`
- 组件：`SubscriptionManager`
- 功能：查看当前订阅，管理账单

### 订阅卡片组件
- 组件：`SubscriptionCard`
- 功能：订阅计划展示和购买

## API 端点

所有 Stripe 相关的 API 端点都由 Better Auth 自动处理：

- `POST /api/auth/stripe/webhook` - Webhook 处理
- `POST /api/auth/subscription/upgrade` - 创建订阅
- `GET /api/auth/subscription/list` - 获取订阅列表
- `POST /api/auth/subscription/cancel` - 取消订阅
- `POST /api/auth/subscription/restore` - 恢复订阅

## 使用方法

### 1. 订阅升级

```typescript
import { subscription } from "@/lib/auth-client";

await subscription.upgrade({
  plan: "pro",
  annual: true,
  successUrl: "/dashboard?success=subscription",
  cancelUrl: "/pricing",
});
```

### 2. 获取订阅列表

```typescript
const { data: subscriptions } = await subscription.list();
const activeSubscription = subscriptions?.find(
  sub => sub.status === "active" || sub.status === "trialing"
);
```

### 3. 管理订阅 (跳转到 Stripe Portal)

```typescript
const { data } = await subscription.cancel({
  returnUrl: "/dashboard/billing",
});
if (data?.url) {
  window.location.href = data.url;
}
```

## 测试

### 测试卡号
- 成功付款：`4242 4242 4242 4242`
- 需要验证：`4000 0025 0000 3155`
- 付款失败：`4000 0000 0000 9995`

### 本地测试 Webhook

使用 Stripe CLI 转发 webhook 到本地：

```bash
stripe listen --forward-to localhost:3000/api/auth/stripe/webhook
```

## 注意事项

1. **安全性**：确保 Webhook 签名验证正确配置
2. **错误处理**：订阅失败时提供清晰的错误信息
3. **用户体验**：支付过程中显示加载状态
4. **数据同步**：确保 Stripe 和本地数据库数据一致
5. **测试环境**：使用测试密钥进行开发和测试

## 故障排除

### 常见问题

1. **Webhook 未触发**
   - 检查 Webhook URL 是否正确
   - 确认选择了正确的事件类型
   - 检查 Webhook 签名密钥

2. **订阅状态不同步**
   - 检查 Webhook 事件是否正常处理
   - 确认数据库连接正常
   - 查看服务器日志

3. **支付失败**
   - 检查 Stripe 密钥配置
   - 确认价格 ID 正确
   - 查看 Stripe Dashboard 日志

## 更多资源

- [Better Auth Stripe 插件文档](https://www.better-auth.com/docs/plugins/stripe)
- [Stripe 文档](https://stripe.com/docs)
- [Stripe Checkout 文档](https://stripe.com/docs/checkout)
- [Stripe Customer Portal 文档](https://stripe.com/docs/billing/subscriptions/customer-portal) 