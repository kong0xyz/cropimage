"use client";

import { useState } from "react";
import { forgetPassword } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { SiteLogo } from "@/components/blocks/site-logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingStep, setLoadingStep] = useState<"verifying" | "sending" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("请输入邮箱地址");
      return;
    }

    setIsLoading(true);
    setLoadingStep("verifying");

    try {
      // 首先验证邮箱是否存在
      toast.info("正在验证邮箱地址...");

      const checkResponse = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const checkResult = await checkResponse.json();

      if (!checkResponse.ok) {
        if (checkResponse.status === 400) {
          toast.error(checkResult.error || "邮箱地址无效");
        } else {
          toast.error(checkResult.error || "验证邮箱时出错");
        }
        return;
      }

      if (!checkResult.exists) {
        toast.error("该邮箱地址未注册", {
          description: "请检查邮箱地址是否正确，或者先注册一个新账户",
          action: {
            label: "立即注册",
            onClick: () => window.location.href = "/sign-up",
          },
        });
        return;
      }

      // 邮箱存在，发送重置邮件
      setLoadingStep("sending");
      const { error } = await forgetPassword({
        email,
        redirectTo: "/reset-password",
      }, {
        onRequest: () => {
          toast.info("正在发送重置邮件...");
        },
        onSuccess: () => {
          setIsSuccess(true);
          toast.success("重置邮件已发送！");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "发送失败，请重试");
        },
      });

      if (error) {
        toast.error(error.message || "发送失败，请重试");
      }
    } catch (error) {
      toast.error("发送失败，请重试");
    } finally {
      setIsLoading(false);
      setLoadingStep(null);
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
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Icons.mail className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                邮件已发送
              </h1>
              <p className="text-sm text-muted-foreground">
                我们已向 <strong>{email}</strong> 发送了密码重置链接
              </p>
            </div>

            <Alert>
              <Icons.mail className="h-4 w-4" />
              <AlertDescription>
                请检查您的邮箱（包括垃圾邮件文件夹），然后点击邮件中的链接来重置密码。
              </AlertDescription>
            </Alert>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                }}
                variant="outline"
                className="w-full"
              >
                <Icons.refresh className="mr-2 h-4 w-4" />
                重新发送
              </Button>

              <Button asChild className="w-full">
                <Link href="/sign-in">返回登录</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-amber-700" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <SiteLogo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;忘记密码很常见，我们的安全重置流程让您能够快速重新获得账户访问权限。&rdquo;
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
              <CardTitle className="text-2xl">忘记密码？</CardTitle>
              <CardDescription>
                请输入您的邮箱地址，我们将发送重置链接给您
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Alert>
                <Icons.mail className="h-4 w-4" />
                <AlertDescription>
                  我们将首先验证该邮箱是否已注册，然后向您的邮箱发送安全的密码重置链接。
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入您的邮箱地址"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading
                    ? loadingStep === "verifying"
                      ? "验证邮箱中..."
                      : "发送邮件中..."
                    : "发送重置邮件"
                  }
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <p className="text-center text-sm text-muted-foreground">
                记起密码了？{" "}
                <Link
                  href="/sign-in"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  返回登录
                </Link>
              </p>
              <p className="text-center text-sm text-muted-foreground">
                还没有账户？{" "}
                <Link
                  href="/sign-up"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  立即注册
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 