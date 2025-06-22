"use client";

import { useState, useEffect } from "react";
import { SubscriptionCard } from "./subscription-card";
import { subscription, useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

const plans = [
  {
    name: "basic",
    displayName: "基础版",
    description: "适合个人用户和小型项目",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      "每月 1000 次 AI 生成",
      "最多 5 个项目",
      "10GB 存储空间",
      "基础分析功能",
      "48小时客服响应",
      "社区支持"
    ],
    limits: {
      generations: 1000,
      projects: 5,
      storage: 10
    },
    isPopular: false,
    hasTrial: false
  },
  {
    name: "pro",
    displayName: "专业版",
    description: "适合专业用户和成长中的团队",
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      "无限制 AI 生成",
      "最多 50 个项目",
      "100GB 存储空间",
      "高级分析功能",
      "24小时客服响应",
      "优先支持",
      "团队协作功能",
      "自定义集成",
      "API 访问"
    ],
    limits: {
      generations: -1,
      projects: 50,
      storage: 100
    },
    isPopular: true,
    hasTrial: true
  }
];

export function PricingSection() {
  const { data: session } = useSession();
  const [isYearly, setIsYearly] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentSubscription = async () => {
      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await subscription.list();
        const activeSubscription = data?.find(
          sub => sub.status === "active" || sub.status === "trialing"
        );

        if (activeSubscription) {
          setCurrentPlan(activeSubscription.plan);
        }
      } catch (error) {
        console.error("获取当前订阅失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentSubscription();
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <SubscriptionCard
            key={plan.name}
            plan={plan}
            currentPlan={currentPlan}
            isYearly={isYearly}
            onToggleYearly={setIsYearly}
          />
        ))}
      </div>

      {/* 免费计划说明 */}
      <div className="mt-12 text-center">
        <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">免费计划</h3>
          <p className="text-muted-foreground mb-4">
            新用户可以免费体验我们的服务，每月享受 100 次 AI 生成额度
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">100</span>
              <br />
              <span className="text-muted-foreground">AI 生成/月</span>
            </div>
            <div>
              <span className="font-medium">3</span>
              <br />
              <span className="text-muted-foreground">项目数量</span>
            </div>
            <div>
              <span className="font-medium">1GB</span>
              <br />
              <span className="text-muted-foreground">存储空间</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 