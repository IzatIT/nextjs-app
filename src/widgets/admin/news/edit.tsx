"use client"
import { getNews, News } from "@/entities"
import { AdminAppShell, NewsFormFeature } from "@/features"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const NewsEditWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<News>()

    const fetchNews = async () => {
        const res = await getNews(id)
        setData(res)
    }

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-news")}>
            {data && <NewsFormFeature data={data} />}
        </AdminAppShell>
    )
}
