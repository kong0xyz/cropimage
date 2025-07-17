'use client'

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const fazier_launch_slug = process.env.NEXT_PUBLIC_FAZIER_LAUNCH_SLUG;
const startupfa_launch_slug = process.env.NEXT_PUBLIC_STARTUPFA_LAUNCH_SLUG;
const producthunt_launch_slug = process.env.NEXT_PUBLIC_PRODUCTHUNT_LAUNCH_SLUG;
const twelve_tools_launch_slug = process.env.NEXT_PUBLIC_TWELVE_TOOLS_LAUNCH_SLUG;
const turbo0_launch_slug = process.env.NEXT_PUBLIC_TURBO0_LAUNCH_SLUG;
const magicbox_tools_launch_slug = process.env.NEXT_PUBLIC_MAGICBOX_TOOLS_LAUNCH_SLUG;

export const PageBadges = ({ className }: { className?: string }) => {
    return (
        <div className={cn("container py-2 flex flex-row flex-wrap gap-4 justify-center items-center", className)}>
            {/* Fazier */}
            {
                fazier_launch_slug && (
                    <Link href={`https://fazier.com/launches/${fazier_launch_slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image src="https://fazier.com/api/v1/public/badges/embed_image.svg?launch_id=3167&badge_type=featured&template=true&theme=neutral"
                            width="156" height="32" alt={siteConfig.title}
                            className="d-inline-block rounded" />
                    </Link>
                )
            }

            {/* Startup Fame */}
            {
                startupfa_launch_slug && (
                    <Link href={`https://startupfa.me/s/${startupfa_launch_slug}?utm_source=${siteConfig.url}`}
                        target="_blank" className="rounded border py-1.5 px-2 bg-white" >
                        <Image src="https://startupfa.me/images/logo.svg" alt={siteConfig.title} width="128" height="32" />
                    </Link>
                )
            }

            {/* Product Hunt */}
            {
                producthunt_launch_slug && (
                    <Link
                        href={`https://www.producthunt.com/posts/${producthunt_launch_slug}?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=${siteConfig.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${producthunt_launch_slug}&theme=neutral&t=${Date.now()}`} alt={siteConfig.title}
                            width="156" height="32" />
                    </Link>
                )
            }

            {/* Twelve Tools */}
            {
                twelve_tools_launch_slug && (
                    <Link href="https://twelve.tools" target="_blank" rel="noopener noreferrer">
                        <Image src="https://twelve.tools/badge0-light.svg" alt="Featured on Twelve Tools" width="128" height="32" />
                    </Link>
                )
            }


            {/* Turbo0 */}
            {
                turbo0_launch_slug && (
                    <Link href={`https://turbo0.com/item/${turbo0_launch_slug}`} target="_blank" rel="noopener noreferrer">
                        <Image src="https://img.turbo0.com/badge-listed-light.svg" alt="Listed on Turbo0" width="128" height="32" />
                    </Link>
                )
            }

            {/* MagicBox.tools */}
            {
                magicbox_tools_launch_slug && (
                    <Link href={`https://magicbox.tools`} target="_blank" rel="noopener noreferrer">
                        <Image src="https://magicbox.tools/badge.svg" alt="Featured on MagicBox.tools" width="128" height="32" />
                    </Link>
                )
            }

        </div>
    );
};