"use client";

import { useState } from "react";
import { useSession, deleteUser } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  
  // 应用设置状态
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [language, setLanguage] = useState("zh");
  
  // 隐私设置状态
  const [profileVisible, setProfileVisible] = useState(true);
  const [activityTracking, setActivityTracking] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);

  if (isPending) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">请先登录</h1>
          <Button asChild>
            <Link href="/sign-in">前往登录</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      toast.error('请输入 "DELETE" 确认删除');
      return;
    }

    setIsDeleting(true);

    try {
      const { data, error } = await deleteUser({});

      if (error) {
        toast.error(error.message || "删除账户失败");
        return;
      }

      toast.success("账户已删除");
      router.push("/");
    } catch (error) {
      toast.error("删除账户失败，请重试");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">设置</h1>
        <p className="text-muted-foreground">
          管理您的应用偏好、隐私和安全设置
        </p>
      </div>

      <div className="grid gap-6">
        {/* 外观设置 */}
        <Card>
          <CardHeader>
            <CardTitle>外观设置</CardTitle>
            <CardDescription>
              自定义应用的外观和行为
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">主题模式</Label>
                <p className="text-sm text-muted-foreground">
                  选择亮色或暗色主题
                </p>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择主题" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">亮色</SelectItem>
                  <SelectItem value="dark">暗色</SelectItem>
                  <SelectItem value="system">跟随系统</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">语言设置</Label>
                <p className="text-sm text-muted-foreground">
                  选择界面显示语言
                </p>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择语言" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 通知设置 */}
        <Card>
          <CardHeader>
            <CardTitle>通知设置</CardTitle>
            <CardDescription>
              配置您希望接收的通知类型
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">邮件通知</Label>
                <p className="text-sm text-muted-foreground">
                  接收重要事件的邮件通知
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">推送通知</Label>
                <p className="text-sm text-muted-foreground">
                  接收浏览器推送通知
                </p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">营销邮件</Label>
                <p className="text-sm text-muted-foreground">
                  接收产品更新和营销信息
                </p>
              </div>
              <Switch
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>
          </CardContent>
        </Card>

        {/* 隐私设置 */}
        <Card>
          <CardHeader>
            <CardTitle>隐私设置</CardTitle>
            <CardDescription>
              控制您的数据和隐私偏好
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">公开资料</Label>
                <p className="text-sm text-muted-foreground">
                  允许其他用户查看您的基本资料
                </p>
              </div>
              <Switch
                checked={profileVisible}
                onCheckedChange={setProfileVisible}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">活动跟踪</Label>
                <p className="text-sm text-muted-foreground">
                  允许记录您的使用活动以改进体验
                </p>
              </div>
              <Switch
                checked={activityTracking}
                onCheckedChange={setActivityTracking}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">数据收集</Label>
                <p className="text-sm text-muted-foreground">
                  允许收集匿名使用数据用于分析
                </p>
              </div>
              <Switch
                checked={dataCollection}
                onCheckedChange={setDataCollection}
              />
            </div>
          </CardContent>
        </Card>

        {/* 安全设置 */}
        <Card>
          <CardHeader>
            <CardTitle>安全设置</CardTitle>
            <CardDescription>
              管理您的账户安全和登录选项
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>活跃会话</Label>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">当前设备</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date().toLocaleString('zh-CN')} • 您当前正在使用的设备
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    当前会话
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>双因素认证</Label>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">暂未启用</p>
                    <p className="text-sm text-muted-foreground">
                      启用双因素认证以增强账户安全性
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    启用 2FA
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>数据导出</Label>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">导出您的数据</p>
                    <p className="text-sm text-muted-foreground">
                      下载您在平台上的所有数据副本
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icons.download className="mr-2 h-4 w-4" />
                    导出数据
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 危险区域 */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">危险区域</CardTitle>
            <CardDescription>
              这些操作是不可逆的，请谨慎操作
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-destructive/20 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-destructive">删除账户</h3>
                  <p className="text-sm text-muted-foreground">
                    永久删除您的账户和所有相关数据。此操作无法撤销。
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="deleteConfirmation">
                    请输入 <code className="bg-muted px-1 py-0.5 rounded text-sm">DELETE</code> 确认删除
                  </Label>
                  <Input
                    id="deleteConfirmation"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="输入 DELETE"
                    className="max-w-[200px]"
                  />
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || deleteConfirmation !== "DELETE"}
                >
                  {isDeleting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  删除账户
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 