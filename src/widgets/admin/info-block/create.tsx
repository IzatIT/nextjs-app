"use client"
import { AdminAppShell, InfoBlockFormFeature } from "@/features"
import { useTranslations } from "next-intl"

export const InfoBlockCreateWidget = () => {
    const t = useTranslations()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-info_block")}>
            <InfoBlockFormFeature />
        </AdminAppShell>
    )
}
