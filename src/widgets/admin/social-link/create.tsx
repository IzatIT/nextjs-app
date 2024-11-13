"use client"
import { AdminAppShell, SocialLinkFormFeature } from "@/features"
import { useTranslations } from "next-intl"

export const SocialLinkCreateWidget = () => {
    const t = useTranslations()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-social_link")}>
            <SocialLinkFormFeature />
        </AdminAppShell>
    )
}
