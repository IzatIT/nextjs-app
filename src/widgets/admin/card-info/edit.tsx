"use client"
import { CardInfo, getCardInfo } from "@/entities"
import { AdminAppShell, CardInfoFormFeature } from "@/features"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const CardInfoEditWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<CardInfo>()

    const fetchCards = async () => {
        const res = await getCardInfo(id)
        setData(res)
    }

    useEffect(() => {
        fetchCards()
    }, [])
    return (
        <AdminAppShell pageTitle={t("table.titles.edit-card_info")}>
            {data && <CardInfoFormFeature data={data} />}
        </AdminAppShell>
    )
}
