"use client"
import { Diagram, getDiagram } from "@/entities"
import { AdminAppShell, DiagramFormFeature } from "@/features"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const DiagramEditWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Diagram>()

    const fetchData = async () => {
        const res = await getDiagram(id)
        setData(res)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AdminAppShell pageTitle={t("table.titles.edit-diagram")}>
            {data && <DiagramFormFeature data={data} />}
        </AdminAppShell>
    )
}
