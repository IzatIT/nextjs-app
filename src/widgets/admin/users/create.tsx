import { AdminAppShell, UserFormFeature } from "@/features"
import { useTranslations } from "next-intl"

export const UserCreateWidget = () => {
    const t = useTranslations()
    return (
        <AdminAppShell pageTitle={t("table.titles.create-users")}>
            <UserFormFeature />
        </AdminAppShell>
    )
}
