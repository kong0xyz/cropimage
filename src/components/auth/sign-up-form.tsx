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
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // 邮箱密码注册
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("密码不匹配");
      return;
    }

    if (password.length < 8) {
      setError("密码至少需要8个字符");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name: name.trim(),
        callbackURL: "/dashboard",
      });

      if (error) {
        setError(error.message || "注册失败");
      } else {
        setMessage("注册成功！我们已向您的邮箱发送了验证链接，请点击链接完成邮箱验证后即可登录。");
        // 清空表单
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
      }
    } catch (err: any) {
      setError(err.message || "注册失败，请稍后重试");
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
      });
    } catch (error) {
      toast.error("登录失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">创建账户</CardTitle>
        <CardDescription className="text-center">
          选择您的注册方式
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 社交登录按钮 */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleSocialSignUp("github")}
            disabled={isLoading}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialSignUp("google")}
            disabled={isLoading}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleSocialSignUp("microsoft")}
            disabled={isLoading}
          >
            <Icons.microsoft className="mr-2 h-4 w-4" />
            Microsoft
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialSignUp("discord")}
            disabled={isLoading}
          >
            <Icons.discord className="mr-2 h-4 w-4" />
            Discord
          </Button>
        </div>

        <Separator />

        {/* 邮箱密码注册表单 */}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              type="text"
              placeholder="请输入您的姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">邮箱地址</Label>
            <Input
              id="email"
              type="email"
              placeholder="请输入您的邮箱地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              placeholder="请输入密码（至少8个字符）"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">确认密码</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="请再次输入密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {message && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
              {message}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !email || !password || !confirmPassword || !name}
          >
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            注册账户
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground text-center w-full">
          已有账户？{" "}
          <Link href="/sign-in" className="underline underline-offset-4 hover:text-primary">
            立即登录
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
} 