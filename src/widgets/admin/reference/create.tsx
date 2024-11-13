"use client"
import { AdminAppShell, ReferenceFormFeature } from "@/features"
import { useTranslations } from "next-intl"

export const ReferenceCreateWidget = () => {
    const t = useTranslations()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-reference")}>
            <ReferenceFormFeature />
        </AdminAppShell>
    )
}
