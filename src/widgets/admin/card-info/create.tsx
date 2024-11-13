import { AdminAppShell, CardInfoFormFeature } from "@/features"
import { useTranslations } from "next-intl"

export const CardInfoCreateWidget = () => {
    const t = useTranslations()
    return (
        <AdminAppShell pageTitle={t("table.titles.create-card_info")}>
            <CardInfoFormFeature />
        </AdminAppShell>
    )
}
