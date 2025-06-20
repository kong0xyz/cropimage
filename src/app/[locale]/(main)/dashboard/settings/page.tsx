"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeleteAccountDialog } from "@/components/dashboard/delete-account-dialog";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";
import { 
  Palette, 
  Bell, 
  Shield, 
  Download, 
  Trash2, 
  Settings as SettingsIcon,
  ArrowLeft,
  User,
  Globe
} from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  
  // 应用设置状态
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("zh");
  
  // 通知设置状态
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // 隐私设置状态
  const [profileVisible, setProfileVisible] = useState(true);
  const [activityTracking, setActivityTracking] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);

  const handleExportData = async () => {
    try {
      const response = await fetch("/api/user/export-data", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("导出失败");
      }

      // 创建下载链接
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${session?.user.email?.replace('@', '_at_')}_data_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("数据导出成功");
    } catch (error) {
      toast.error("导出数据失败，请重试");
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* 页面标题和导航 */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回仪表板
            </Link>
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">设置</h1>
          <p className="text-muted-foreground">
            管理您的应用偏好、隐私和安全设置
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* 外观设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              外观设置
            </CardTitle>
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
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              通知设置
            </CardTitle>
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
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              隐私设置
            </CardTitle>
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
                  允许收集匿名使用数据以改进产品
                </p>
              </div>
              <Switch
                checked={dataCollection}
                onCheckedChange={setDataCollection}
              />
            </div>
          </CardContent>
        </Card>

        {/* 数据管理 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              数据管理
            </CardTitle>
            <CardDescription>
              导出或管理您的个人数据
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">导出数据</Label>
                <p className="text-sm text-muted-foreground">
                  下载您的个人数据副本
                </p>
              </div>
              <Button variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                导出数据
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 危险区域 */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              危险区域
            </CardTitle>
            <CardDescription>
              不可逆转的账户操作
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
                
                <DeleteAccountDialog userEmail={session?.user.email || ""}>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    删除账户
                  </Button>
                </DeleteAccountDialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快捷导航 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              快捷导航
            </CardTitle>
            <CardDescription>
              快速访问其他设置页面
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" asChild className="justify-start h-auto p-4">
              <Link href="/dashboard/profile">
                <User className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">个人资料</div>
                  <div className="text-sm text-muted-foreground">管理个人信息和账户关联</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="justify-start h-auto p-4">
              <Link href="/pricing">
                <Globe className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">订阅管理</div>
                  <div className="text-sm text-muted-foreground">查看和管理订阅计划</div>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 