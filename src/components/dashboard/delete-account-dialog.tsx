"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icons } from "@/components/icons";
import { toast } from "sonner";

interface DeleteAccountDialogProps {
  children: React.ReactNode;
  userEmail: string;
}

export function DeleteAccountDialog({ children, userEmail }: DeleteAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);
  const [accountStatus, setAccountStatus] = useState<any>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  // 表单状态
  const [confirmationText, setConfirmationText] = useState("");
  const [reason, setReason] = useState("");
  const [hasExportedData, setHasExportedData] = useState(false);
  const [acknowledgeConsequences, setAcknowledgeConsequences] = useState(false);
  const [acknowledgeSubscription, setAcknowledgeSubscription] = useState(false);
  const [acknowledgeNoRecovery, setAcknowledgeNoRecovery] = useState(false);
  const [deletionType, setDeletionType] = useState<"soft" | "hard" | "scheduled">("soft");

  // 获取账户状态
  const fetchAccountStatus = async () => {
    if (!isOpen) return;

    setIsLoadingStatus(true);
    try {
      const response = await fetch("/api/user/account-status");
      if (response.ok) {
        const status = await response.json();
        setAccountStatus(status);
      }
    } catch (error) {
      console.error("获取账户状态失败:", error);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAccountStatus();
    }
  }, [isOpen]);

  const resetForm = () => {
    setStep(1);
    setConfirmationText("");
    setReason("");
    setHasExportedData(false);
    setAcknowledgeConsequences(false);
    setAcknowledgeSubscription(false);
    setAcknowledgeNoRecovery(false);
    setShowFinalConfirm(false);
    setAccountStatus(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(resetForm, 300); // 延迟重置，等待动画完成
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/user/export-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("导出失败");
      }

      // 创建下载链接
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${userEmail.replace('@', '_at_')}_data_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setHasExportedData(true);
      toast.success("数据导出成功");
    } catch (error) {
      toast.error("导出数据失败，请重试");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch("/api/user/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirmationText,
          reason,
          exportData: hasExportedData,
          deletionType,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "删除失败");
      }

      toast.success("账户删除成功，即将跳转到首页");

      // 延迟跳转，让用户看到成功消息
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (error: any) {
      toast.error(error.message || "删除失败，请重试");
    } finally {
      setIsDeleting(false);
      setShowFinalConfirm(false);
    }
  };

  const canProceedToStep2 = acknowledgeConsequences && acknowledgeSubscription && acknowledgeNoRecovery;
  const canProceedToStep3 = confirmationText === "DELETE" && reason.trim().length >= 5;

  const progressValue = (step / 3) * 100;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">删除账户</DialogTitle>
            <DialogDescription>
              此操作将永久删除您的账户和所有相关数据。请仔细阅读以下信息。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* 进度条 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>步骤 {step} / 3</span>
                <span>{Math.round(progressValue)}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>

            {/* 步骤 1: 了解后果 */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">了解删除后果</h3>

                {/* 账户状态概览 */}
                {isLoadingStatus ? (
                  <div className="flex items-center justify-center p-4">
                    <Icons.spinner className="h-6 w-6 animate-spin mr-2" />
                    <span>正在加载账户信息...</span>
                  </div>
                ) : accountStatus && (
                  <div className="rounded-lg border p-4 space-y-3">
                    <h4 className="font-medium">您的账户概览</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">账户年龄：</span>
                        <span className="ml-2">{accountStatus.user.accountAge} 天</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">关联账户：</span>
                        <span className="ml-2">{accountStatus.connections.linkedAccounts} 个</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">活跃会话：</span>
                        <span className="ml-2">{accountStatus.connections.activeSessions} 个</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">订阅状态：</span>
                        <span className="ml-2">
                          {accountStatus.billing.activeSubscriptions > 0 ?
                            `${accountStatus.billing.activeSubscriptions} 个活跃` :
                            "无活跃订阅"
                          }
                        </span>
                      </div>
                    </div>

                    {accountStatus.riskFactors.hasActiveSubscriptions && (
                      <Alert className="border-amber-200 bg-amber-50">
                        <Icons.alertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800">
                          您有 {accountStatus.billing.activeSubscriptions} 个活跃订阅，删除账户将自动取消这些订阅。
                        </AlertDescription>
                      </Alert>
                    )}

                    {accountStatus.billing.totalSpent > 0 && (
                      <Alert className="border-blue-200 bg-blue-50">
                        <Icons.alertTriangle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          您的历史消费总额为 ${accountStatus.billing.totalSpent.toFixed(2)}，删除账户后将无法访问相关服务。
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                <Alert className="border-destructive/50">
                  <Icons.alertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    删除账户将会：
                    <ul className="mt-2 list-disc list-inside space-y-1">
                      <li>永久删除您的个人资料和账户信息</li>
                      <li>取消所有活跃的订阅和付费服务</li>
                      <li>删除所有关联的社交登录账户</li>
                      <li>清除所有会话和登录记录</li>
                      <li>删除在 Stripe 中的客户记录</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consequences"
                      checked={acknowledgeConsequences}
                      onCheckedChange={(checked) => setAcknowledgeConsequences(checked === true)}
                    />
                    <Label htmlFor="consequences" className="text-sm leading-5">
                      我了解删除账户的所有后果，包括数据丢失和服务中断
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="subscription"
                      checked={acknowledgeSubscription}
                      onCheckedChange={(checked) => setAcknowledgeSubscription(checked === true)}
                    />
                    <Label htmlFor="subscription" className="text-sm leading-5">
                      我了解所有付费订阅将被取消，且不会获得退款
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="recovery"
                      checked={acknowledgeNoRecovery}
                      onCheckedChange={(checked) => setAcknowledgeNoRecovery(checked === true)}
                    />
                    <Label htmlFor="recovery" className="text-sm leading-5">
                      我了解此操作无法撤销，账户删除后无法恢复
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* 步骤 2: 数据导出和确认 */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">数据导出和确认</h3>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4 space-y-3">
                    <h4 className="font-medium">导出您的数据（可选）</h4>
                    <p className="text-sm text-muted-foreground">
                      在删除账户前，您可以导出个人数据副本，包括基本资料、关联账户和活动记录。
                    </p>
                    <Button
                      onClick={handleExportData}
                      disabled={isExporting}
                      variant="outline"
                      className="w-full"
                    >
                      {isExporting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                      {isExporting ? "导出中..." : hasExportedData ? "重新导出数据" : "导出我的数据"}
                    </Button>
                    {hasExportedData && (
                      <p className="text-sm text-green-600">✓ 数据已成功导出</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmation">
                      请输入 <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">DELETE</code> 确认删除
                    </Label>
                    <Input
                      id="confirmation"
                      value={confirmationText}
                      onChange={(e) => setConfirmationText(e.target.value)}
                      placeholder="输入 DELETE"
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">删除原因（必填，至少5个字符）</Label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="请告诉我们您删除账户的原因，这将帮助我们改进服务..."
                      rows={3}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {reason.trim().length < 5 && reason.trim().length > 0 && (
                          <span className="text-destructive">至少需要5个字符</span>
                        )}
                      </span>
                      <span>{reason.length}/500</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 步骤 3: 最终确认 */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">最终确认</h3>

                <Alert className="border-destructive">
                  <Icons.alertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>最后警告：</strong>点击&quot;永久删除账户&quot;按钮后，您的账户 <strong>{userEmail}</strong> 将被立即永久删除，此操作无法撤销。
                  </AlertDescription>
                </Alert>

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <h4 className="font-medium">删除摘要：</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 账户：{userEmail}</li>
                    <li>• 确认文本：{confirmationText}</li>
                    <li>• 数据导出：{hasExportedData ? "已导出" : "未导出"}</li>
                    <li>• 删除原因：{reason.substring(0, 50)}{reason.length > 50 ? "..." : ""}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClose}>
              取消
            </Button>

            <div className="flex gap-2">
              {step > 1 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  上一步
                </Button>
              )}

              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !canProceedToStep2 : !canProceedToStep3}
                  variant="destructive"
                >
                  下一步
                </Button>
              ) : (
                <Button
                  onClick={() => setShowFinalConfirm(true)}
                  variant="destructive"
                  disabled={!canProceedToStep3}
                >
                  永久删除账户
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 最终确认对话框 */}
      <AlertDialog open={showFinalConfirm} onOpenChange={setShowFinalConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除账户？</AlertDialogTitle>
            <AlertDialogDescription>
              这是最后一次确认。点击&quot;确认删除&quot;后，您的账户将被立即永久删除。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {isDeleting ? "删除中..." : "确认删除"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 