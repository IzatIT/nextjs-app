"use client"
import { getSocialLink, SocialLink } from "@/entities"
import { AdminAppShell, SocialLinkFormFeature } from "@/features"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const SocialLinkEditWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<SocialLink>()

    const fetchData = async () => {
        const res = await getSocialLink(id)
        setData(res)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-social_link")}>
            {data && <SocialLinkFormFeature data={data} />}
        </AdminAppShell>
    )
}
