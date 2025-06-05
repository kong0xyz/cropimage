'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Copy, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterShareButton,
    XIcon
} from "react-share";
import { toast } from "sonner";

export default function SocialShares({ url }: Readonly<{ url?: string }>) {
    const t = useTranslations('common.share');
    const round = true;
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // 获取当前分享URL
    const getCurrentUrl = () => {
        if (url) return url;
        if (typeof window !== 'undefined') {
            return window.location.href;
        }
        return '';
    };

    // 复制到剪贴板（移动端兼容）
    const copyToClipboard = async () => {
        const currentUrl = getCurrentUrl();
        if (!currentUrl) return;

        try {
            // 现代浏览器API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(currentUrl);
                toast.success(t('copySuccess'));
                return;
            }
        } catch (error) {
            console.log('Modern clipboard API failed, trying fallback:', error);
        }

        try {
            // 降级处理 - 对移动端更友好
            const textArea = document.createElement('textarea');
            textArea.value = currentUrl;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            textArea.style.top = '-9999px';
            textArea.style.opacity = '0';
            textArea.setAttribute('readonly', '');
            document.body.appendChild(textArea);

            // 移动端需要特殊处理焦点
            textArea.focus();
            textArea.setSelectionRange(0, currentUrl.length);

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                toast.success(t('copySuccess'));
            } else {
                throw new Error('Copy command failed');
            }
        } catch (error) {
            console.log('Fallback copy failed:', error);
            // 最后的降级：显示URL让用户手动复制
            toast.error(t('copyFailed') || 'Copy failed. URL: ' + currentUrl);
        }
    };

    // 自定义分享按钮，在点击时获取最新URL
    const ShareButton = ({
        ShareComponent,
        icon,
        label,
        className = "w-full"
    }: {
        ShareComponent: any;
        icon: React.ReactNode;
        label: string;
        className?: string;
    }) => {
        return (
            <ShareComponent url={getCurrentUrl()} className={className}>
                <div className={shareButtonStyles}>
                    {icon}
                    <span className="text-xs">{label}</span>
                </div>
            </ShareComponent>
        );
    };

    // shadcn ui outline button 样式
    const shareButtonStyles = "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 flex items-center gap-2 p-2 rounded-md w-full transition-all cursor-pointer text-sm font-medium";

    // 在客户端水合完成之前，显示占位符
    if (!isClient) {
        return (
            <div className="flex justify-end">
                <Button variant="outline" size="sm" disabled>
                    <Share2 className="w-4 h-4 mr-2" />
                    {t('button')}
                </Button>
            </div>
        );
    }

    return (
        <div className="flex justify-end">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="transition-none" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        {t('button')}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="center">
                    <div className="space-y-3">
                        <div className="text-sm font-medium text-foreground">{t('title')}</div>

                        {/* 分享按钮组 */}
                        <div className="grid grid-cols-2 gap-2">

                            <ShareButton
                                ShareComponent={FacebookShareButton}
                                icon={<FacebookIcon size={16} round={round} />}
                                label={t('facebook')}
                            />

                            <ShareButton
                                ShareComponent={TwitterShareButton}
                                icon={<XIcon size={16} round={round} />}
                                label={t('twitter')}
                            />

                            <ShareButton
                                ShareComponent={LinkedinShareButton}
                                icon={<LinkedinIcon size={16} round={round} />}
                                label={t('linkedin')}
                            />

                            <ShareButton
                                ShareComponent={RedditShareButton}
                                icon={<RedditIcon size={16} round={round} />}
                                label={t('reddit')}
                            />

                            <ShareButton
                                ShareComponent={EmailShareButton}
                                icon={<EmailIcon size={16} round={round} />}
                                label={t('email')}
                            />
                        </div>

                        <div className="text-sm font-medium text-foreground">{t('copyLink')}</div>
                        {/* 可见链接地址和复制按钮 */}
                        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md border">
                            <div className="flex-1 text-xs text-muted-foreground font-mono truncate max-w-48">
                                {getCurrentUrl()}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyToClipboard}
                                className="shrink-0 h-6 w-6 p-0"
                                title={t('copyLink')}
                            >
                                <Copy className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}