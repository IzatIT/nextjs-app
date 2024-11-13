"use client"
import { getPage, Page } from "@/entities"
import { AdminAppShell, PageFormFeature } from "@/features"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const PageEditWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Page>()

    const fetchNews = async () => {
        const res = await getPage(id)
        setData(res)
    }

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-news")}>
            {data && <PageFormFeature data={data} />}
        </AdminAppShell>
    )
}
