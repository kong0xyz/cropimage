"use client";

import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { Link } from "@/i18n/routing";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

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
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">请先登录</h1>
            <p className="text-muted-foreground mb-4">您需要登录才能访问仪表板</p>
            <Button asChild>
              <Link href="/sign-in">前往登录</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">仪表板</h1>
          <p className="text-muted-foreground">
            欢迎回来！这里是您的个人控制中心。
          </p>
        </div>
        <Button>
          <Icons.plus className="mr-2 h-4 w-4" />
          新建项目
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总项目数</CardTitle>
            <Icons.folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 较上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃项目</CardTitle>
            <Icons.activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +1 较上周
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">存储使用</CardTitle>
            <Icons.database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">
              80% of 3 GB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API 调用</CardTitle>
            <Icons.zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +180 较昨日
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>最近项目</CardTitle>
            <CardDescription>
              您最近创建或修改的项目
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "E-commerce 网站",
                  status: "进行中",
                  lastModified: "2 小时前",
                  type: "Web 应用",
                },
                {
                  name: "移动应用 API",
                  status: "已完成",
                  lastModified: "1 天前",
                  type: "API",
                },
                {
                  name: "数据分析仪表板",
                  status: "测试中",
                  lastModified: "3 天前",
                  type: "仪表板",
                },
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {project.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.type} · {project.lastModified}
                    </p>
                  </div>
                  <Badge variant={
                    project.status === "已完成" ? "default" :
                      project.status === "进行中" ? "secondary" :
                        "outline"
                  }>
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>快捷操作</CardTitle>
            <CardDescription>
              常用功能快速访问
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Icons.plus className="mr-2 h-4 w-4" />
              创建新项目
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icons.upload className="mr-2 h-4 w-4" />
              导入项目
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icons.settings className="mr-2 h-4 w-4" />
              账户设置
            </Button>
            <Separator />
            <Button variant="outline" className="w-full justify-start">
              <Icons.help className="mr-2 h-4 w-4" />
              帮助文档
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icons.messageCircle className="mr-2 h-4 w-4" />
              联系支持
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 