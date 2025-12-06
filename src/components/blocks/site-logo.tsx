import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// 内部Logo内容组件
const LogoContent = ({
  enableTitle,
  variant,
}: {
  enableTitle: boolean;
  variant: "default" | "compact";
}) => (
  <>
    <img
      src={siteConfig.logo}
      alt={siteConfig.name}
      className={cn("rounded-md", variant === "default" ? "w-8" : "w-6")}
    />
    {enableTitle && (
      <span
        className={cn(
          "font-medium",
          variant === "default" ? "text-xl" : "text-base"
        )}
      >
        {siteConfig.name}
      </span>
    )}
  </>
);

export const SiteLogo = ({
  enableTitle = true,
  enableDescription = false,
  variant = "default",
  isLink = true,
}: {
  enableTitle?: boolean;
  enableDescription?: boolean;
  variant?: "default" | "compact";
  isLink?: boolean;
}) => {
  const t = useTranslations("meta.global");

  return (
    <div className="flex flex-col justify-center gap-2">
      {isLink ? (
        <Link href="/" aria-label="Go Home" className="flex items-center gap-2">
          <LogoContent enableTitle={enableTitle} variant={variant} />
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <LogoContent enableTitle={enableTitle} variant={variant} />
        </div>
      )}
      {enableDescription && (
        <span className="text-sm text-muted-foreground">
          {t("description")}
        </span>
      )}
    </div>
  );
};
