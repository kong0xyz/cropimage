"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser, changePassword, linkSocial, unlinkAccount, listAccounts, sendVerificationEmail } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";
import {
  User,
  Mail,
  Lock,
  Link as LinkIcon,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Upload,
  Github,
  Settings,
  ArrowLeft
} from "lucide-react";
import { Icons } from "@/components/icons";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [name, setName] = useState(session?.user.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkedAccounts, setLinkedAccounts] = useState<any[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  useEffect(() => {
    if (session?.user.name) {
      setName(session.user.name);
    }
  }, [session?.user.name]);

  useEffect(() => {
    const fetchLinkedAccounts = async () => {
      try {
        const { data } = await listAccounts();
        setLinkedAccounts(data || []);
      } catch (error) {
        console.error("获取关联账户失败:", error);
      } finally {
        setIsLoadingAccounts(false);
      }
    };

    if (session) {
      fetchLinkedAccounts();
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
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
      await updateUser({
        name,
      }, {
        onSuccess: () => {
          toast.success("个人资料更新成功！");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "更新失败，请重试");
        },
      });

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
      await changePassword({
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
    } catch (error) {
      toast.error("密码修改失败，请重试");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSendVerification = async () => {
    setIsSendingVerification(true);

    try {
      await sendVerificationEmail({
        email: session.user.email,
        callbackURL: "/dashboard/profile",
      }, {
        onRequest: () => {
          toast.info("正在发送验证邮件...");
        },
        onSuccess: () => {
          toast.success("验证邮件已发送！请检查您的邮箱。");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "发送失败，请重试");
        },
      });
    } catch (error) {
      toast.error("发送失败，请重试");
    } finally {
      setIsSendingVerification(false);
    }
  };

  const handleLinkSocial = async (provider: "github" | "google" | "microsoft" | "discord") => {
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
      await unlinkAccount({
        providerId,
      }, {
        onSuccess: async () => {
          toast.success("账户解除关联成功");
          // 重新获取关联账户列表
          const { data: accounts } = await listAccounts();
          setLinkedAccounts(accounts || []);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "解除关联失败，请重试");
        },
      });
    } catch (error) {
      toast.error("解除关联失败，请重试");
    }
  };

  const isAccountLinked = (provider: string) => {
    return linkedAccounts.some(account => account.providerId === provider);
  };

  const getLinkedAccount = (provider: string) => {
    return linkedAccounts.find(account => account.providerId === provider);
  };

  const socialProviders = [
    { id: "github", name: "GitHub", icon: Icons.gitHub },
    { id: "google", name: "Google", icon: Icons.google },
    { id: "microsoft", name: "Microsoft", icon: Icons.microsoft },
    { id: "discord", name: "Discord", icon: Icons.discord },
  ];

  return (
    <div className="container mx-auto py-8 max-w-4xl">
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
          <h1 className="text-3xl font-bold tracking-tight">个人资料</h1>
          <p className="text-muted-foreground">
            管理您的账户信息和安全设置
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 左栏 */}
        <div className="space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                基本信息
              </CardTitle>
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
                  <Button variant="outline" size="sm" type="button">
                    <Upload className="mr-2 h-4 w-4" />
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
                  <div className="flex items-center space-x-2">
                    <Input
                      id="email"
                      value={session.user.email}
                      disabled
                      className="bg-muted flex-1"
                    />
                    <div className="flex items-center space-x-2">
                      {session.user.emailVerified ? (
                        <Badge variant="secondary" className="text-green-600 bg-green-50 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          已验证
                        </Badge>
                      ) : (
                        <>
                          <Badge variant="secondary" className="text-amber-600 bg-amber-50 border-amber-200">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            未验证
                          </Badge>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleSendVerification}
                            disabled={isSendingVerification}
                          >
                            {isSendingVerification ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Mail className="h-4 w-4" />
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.user.emailVerified
                      ? "您的邮箱已通过验证"
                      : "请验证您的邮箱以确保账户安全"
                    }
                  </p>
                </div>

                <Button type="submit" disabled={isUpdating}>
                  {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  保存更改
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 密码修改 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                密码修改
              </CardTitle>
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
                  {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  修改密码
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* 右栏 */}
        <div className="space-y-6">
          {/* 账户关联 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                账户关联
              </CardTitle>
              <CardDescription>
                关联社交账户以便快速登录
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingAccounts ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                socialProviders.map((provider, index) => {
                  const isLinked = isAccountLinked(provider.id);
                  const linkedAccount = getLinkedAccount(provider.id);
                  const Icon = provider.icon;

                  return (
                    <div key={provider.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <div>
                            <p className="font-medium">{provider.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {isLinked
                                ? `已关联 ${linkedAccount?.email || ''}`
                                : `通过 ${provider.name} 登录`
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isLinked ? (
                            <>
                              <Badge variant="secondary" className="text-green-600 bg-green-50 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                已关联
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUnlinkAccount(linkedAccount?.id)}
                              >
                                解除关联
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLinkSocial(provider.id as any)}
                            >
                              关联
                            </Button>
                          )}
                        </div>
                      </div>
                      {index < socialProviders.length - 1 && <Separator className="mt-4" />}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* 快捷导航 */}
          <Card>
            <CardHeader>
              <CardTitle>快捷导航</CardTitle>
              <CardDescription>
                访问其他设置页面
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  应用设置
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回仪表板
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 