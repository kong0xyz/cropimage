"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/dashboard",
      }, {
        onRequest: () => {
          // 显示加载状态
        },
        onSuccess: () => {
          toast.success("注册成功！请检查您的邮箱以验证账户。");
          router.push("/sign-in");
        },
        onError: (ctx) => {
          console.log(ctx);
          toast.error(ctx.error.message || "注册失败，请重试");
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }
    } catch (error) {
      toast.error("注册失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">创建账户</CardTitle>
        <CardDescription>
          输入您的信息来创建新账户
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
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
        <form onSubmit={handleSubmit}>
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
            />
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2 mt-2">
            <Label htmlFor="password">密码</Label>
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
            />
          </div>
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            创建账户
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="px-8 text-center text-sm text-muted-foreground">
          已有账户？{" "}
          <Link
            href="/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            登录
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
} 