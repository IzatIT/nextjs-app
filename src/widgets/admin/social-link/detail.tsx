"use client"
import { AttachmentPath, getSocialLink, SocialLink } from "@/entities"
import { AdminAppShell } from "@/features"
import { AppButton, AppModal, Content, ContentInfo } from "@/shared"
import { Box, Flex, Image } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const SocialLinkDetailWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [openedFileView, { toggle: toggleFileView }] = useDisclosure()
    const [data, setData] = useState<SocialLink>()
    const router = useRouter()

    const fetchUsers = async () => {
        const res = await getSocialLink(id)
        setData(res)
    }

    const handleClickEdit = () => {
        router.push(`${id}/edit`)
    }
    const fileUrl = AttachmentPath.GetAttachmentUrl(data?.photoAttachment?.id, data?.photoAttachment?.uuid)

    const content = [
        { label: t("table.id"), value: `${data?.id}` },
        { label: t("table.order"), value: data?.order },
        { label: t("table.titleKg"), value: data?.titleKg },
        { label: t("table.titleRu"), value: data?.titleRu },
        { label: t("table.titleEn"), value: data?.titleEn },
        { label: t("table.type"), value: Content.GetTitleByLanguage(data?.type) },
        { label: t("table.links"), value: data?.link },
        {
            label: t("table.photoAttachments"),
            value: <Box w={140} h={150}>
                <Image
                    onClick={toggleFileView}
                    width={110} height={150}
                    style={{ objectFit: "contain", cursor: "pointer" }}
                    src={fileUrl} alt="" />
            </Box>
        },
    ]

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-social_link")}>
                <Flex justify="end">
                    <AppButton onClick={handleClickEdit} variant="sorting">
                        {t("button.edit")}
                    </AppButton>
                </Flex>
                {content && <ContentInfo data={content} />}
            </AdminAppShell>
            <AppModal opened={openedFileView} toggle={toggleFileView} closeOnClickOutside>
                <Image
                    width="100%"
                    height="auto" style={{ objectFit: "contain" }}
                    src={fileUrl}
                    alt="" />
            </AppModal>
        </>
    )
}
