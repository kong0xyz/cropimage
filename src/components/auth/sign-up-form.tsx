"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";

type RegistrationStep = "email" | "verification" | "password";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("email");
  
  // 表单数据
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // 验证码相关状态
  const [codeExpiry, setCodeExpiry] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  
  const router = useRouter();

  // 发送验证码
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("请输入邮箱地址");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "发送验证码失败");
        return;
      }

      toast.success("验证码已发送到您的邮箱");
      setCurrentStep("verification");
      
      // 设置倒计时
      const expiryTime = Date.now() + data.expiresIn * 1000;
      setCodeExpiry(expiryTime);
      setCountdown(data.expiresIn);
      
      // 启动倒计时
      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
        setCountdown(remaining);
        
        if (remaining === 0) {
          clearInterval(timer);
        }
      }, 1000);

    } catch (error) {
      toast.error("发送验证码失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  // 验证验证码并进入密码设置步骤
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("请输入6位验证码");
      return;
    }

    if (countdown === 0) {
      toast.error("验证码已过期，请重新获取");
      return;
    }

    setIsLoading(true);

    try {
      // 先验证验证码是否正确
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "验证码验证失败");
        return;
      }

      // 验证成功，进入密码设置步骤
      setCurrentStep("password");
      toast.success("验证码验证成功，请设置您的登录密码");

    } catch (error) {
      toast.error("验证码验证失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  // 完成注册
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("请输入您的姓名");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("密码不匹配");
      return;
    }

    if (password.length < 8) {
      toast.error("密码至少需要8个字符");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-and-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
          password,
          name: name.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "注册失败");
        return;
      }

      toast.success("注册成功！即将跳转到控制台");
      
      // 延迟跳转，让用户看到成功消息
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error) {
      toast.error("注册失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  // 社交登录
  const handleSocialSignUp = async (provider: "github" | "google" | "microsoft" | "discord") => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
        newUserCallbackURL: "/dashboard",
      }, {
        onRequest: () => {
          // 显示加载状态
        },
        onSuccess: () => {
          toast.success("注册成功！");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "社交注册失败，请重试");
          setIsLoading(false);
        },
      });
    } catch (error) {
      toast.error("社交注册失败，请重试");
      setIsLoading(false);
    }
  };

  // 重新发送验证码
  const handleResendCode = async () => {
    await handleSendCode({ preventDefault: () => {} } as React.FormEvent);
  };

  // 返回上一步
  const handleGoBack = () => {
    if (currentStep === "verification") {
      setCurrentStep("email");
      setVerificationCode("");
    } else if (currentStep === "password") {
      setCurrentStep("verification");
      setName("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  // 格式化倒计时显示
  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">创建账户</CardTitle>
        <CardDescription>
          {currentStep === "email" && "输入您的邮箱地址开始注册"}
          {currentStep === "verification" && "输入发送到您邮箱的验证码"}
          {currentStep === "password" && "设置您的登录密码"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-4">
        {/* 社交登录选项 */}
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => handleSocialSignUp("google")}
              disabled={isLoading}
              className="text-sm"
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialSignUp("microsoft")}
              disabled={isLoading}
              className="text-sm"
            >
              <Icons.microsoft className="mr-2 h-4 w-4" />
              Microsoft
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => handleSocialSignUp("discord")}
              disabled={isLoading}
              className="text-sm"
            >
              <Icons.discord className="mr-2 h-4 w-4" />
              Discord
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialSignUp("github")}
              disabled={isLoading}
              className="text-sm"
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              或使用邮箱注册
            </span>
          </div>
        </div>

        {/* 步骤1：输入邮箱 */}
        {currentStep === "email" && (
          <form onSubmit={handleSendCode}>
            <div className="grid gap-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                autoFocus
              />
            </div>
            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={isLoading || !email}
            >
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              发送验证码
            </Button>
          </form>
        )}

        {/* 步骤2：验证码验证 */}
        {currentStep === "verification" && (
          <form onSubmit={handleVerifyCode}>
            <div className="grid gap-2">
              <Label htmlFor="code">验证码</Label>
              <Input
                id="code"
                type="text"
                placeholder="请输入6位验证码"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={isLoading}
                required
                autoFocus
                maxLength={6}
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>验证码已发送到：{email}</span>
                {countdown > 0 ? (
                  <span>剩余时间：{formatCountdown(countdown)}</span>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="p-0 h-auto"
                  >
                    重新发送
                  </Button>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGoBack}
                disabled={isLoading}
                className="flex-1"
              >
                返回
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isLoading || verificationCode.length !== 6 || countdown === 0}
              >
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                验证
              </Button>
            </div>
          </form>
        )}

        {/* 步骤3：设置密码 */}
        {currentStep === "password" && (
          <form onSubmit={handleCompleteRegistration}>
            <div className="grid gap-2">
              <Label htmlFor="name">姓名</Label>
              <Input
                id="name"
                type="text"
                placeholder="张三"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
                autoFocus
              />
            </div>
            <div className="grid gap-2 mt-2">
              <Label htmlFor="password">登录密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="至少8个字符"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                minLength={8}
              />
            </div>
            <div className="grid gap-2 mt-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="再次输入密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
                minLength={8}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGoBack}
                disabled={isLoading}
                className="flex-1"
              >
                返回
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isLoading || !name.trim() || !password || password !== confirmPassword || password.length < 8}
              >
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                完成注册
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      
      <CardFooter>
        <p className="px-8 text-center text-sm text-muted-foreground">
          已有账户？{" "}
          <Link
            href="/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            立即登录
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
} 