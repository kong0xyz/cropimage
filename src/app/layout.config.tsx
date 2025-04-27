import { siteConfig } from '@/config/site';
import { i18n } from '@/lib/fumadocs-i18n';
import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const baseOptions = (locale: string): BaseLayoutProps => {
    return {
        i18n,
        nav: {
            title: (
                <div className="flex items-center gap-2">
                    <Image src={siteConfig.logo} width={32} height={32} className="w-8"
                        alt={siteConfig.title} />
                    <span className="text-lg font-semibold">{siteConfig.name}</span>
                </div>
            ),
        },
    };
}