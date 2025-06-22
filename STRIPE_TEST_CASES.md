# Stripe 订阅系统测试用例

## 测试环境准备

### 1. Stripe 测试卡号
```bash
# 成功付款
4242 4242 4242 4242

# 需要3D验证
4000 0025 0000 3155

# 付款失败
4000 0000 0000 9995

# 过期日期: 任何未来日期 (如 12/34)
# CVC: 任意3位数字 (如 123)
```

### 2. 测试账户
- 使用不同邮箱创建多个测试账户
- 确保邮箱已验证（订阅需要邮箱验证）

## 核心测试用例

### 测试组 1: 基础订阅流程

#### TC-001: 新用户首次订阅 Basic 月付
**步骤:**
1. 注册新账户并验证邮箱
2. 访问 `/pricing` 页面
3. 选择 Basic 计划，月付模式
4. 点击"升级到基础版"
5. 完成 Stripe Checkout 支付

**预期结果:**
```json
{
  "status": "active",
  "plan": "basic",
  "cancelAtPeriodEnd": false,
  "periodStart": "今天",
  "periodEnd": "1个月后",
  "trialStart": null,
  "trialEnd": null
}
```

#### TC-002: 新用户首次订阅 Pro 月付（含试用）
**步骤:**
1. 注册新账户并验证邮箱
2. 选择 Pro 计划，月付模式
3. 完成 Stripe Checkout（试用期不需要立即付款）

**预期结果:**
```json
{
  "status": "trialing",
  "plan": "pro",
  "cancelAtPeriodEnd": false,
  "periodStart": "今天",
  "periodEnd": "1个月后",
  "trialStart": "今天",
  "trialEnd": "14天后"
}
```

#### TC-003: Basic 年付订阅
**步骤:**
1. 选择 Basic 计划，切换到年付
2. 验证价格显示为 ¥79/年
3. 完成支付

**预期结果:**
```json
{
  "status": "active",
  "plan": "basic",
  "cancelAtPeriodEnd": false,
  "periodStart": "今天",
  "periodEnd": "1年后"
}
```

### 测试组 2: 订阅升级/降级

#### TC-004: Basic → Pro 升级
**前置条件:** 已有 Basic 月付订阅
**步骤:**
1. 访问 `/pricing` 页面
2. 选择 Pro 计划
3. 完成升级支付

**预期结果:**
- 旧的 Basic 订阅被取消
- 新的 Pro 订阅创建
- `cancelAtPeriodEnd: false`
- 如果是新 Pro 用户，应该有14天试用

#### TC-005: Pro → Basic 降级
**前置条件:** 已有 Pro 订阅
**步骤:**
1. 选择 Basic 计划
2. 完成降级

**预期结果:**
- Pro 订阅在当前周期结束时取消
- Basic 订阅在 Pro 周期结束后开始

#### TC-006: 月付 → 年付转换
**前置条件:** 已有月付订阅
**步骤:**
1. 在相同计划下切换到年付
2. 完成支付

**预期结果:**
- 按比例退款月付费用
- 新的年付订阅开始

### 测试组 3: 订阅管理

#### TC-007: 取消订阅
**步骤:**
1. 访问 `/dashboard/billing`
2. 点击"管理订阅"
3. 在 Stripe Portal 中取消订阅

**预期结果:**
```json
{
  "status": "active", // 在周期结束前仍然活跃
  "cancelAtPeriodEnd": true,
  "periodEnd": "原周期结束日期"
}
```

#### TC-008: 恢复已取消订阅
**前置条件:** 订阅已取消但未到期
**步骤:**
1. 在 Stripe Portal 中恢复订阅
2. 或使用 `subscription.restore()` API

**预期结果:**
```json
{
  "status": "active",
  "cancelAtPeriodEnd": false
}
```

#### TC-009: 订阅到期处理
**步骤:**
1. 等待已取消订阅到期
2. 检查订阅状态

**预期结果:**
```json
{
  "status": "canceled"
}
```

### 测试组 4: 试用期管理

