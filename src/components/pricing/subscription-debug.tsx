"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { subscription, useSession } from "@/lib/auth-client";
import { RefreshCw, Bug, Database, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export function SubscriptionDebug() {
  const { data: session } = useSession();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rawData, setRawData] = useState<any>(null);

  const fetchSubscriptions = async () => {
    setIsLoading(true);
    try {
      const result = await subscription.list();
      console.log("Raw subscription data:", result);
      setRawData(result);
      setSubscriptions(result.data || []);
      toast.success("订阅数据已刷新");
    } catch (error) {
      console.error("获取订阅数据失败:", error);
      toast.error("获取订阅数据失败");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchSubscriptions();
    }
  }, [session]);

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("zh-CN");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "trialing": return "bg-blue-500";
      case "canceled": return "bg-gray-500";
      case "past_due": return "bg-red-500";
      case "unpaid": return "bg-orange-500";
      default: return "bg-gray-400";
    }
  };

  if (!session) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">请先登录以查看订阅调试信息</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            订阅调试信息
          </CardTitle>
          <CardDescription>
            用于调试和验证订阅状态的详细信息
          </CardDescription>
          <Button 
            onClick={fetchSubscriptions} 
            disabled={isLoading}
            size="sm"
            className="w-fit"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            刷新数据
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 用户信息 */}
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Database className="h-4 w-4" />
              用户信息
            </h4>
            <div className="bg-muted/50 p-3 rounded text-sm font-mono">
              <div>用户ID: {session.user.id}</div>
              <div>邮箱: {session.user.email}</div>
              <div>邮箱验证: {session.user.emailVerified ? "✅ 已验证" : "❌ 未验证"}</div>
            </div>
          </div>

          <Separator />

          {/* 订阅列表 */}
          <div>
            <h4 className="font-medium mb-2">订阅列表 ({subscriptions.length})</h4>
            {subscriptions.length === 0 ? (
              <p className="text-muted-foreground text-sm">暂无订阅</p>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((sub, index) => (
                  <Card key={sub.id || index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(sub.status)}>
                              {sub.status}
                            </Badge>
                            <span className="font-medium">{sub.plan}</span>
                            {sub.cancelAtPeriodEnd && (
                              <Badge variant="destructive" className="text-xs">
                                即将取消
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm space-y-1">
                            <div>订阅ID: <code className="bg-muted px-1 rounded">{sub.id}</code></div>
                            <div>Stripe订阅ID: <code className="bg-muted px-1 rounded">{sub.stripeSubscriptionId || "N/A"}</code></div>
                            <div>Stripe客户ID: <code className="bg-muted px-1 rounded">{sub.stripeCustomerId || "N/A"}</code></div>
                          </div>
                        </div>
                        
                        <div className="text-sm space-y-1">
                          <div><strong>周期开始:</strong> {formatDate(sub.periodStart)}</div>
                          <div><strong>周期结束:</strong> {formatDate(sub.periodEnd)}</div>
                          <div><strong>试用开始:</strong> {formatDate(sub.trialStart)}</div>
                          <div><strong>试用结束:</strong> {formatDate(sub.trialEnd)}</div>
                          <div><strong>周期结束时取消:</strong> {sub.cancelAtPeriodEnd ? "✅ 是" : "❌ 否"}</div>
                          {sub.seats && <div><strong>席位数:</strong> {sub.seats}</div>}
                        </div>
                      </div>
                      
                      {sub.limits && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="text-sm">
                            <strong>计划限制:</strong>
                            <div className="grid grid-cols-3 gap-4 mt-1">
                              <div>生成: {sub.limits.generations === -1 ? "无限" : sub.limits.generations}</div>
                              <div>项目: {sub.limits.projects}</div>
                              <div>存储: {sub.limits.storage}GB</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* 原始数据 */}
          <div>
            <h4 className="font-medium mb-2">原始API响应</h4>
            <details className="bg-muted/50 p-3 rounded">
              <summary className="cursor-pointer text-sm font-medium">点击查看JSON数据</summary>
              <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify(rawData, null, 2)}
              </pre>
            </details>
          </div>

          {/* 测试建议 */}
          <div>
            <h4 className="font-medium mb-2">测试建议</h4>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-sm">
              <p className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                根据您的问题，请检查：
              </p>
              <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
                <li>新订阅的 <code>cancelAtPeriodEnd</code> 是否为 <code>false</code></li>
                <li>Stripe Dashboard 中的订阅状态是否与应用一致</li>
                <li>是否有多个活跃订阅（应该只有一个）</li>
                <li>Webhook 事件是否正确处理</li>
              </ul>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://dashboard.stripe.com/test/customers', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Stripe Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(rawData, null, 2));
                toast.success("数据已复制到剪贴板");
              }}
            >
              复制调试数据
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 