'use client';

interface TocLinkProps {
    href: string;
    children: React.ReactNode;
    depth: number;
}

export function TocLink({ href, children, depth }: TocLinkProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            // 更新 URL 而不刷新页面
            window.history.pushState(null, '', href);
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className="block text-sm text-muted-foreground hover:text-foreground"
            style={{ paddingLeft: `${(depth - 1) * 12}px` }}
        >
            {children}
        </a>
    );
} 