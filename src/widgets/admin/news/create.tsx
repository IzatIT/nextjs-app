"use client"
import { AdminAppShell, NewsFormFeature } from "@/features"
import { useTranslations } from "next-intl"

export const NewsCreateWidget = () => {
    const t = useTranslations()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-news")}>
            <NewsFormFeature />
        </AdminAppShell>
    )
}