#### TC-010: 试用期内取消
**前置条件:** Pro 计划试用期内
**步骤:**
1. 在试用期内取消订阅
2. 检查状态变化

**预期结果:**
```json
{
  "status": "trialing",
  "cancelAtPeriodEnd": true,
  "trialEnd": "14天后"
}
```

#### TC-011: 试用期转为付费
**步骤:**
1. 等待试用期结束
2. 确保有效付款方式
3. 检查自动转换

**预期结果:**
```json
{
  "status": "active",
  "cancelAtPeriodEnd": false
}
```

#### TC-012: 试用期付款失败
**步骤:**
1. 使用失败的测试卡号
2. 等待试用期结束

**预期结果:**
```json
{
  "status": "past_due" // 或 "unpaid"
}
```

### 测试组 5: 边界情况

#### TC-013: 重复订阅相同计划
**步骤:**
1. 已有 Basic 订阅
2. 再次尝试订阅 Basic

**预期结果:**
- 应该阻止重复订阅
- 或更新现有订阅

#### TC-014: 付款失败处理
**步骤:**
1. 使用失败的测试卡号
2. 尝试订阅

**预期结果:**
- 显示清晰的错误信息
- 订阅状态不变

#### TC-015: Webhook 延迟测试
**步骤:**
1. 暂时禁用 Webhook
2. 完成支付
3. 重新启用 Webhook

**预期结果:**
- 订阅状态最终同步
- 数据一致性保持

## 您遇到的问题测试

### TC-016: 复现您的问题
**步骤:**
1. 订阅 Basic 1个月
2. 立即升级到 Pro（试用）
3. 立即取消订阅
4. 重新订阅 Basic 年付

**当前结果:**
```json
{
  "status": "active",
  "plan": "basic",
  "cancelAtPeriodEnd": true, // ❌ 应该是 false
  "periodEnd": "1年后"
}
```

**预期结果:**
```json
{
  "status": "active",
  "plan": "basic", 
  "cancelAtPeriodEnd": false, // ✅ 新订阅不应该被标记为取消
  "periodEnd": "1年后"
}
```

## 数据验证检查点

### 1. 数据库检查
```sql
-- 检查订阅表
SELECT * FROM subscription WHERE referenceId = 'user_id';

-- 检查用户的 Stripe 客户ID
SELECT stripeCustomerId FROM user WHERE id = 'user_id';
```

### 2. Stripe Dashboard 检查
- 客户订阅历史
- 付款历史
- Webhook 事件日志

### 3. 应用状态检查
- `/dashboard/billing` 页面显示
- 订阅限制是否正确应用
- 用户权限是否匹配订阅计划

## 自动化测试脚本

```typescript
// 示例测试脚本
describe('Stripe Subscription Tests', () => {
  test('TC-001: 新用户首次订阅 Basic', async () => {
    const user = await createTestUser();
    await verifyEmail(user);
    
    const result = await subscription.upgrade({
      plan: 'basic',
      annual: false,
      successUrl: '/test-success',
      cancelUrl: '/test-cancel'
    });
    
    expect(result.error).toBeUndefined();
    
    const subscriptions = await subscription.list();
    const activeSubscription = subscriptions.data?.find(
      sub => sub.status === 'active'
    );
    
    expect(activeSubscription).toMatchObject({
      plan: 'basic',
      status: 'active',
      cancelAtPeriodEnd: false
    });
  });
});
```

## 问题排查步骤

### 1. 检查 Webhook 日志
```bash
# 查看最近的 webhook 事件
stripe logs tail --filter-account YOUR_ACCOUNT_ID
```

### 2. 验证订阅数据同步
```typescript
// 强制刷新订阅数据
const { data } = await subscription.list();
console.log('Current subscriptions:', data);
```

### 3. 检查 Stripe Dashboard
- 客户的订阅历史
- 确认 `cancel_at_period_end` 状态
- 查看事件时间线

根据您的测试结果，建议重点关注 **TC-016** 的修复，确保新订阅不会继承之前订阅的取消状态。 