"use client"
import { getInfoBlock, InfoBlock } from "@/entities"
import { AdminAppShell, InfoBlockFormFeature } from "@/features"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const InfoBlockEditWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<InfoBlock>()

    const fetchData = async () => {
        const res = await getInfoBlock(id)
        setData(res)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-info_block")}>
            {data && <InfoBlockFormFeature data={data} />}
        </AdminAppShell>
    )
}
