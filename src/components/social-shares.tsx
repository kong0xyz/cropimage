import Link from "next/link";
import { DiscordIcon } from "./icons";
import { siteConfig } from "@/config/site";
import { MailIcon } from "lucide-react";

export default function SocialShares() {
    return (
        <div className="flex flex-row space-x-2 items-center">
            <Link
                target="_blank"
                aria-label="Discord"
                href={siteConfig.links.discord}
            >
                <DiscordIcon size={24} className="text-default-500 hover:scale-110 transition-all" />
            </Link>

            <Link
                target="_blank"
                aria-label="Email"
                href={`mailto:${siteConfig.author.email}`}
            >
                <MailIcon size={20} className="text-default-500 hover:scale-110 transition-all" />
            </Link>
        </div>
    );
}