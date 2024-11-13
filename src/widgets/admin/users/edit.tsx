"use client"
import { getUser, User } from "@/entities"
import { AdminAppShell, UserFormFeature } from "@/features"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const UserEditWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<User>()

    const fetchUsers = async () => {
        const res = await getUser(id)
        setData(res)
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <AdminAppShell pageTitle={t("table.titles.edit-users")}>
            {data && <UserFormFeature data={data} />}
        </AdminAppShell>
    )
}
