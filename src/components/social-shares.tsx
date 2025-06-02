'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link, Share2 } from "lucide-react";
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
    const [shareUrl, setShareUrl] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (url) {
            setShareUrl(url);
        } else if (typeof window !== 'undefined') {
            setShareUrl(window.location.href);
        }
    }, [url]);

    const copyToClipboard = async () => {
        if (!shareUrl) return;
        
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success(t('copySuccess'));
        } catch (error) {
            // 降级处理
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast.success(t('copySuccess'));
        }
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

    // 如果没有有效的 URL，禁用按钮
    if (!shareUrl) {
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
                    <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        {t('button')}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="end">
                    <div className="space-y-3">
                        <div className="text-sm font-medium text-foreground">{t('title')}</div>
                        {/* 分享按钮组 */}
                        <div className="grid grid-cols-2 gap-2">

                            <FacebookShareButton url={shareUrl} className="w-full">
                                <div className={shareButtonStyles}>
                                    <FacebookIcon size={16} round={round} />
                                    <span className="text-xs">{t('facebook')}</span>
                                </div>
                            </FacebookShareButton>

                            <TwitterShareButton url={shareUrl} className="w-full">
                                <div className={shareButtonStyles}>
                                    <XIcon size={16} round={round} />
                                    <span className="text-xs">{t('twitter')}</span>
                                </div>
                            </TwitterShareButton>

                            <LinkedinShareButton url={shareUrl} className="w-full">
                                <div className={shareButtonStyles}>
                                    <LinkedinIcon size={16} round={round} />
                                    <span className="text-xs">{t('linkedin')}</span>
                                </div>
                            </LinkedinShareButton>

                            <RedditShareButton url={shareUrl} className="w-full">
                                <div className={shareButtonStyles}>
                                    <RedditIcon size={16} round={round} />
                                    <span className="text-xs">{t('reddit')}</span>
                                </div>
                            </RedditShareButton>

                            <EmailShareButton url={shareUrl} className="w-full">
                                <div className={shareButtonStyles}>
                                    <EmailIcon size={16} round={round} />
                                    <span className="text-xs">{t('email')}</span>
                                </div>
                            </EmailShareButton>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={copyToClipboard}
                                className="w-full justify-start gap-2 h-auto p-2"
                            >
                                <Link className="w-4 h-4" />
                                <span className="text-xs">{t('copyLink')}</span>
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}