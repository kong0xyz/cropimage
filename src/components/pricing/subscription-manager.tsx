"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, CreditCard, Calendar, Users, AlertCircle, ExternalLink } from "lucide-react";
import { subscription, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Link } from "@/i18n/routing";

interface Subscription {
  id: string;
  plan: string;
  status: string;
  periodStart?: Date | string;
  periodEnd?: Date | string;
  cancelAtPeriodEnd?: boolean;
  seats?: number;
  trialStart?: Date | string;
  trialEnd?: Date | string;
  limits?: Record<string, number>;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  priceId?: string;
}

export function SubscriptionManager() {
  const { data: session } = useSession();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isManaging, setIsManaging] = useState(false);

  const fetchSubscriptions = async () => {
    try {
      const { data } = await subscription.list();
      setSubscriptions(data || []);
    } catch (error) {
      console.error("获取订阅信息失败:", error);
      toast.error("获取订阅信息失败");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchSubscriptions();
    }
  }, [session]);

  const handleManageSubscription = async () => {
    setIsManaging(true);
    
    try {
      const { data } = await subscription.cancel({
        returnUrl: `${window.location.origin}/dashboard/billing`,
      });
      
      if (data?.url) {
        // 重定向到 Stripe Customer Portal
        window.location.href = data.url;
      } else {
        toast.error("无法打开订阅管理页面");
      }
    } catch (error) {
      console.error("管理订阅错误:", error);
      toast.error("管理订阅失败，请重试");
    } finally {
      setIsManaging(false);
    }
  };

  const getStatusBadge = (status: string, cancelAtPeriodEnd: boolean) => {
    if (status === "active" && cancelAtPeriodEnd) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          即将取消
        </Badge>
      );
    }
    
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">活跃</Badge>;
      case "trialing":
        return <Badge className="bg-blue-500">试用中</Badge>;
      case "canceled":
        return <Badge variant="secondary">已取消</Badge>;
      case "past_due":
        return <Badge variant="destructive">逾期</Badge>;
      case "unpaid":
        return <Badge variant="destructive">未付款</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanDisplayName = (planName: string) => {
    switch (planName) {
      case "basic":
        return "基础版";
      case "pro":
        return "专业版";
      default:
        return planName.toUpperCase();
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const activeSubscription = subscriptions.find(
    sub => sub.status === "active" || sub.status === "trialing"
  );

  if (!activeSubscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            订阅管理
          </CardTitle>
          <CardDescription>
            您当前没有活跃的订阅计划
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/pricing">查看订阅计划</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isTrialing = activeSubscription.status === "trialing";
  const trialEnd = activeSubscription.trialEnd ? new Date(activeSubscription.trialEnd) : null;
  const periodEnd = activeSubscription.periodEnd ? new Date(activeSubscription.periodEnd) : null;
  const periodStart = activeSubscription.periodStart ? new Date(activeSubscription.periodStart) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          当前订阅
        </CardTitle>
        <CardDescription>
          管理您的订阅计划和账单信息
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {getPlanDisplayName(activeSubscription.plan)}
            </h3>
            <p className="text-sm text-muted-foreground">
              订阅ID: {activeSubscription.id}
            </p>
          </div>
          <div className="text-right">
            {getStatusBadge(activeSubscription.status, activeSubscription.cancelAtPeriodEnd || false)}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">计费周期</span>
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {periodStart && periodEnd ? (
                <>
                  {format(periodStart, "yyyy年MM月dd日", { locale: zhCN })} - {" "}
                  {format(periodEnd, "yyyy年MM月dd日", { locale: zhCN })}
                </>
              ) : (
                "计费周期信息不可用"
              )}
            </p>
          </div>

          {activeSubscription.seats && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">席位数量</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                {activeSubscription.seats} 个席位
              </p>
            </div>
          )}
        </div>

        {isTrialing && trialEnd && (
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">免费试用中</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              试用期将于 {format(trialEnd, "yyyy年MM月dd日", { locale: zhCN })} 结束
            </p>
          </div>
        )}

        {activeSubscription.cancelAtPeriodEnd && periodEnd && (
          <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">订阅即将取消</span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              您的订阅将在 {format(periodEnd, "yyyy年MM月dd日", { locale: zhCN })} 结束
            </p>
          </div>
        )}

        {activeSubscription.limits && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">当前计划限制</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI 生成次数</span>
                <span className="font-medium">
                  {activeSubscription.limits.generations === -1 
                    ? "无限制" 
                    : `${activeSubscription.limits.generations}/月`
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">项目数量</span>
                <span className="font-medium">{activeSubscription.limits.projects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">存储空间</span>
                <span className="font-medium">{activeSubscription.limits.storage}GB</span>
              </div>
            </div>
          </div>
        )}

        <Separator />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleManageSubscription}
            disabled={isManaging}
            className="flex items-center gap-2"
          >
            {isManaging ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
            管理订阅
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/pricing">
              升级计划
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 