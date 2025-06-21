"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Check, Star, Zap } from "lucide-react";
import { subscription } from "@/lib/auth-client";
import { toast } from "sonner";

interface Plan {
  name: string;
  displayName: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  priceId: string;
  annualPriceId?: string;
  features: string[];
  limits: {
    generations: number;
    projects: number;
    storage: number;
  };
  isPopular?: boolean;
  hasTrial?: boolean;
}

interface SubscriptionCardProps {
  plan: Plan;
  currentPlan?: string;
  isYearly: boolean;
  onToggleYearly: (yearly: boolean) => void;
}

export function SubscriptionCard({ 
  plan, 
  currentPlan, 
  isYearly, 
  onToggleYearly 
}: SubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? "年" : "月";
  const isCurrentPlan = currentPlan === plan.name;
  
  const handleUpgrade = async () => {
    setIsLoading(true);
    
    try {
      const result = await subscription.upgrade({
        plan: plan.name,
        annual: isYearly,
        successUrl: `${window.location.origin}/dashboard?success=subscription`,
        cancelUrl: `${window.location.origin}/pricing`,
      });
      
      if (result.error) {
        toast.error(result.error.message || "订阅失败，请重试");
      } else {
        // 重定向到 Stripe Checkout 会自动发生
        toast.info("正在跳转到支付页面...");
      }
    } catch (error) {
      console.error("订阅错误:", error);
      toast.error("订阅失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`relative ${plan.isPopular ? 'border-primary shadow-lg' : ''}`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">
            <Star className="w-3 h-3 mr-1" />
            最受欢迎
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold">{plan.displayName}</CardTitle>
        <CardDescription className="text-base">{plan.description}</CardDescription>
        
        <div className="mt-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Label htmlFor="yearly-toggle" className="text-sm">月付</Label>
            <Switch
              id="yearly-toggle"
              checked={isYearly}
              onCheckedChange={onToggleYearly}
            />
            <Label htmlFor="yearly-toggle" className="text-sm">年付</Label>
            {isYearly && (
              <Badge variant="secondary" className="text-xs">
                节省 {Math.round((1 - plan.yearlyPrice / plan.monthlyPrice) * 100)}%
              </Badge>
            )}
          </div>
          
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold">¥{price}</span>
            <span className="text-muted-foreground ml-1">/{period}</span>
          </div>
          
          {plan.hasTrial && !isCurrentPlan && (
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                14天免费试用
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">功能特性</h4>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">使用限制</h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">AI 生成次数</span>
              <span className="font-medium">
                {plan.limits.generations === -1 ? "无限制" : `${plan.limits.generations}/月`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">项目数量</span>
              <span className="font-medium">{plan.limits.projects}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">存储空间</span>
              <span className="font-medium">{plan.limits.storage}GB</span>
            </div>
          </div>
        </div>
        
        <Button
          className="w-full"
          variant={plan.isPopular ? "default" : "outline"}
          onClick={handleUpgrade}
          disabled={isLoading || isCurrentPlan}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              处理中...
            </>
          ) : isCurrentPlan ? (
            "当前计划"
          ) : (
            `升级到 ${plan.displayName}`
          )}
        </Button>
      </CardContent>
    </Card>
  );
} 