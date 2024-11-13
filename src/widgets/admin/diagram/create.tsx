"use client"
import { AdminAppShell, DiagramFormFeature } from "@/features"
import { useTranslations } from "next-intl"

export const DiagramCreateWidget = () => {
    const t = useTranslations()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-diagram")}>
            <DiagramFormFeature />
        </AdminAppShell>
    )
}
