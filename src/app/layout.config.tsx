import { fumadocsI18n } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions = (locale: string): BaseLayoutProps => {
  return {
    i18n: fumadocsI18n,
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <img
            src={siteConfig.logo}
            width={32}
            height={32}
            className="w-8"
            alt={siteConfig.name}
          />
          <span className="text-lg font-semibold">{siteConfig.name}</span>
        </div>
      ),
    },
  };
};
