"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useSession } from "@/lib/auth-client";
import { AlertTriangleIcon } from "lucide-react";

export function EmailVerificationCard() {
  const { data: session } = useSession();

  // 如果用户未登录或邮箱已验证，不显示组件
  if (!session || session.user.emailVerified) {
    return null;
  }

  return (
    <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      <AlertDescription className="flex items-center justify-between">
        <span className="text-amber-800 dark:text-amber-200 flex gap-2 items-center">
          <AlertTriangleIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          您的邮箱尚未验证，请前往设置页面完成验证以确保账户安全
        </span>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="ml-4 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900"
        >
          <Link href="/dashboard/profile">
            前往验证
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
} 