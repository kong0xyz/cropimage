import { metaConfig, siteConfig } from "@/config/site";
import Image from "next/image";

export const SiteLogo = ({ enableTitle = true, enableDescription = false }: { enableTitle?: boolean, enableDescription?: boolean }) => {
    return (
        <div className="flex flex-col gap-2">
            <a href={siteConfig.url} aria-label="Go Home" className="flex items-center gap-2">
                <Image src={siteConfig.logo} alt={siteConfig.name} width={32} height={32} className="w-8 rounded-md" />
                {enableTitle && <span className="text-lg font-semibold">{siteConfig.name}</span>}

            </a>
            {enableDescription && <span className="text-base text-muted-foreground">{metaConfig.description}</span>}
        </div>
    )
}