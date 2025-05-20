'use client'

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { EmptyState } from "@/components/ui/empty-state"
import { Settings } from "lucide-react"
export const ComingSoon = () => {
    const t = useTranslations("common")
    const router = useRouter()

    return (
        <EmptyState
            icons={[Settings]}
            title={t("comingSoon.title")}
            description={t("comingSoon.description")}
            action={{
                label: t("comingSoon.action"),
                onClick: () => router.push("/")
            }
            }
        />
    )
}