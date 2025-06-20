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

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      }, {
        onRequest: () => {
          // 显示加载状态
        },
        onSuccess: () => {
          toast.success("登录成功！");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          console.log(ctx);
          toast.error(ctx.error.message || "登录失败，请重试");
        },
      });

      console.log(data, error);

      if (error) {
        toast.error(error.message);
        return;
      }
    } catch (error) {
      toast.error("登录失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "github" | "google" | "microsoft" | "discord") => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      }, {
        onRequest: () => {
          // 显示加载状态
        },
        onSuccess: () => {
          toast.success("登录成功！");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "社交登录失败，请重试");
          setIsLoading(false);
        },
      });
    } catch (error) {
      toast.error("社交登录失败，请重试");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">登录</CardTitle>
        <CardDescription>
          输入您的邮箱和密码来登录您的账户
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading}
              className="text-sm"
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn("microsoft")}
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
              onClick={() => handleSocialSignIn("discord")}
              disabled={isLoading}
              className="text-sm"
            >
              <Icons.discord className="mr-2 h-4 w-4" />
              Discord
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn("github")}
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
              或使用邮箱继续
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">密码</Label>
              <Link
                href="/forgot-password"
                className="text-center text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                忘记密码?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            登录
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-center text-sm text-muted-foreground">
          还没有账户？{" "}
          <Link
            href="/sign-up"
            className="underline underline-offset-4 hover:text-primary"
          >
            注册
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
} 