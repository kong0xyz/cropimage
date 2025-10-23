import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const SiteLogo = ({
  enableTitle = true,
  enableDescription = false,
}: {
  enableTitle?: boolean;
  enableDescription?: boolean;
}) => {
  const t = useTranslations("meta.global");
  return (
    <div className="flex flex-col justify-center gap-2">
      <Link href="/" aria-label="Go Home" className="flex items-center gap-2">
        <Image
          src={siteConfig.logo}
          alt={siteConfig.name}
          width={32}
          height={32}
          className="w-8 rounded-md"
        />
        {enableTitle && (
          <span className="text-2xl font-semibold">{siteConfig.name}</span>
        )}
      </Link>
      {enableDescription && (
        <span className="text-sm text-muted-foreground">
          {t("description")}
        </span>
      )}
    </div>
  );
};
