"use client";

import { useState } from "react";
import { useSession, updateUser, changePassword, linkSocial, unlinkAccount, listAccounts } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [name, setName] = useState(session?.user.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const { data, error } = await updateUser({
        name,
      }, {
        onSuccess: () => {
          toast.success("个人资料更新成功！");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "更新失败，请重试");
        },
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("更新失败，请重试");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("新密码和确认密码不匹配");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("密码至少需要8个字符");
      return;
    }

    setIsChangingPassword(true);

    try {
      const { data, error } = await changePassword({
        currentPassword,
        newPassword,
      }, {
        onSuccess: () => {
          toast.success("密码修改成功！");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "密码修改失败");
        },
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("密码修改失败，请重试");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLinkSocial = async (provider: "github" | "google" | "microsoft" | "facebook" | "discord") => {
    try {
      await linkSocial({
        provider,
        callbackURL: "/dashboard/profile",
      });
    } catch (error) {
      toast.error("账户关联失败，请重试");
    }
  };

  const handleUnlinkAccount = async (providerId: string) => {
    try {
      const { data, error } = await unlinkAccount({
        providerId,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("账户解除关联成功");
    } catch (error) {
      toast.error("解除关联失败，请重试");
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">个人资料</h1>
        <p className="text-muted-foreground">
          管理您的账户信息和安全设置
        </p>
      </div>

      <div className="grid gap-6">
        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>
              更新您的个人资料信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                  <AvatarFallback className="text-lg">
                    {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Icons.upload className="mr-2 h-4 w-4" />
                  更换头像
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入您的姓名"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  value={session.user.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-sm text-muted-foreground">
                  邮箱地址无法修改
                </p>
              </div>

              <Button type="submit" disabled={isUpdating}>
                {isUpdating && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                保存更改
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 密码修改 */}
        <Card>
          <CardHeader>
            <CardTitle>密码修改</CardTitle>
            <CardDescription>
              更改您的登录密码
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">当前密码</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="请输入当前密码"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="newPassword">新密码</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="请输入新密码（至少8个字符）"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">确认新密码</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入新密码"
                />
              </div>

              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                修改密码
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 账户关联 */}
        <Card>
          <CardHeader>
            <CardTitle>账户关联</CardTitle>
            <CardDescription>
              关联社交账户以便快速登录
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icons.gitHub className="h-5 w-5" />
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-sm text-muted-foreground">通过 GitHub 登录</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkSocial("github")}
              >
                关联
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icons.google className="h-5 w-5" />
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-muted-foreground">通过 Google 登录</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkSocial("google")}
              >
                关联
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icons.microsoft className="h-5 w-5" />
                <div>
                  <p className="font-medium">Microsoft</p>
                  <p className="text-sm text-muted-foreground">通过 Microsoft 登录</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkSocial("microsoft")}
              >
                关联
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icons.facebook className="h-5 w-5" />
                <div>
                  <p className="font-medium">Facebook</p>
                  <p className="text-sm text-muted-foreground">通过 Facebook 登录</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkSocial("facebook")}
              >
                关联
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icons.discord className="h-5 w-5" />
                <div>
                  <p className="font-medium">Discord</p>
                  <p className="text-sm text-muted-foreground">通过 Discord 登录</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkSocial("discord")}
              >
                关联
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 危险区域 */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">危险区域</CardTitle>
            <CardDescription>
              这些操作无法撤销，请谨慎操作
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" size="sm">
              删除账户
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 