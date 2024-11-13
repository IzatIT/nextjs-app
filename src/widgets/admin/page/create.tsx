"use client"
import { AdminAppShell, PageFormFeature } from "@/features"
import { useTranslations } from "next-intl"

export const PageCreateWidget = () => {
    const t = useTranslations()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-page")}>
            <PageFormFeature />
        </AdminAppShell>
    )
}
