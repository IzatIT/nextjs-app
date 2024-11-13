"use client"
import { getReference, Reference } from "@/entities"
import { AdminAppShell, ReferenceFormFeature } from "@/features"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const ReferenceEditWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Reference>()

    const fetchNews = async () => {
        const res = await getReference(id)
        setData(res)
    }

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-reference")}>
            {data && <ReferenceFormFeature data={data} />}
        </AdminAppShell>
    )
}
