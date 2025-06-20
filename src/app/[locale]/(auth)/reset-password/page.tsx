"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icons } from "@/components/icons";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { SiteLogo } from "@/components/blocks/site-logo";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("重置链接无效或已过期");
      router.push("/forgot-password");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.error("请填写所有字段");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("两次输入的密码不一致");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("密码至少需要8个字符");
      return;
    }

    if (!token) {
      toast.error("重置令牌无效");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await resetPassword({
        newPassword,
        token,
      }, {
        onRequest: () => {
          toast.info("正在重置密码...");
        },
        onSuccess: () => {
          setIsSuccess(true);
          toast.success("密码重置成功！");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "重置失败，请重试");
        },
      });

      if (error) {
        toast.error(error.message || "重置失败，请重试");
      }
    } catch (error) {
      toast.error("重置失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-700" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <SiteLogo />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;密码重置成功！您的账户安全得到了保障。&rdquo;
              </p>
              <footer className="text-sm">Next Maker 安全团队</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex justify-center">
              <SiteLogo />
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Icons.checkCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                密码重置成功
              </h1>
              <p className="text-sm text-muted-foreground">
                您的密码已成功更新
              </p>
            </div>
            
            <Alert>
              <Icons.checkCircle className="h-4 w-4" />
              <AlertDescription>
                您现在可以使用新密码登录账户了。
              </AlertDescription>
            </Alert>
            
            <Button asChild className="w-full">
              <Link href="/sign-in">立即登录</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-rose-700" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <SiteLogo />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;安全的密码重置流程让我们的用户能够快速恢复账户访问权限。&rdquo;
              </p>
              <footer className="text-sm">Next Maker 安全团队</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex justify-center">
              <SiteLogo />
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <Icons.alertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                链接无效
              </h1>
              <p className="text-sm text-muted-foreground">
                重置链接无效或已过期
              </p>
            </div>
            
            <Alert>
              <Icons.alertTriangle className="h-4 w-4" />
              <AlertDescription>
                请重新申请密码重置邮件。
              </AlertDescription>
            </Alert>
            
            <Button asChild className="w-full">
              <Link href="/forgot-password">重新申请</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <SiteLogo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;设置一个强密码来保护您的账户安全。&rdquo;
            </p>
            <footer className="text-sm">Next Maker 安全团队</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex justify-center">
            <SiteLogo />
          </div>
          <Card className="w-[400px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">重置密码</CardTitle>
              <CardDescription>
                请输入您的新密码
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">新密码</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="请输入新密码"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    minLength={8}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">确认密码</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="请再次输入新密码"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    minLength={8}
                  />
                </div>

                <Alert>
                  <Icons.alertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    密码至少需要8个字符，建议包含字母、数字和特殊字符。
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "重置中..." : "重置密码"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-center text-sm text-muted-foreground">
                记起密码了？{" "}
                <Link
                  href="/sign-in"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  返回登录
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 