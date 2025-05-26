import { Share2 } from "lucide-react";
import { useMemo } from "react";
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

export default function SocialShares({ url }: Readonly<{ url?: string }>) {
    const round = true;
    
    // 使用 useMemo 缓存 URL 计算，避免重复渲染
    const shareUrl = useMemo(() => {
        // 优先使用传入的 URL
        if (url) return url;
        
        // 客户端获取当前 URL
        if (typeof window !== 'undefined') {
            return window.location.href;
        }
        
        // SSR 时返回空字符串
        return '';
    }, [url]);

    // 如果没有有效的 URL，不渲染组件
    if (!shareUrl) {
        return null;
    }

    return (
        <div className="flex flex-row space-x-2 items-center justify-end container">
            <div className="flex flex-row space-x-2 items-center mx-2">
                <Share2 size={24} className="text-default-500 hover:scale-110 transition-all" />
            </div>
            <FacebookShareButton url={shareUrl} >
                <FacebookIcon size={32} round={round} className="text-default-500 hover:scale-110 transition-all" />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} >
                <XIcon size={32} round={round} className="text-default-500 hover:scale-110 transition-all" />
            </TwitterShareButton>
            <RedditShareButton url={shareUrl} >
                <RedditIcon size={32} round={round} className="text-default-500 hover:scale-110 transition-all" />
            </RedditShareButton>
            <LinkedinShareButton url={shareUrl} >
                <LinkedinIcon size={32} round={round} className="text-default-500 hover:scale-110 transition-all" />
            </LinkedinShareButton>
            <EmailShareButton url={shareUrl} >
                <EmailIcon size={32} round={round} className="text-default-500 hover:scale-110 transition-all" />
            </EmailShareButton>
        </div>
    );
}