# 简单菜单功能开关实现

## 🎯 实现目标
根据 `stripeEnabled` 状态决定是否显示 Pricing 菜单项，同时支持其他功能菜单的动态控制。

## 📝 实现方案
采用最简单直接的方式：在菜单配置中根据功能状态动态构建菜单数组。

## 🔧 核心实现

### 修改 `src/config/menu.tsx`

```typescript
import { siteConfig } from "./site";
import { featureConfig } from "./feature";

// 动态生成菜单数组
const dynamicMenu: MenuItem[] = [];

// 根据功能状态添加菜单项
if (featureConfig.stripeEnabled) {
  dynamicMenu.push({
    label: "Pricing",
    key: "menu.pricing",
    href: "/pricing",
  });
}

if (featureConfig.docsEnabled) {
  dynamicMenu.push({
    label: "Docs",
    key: "menu.docs",
    href: "/docs",
  });
}

if (featureConfig.blogEnabled) {
  dynamicMenu.push({
    label: "Blog",
    key: "menu.blog",
    href: "/blog",
  });
}

export const menuConfig: MenuConfig = {
  logo: {
    url: "/",
    src: "/logo.png",
    alt: "",
    title: siteConfig.name,
  },
  menu: dynamicMenu, // 使用动态菜单数组
  mobileExtraLinks: [
    {
      label: "Sitemap",
      key: "menu.sitemap",
      href: "/sitemap",
    },
  ],
};
```

## ✅ 功能效果

- **✅ Stripe 功能启用时**：显示 "Pricing" 菜单
- **❌ Stripe 功能禁用时**：不显示 "Pricing" 菜单
- **🔄 其他功能**：同样支持 Docs、Blog 等功能的动态控制

## 🚀 优势

1. **简单直接**：直接在配置文件中判断，无需复杂的组件包装
2. **性能优良**：构建时确定，无运行时开销
3. **易于维护**：逻辑集中在一个地方
4. **扩展性好**：添加新功能菜单只需要加一个 if 判断

## 🔧 环境变量控制

通过以下环境变量控制菜单显示：

```bash
# .env.local
FEATURE_STRIPE_ENABLED=true   # 控制 Pricing 菜单
FEATURE_DOCS_ENABLED=true     # 控制 Docs 菜单  
FEATURE_BLOG_ENABLED=true     # 控制 Blog 菜单
```

## 🎉 测试结果

- ✅ 构建成功
- ✅ 菜单动态显示正常
- ✅ 无性能影响
- ✅ 代码简洁易懂

这个简单的实现完美满足了您的需求！🚀 