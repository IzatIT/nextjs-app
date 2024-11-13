"use client"
import { getReference, Reference } from "@/entities"
import { AdminAppShell } from "@/features"
import { AppButton, ContentInfo } from "@/shared"
import { Flex } from "@mantine/core"
import { IconCheck, IconX } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const ReferenceDetailWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Reference>()
    const router = useRouter()

    const fetchUsers = async () => {
        const res = await getReference(id)
        setData(res)
    }

    const handleClickEdit = () => {
        router.push(`${id}/edit`)
    }

    const content = [
        { label: t("table.id"), value: `${data?.id}` },
        { label: t("table.enabled"), value: data?.enabled ? <IconCheck size={34} color="green" /> : <IconX size={34} color="orange" /> },
        { label: t("table.titleKg"), value: data?.titleKg },
        { label: t("table.titleRu"), value: data?.titleRu },
        { label: t("table.titleEn"), value: data?.titleEn },
        { label: t("table.parentTitleKg"), value: data?.parent?.titleKg },
        { label: t("table.parentTitleRu"), value: data?.parent?.titleRu },
        { label: t("table.parentTitleEn"), value: data?.parent?.titleEn },
    ]

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-reference")}>
                <Flex justify="end">
                    <AppButton onClick={handleClickEdit} variant="sorting">
                        {t("button.edit")}
                    </AppButton>
                </Flex>
                {content && <ContentInfo data={content} />}
            </AdminAppShell>
        </>
    )
}
