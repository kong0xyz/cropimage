import { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SubscriptionManager } from "@/components/pricing/subscription-manager";
import { SubscriptionDebug } from "@/components/pricing/subscription-debug";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { constructMetadata } from "@/lib/seoutils";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: "账单管理",
    description: "管理您的订阅计划和账单信息",
    pathname: "/dashboard/billing",
  });
}

export default function BillingPage() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <PageHeader
        title="账单管理"
        description="管理您的订阅计划、查看账单历史和更新付款方式"
      />
      
      <div className="mt-8">
        <Tabs defaultValue="billing" className="space-y-6">
          <TabsList>
            <TabsTrigger value="billing">订阅管理</TabsTrigger>
            <TabsTrigger value="debug">调试信息</TabsTrigger>
          </TabsList>
          
          <TabsContent value="billing">
            <SubscriptionManager />
          </TabsContent>
          
          <TabsContent value="debug">
            <SubscriptionDebug />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 