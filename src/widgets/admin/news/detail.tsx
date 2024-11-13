"use client"
import { Attachment, AttachmentPath, getNews, News } from "@/entities"
import { AdminAppShell } from "@/features"
import { AppAudioPlayer, AppButton, AppIframe, AppModal, Content, ContentInfo, DateTime } from "@/shared"
import { Box, Flex, Image, List } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCheck, IconX } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const NewsDetailWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [openedFileView, { toggle: toggleFileView }] = useDisclosure()
    const [data, setData] = useState<News>()
    const [activeImageData, setActiveImageData] = useState<Attachment>()
    const router = useRouter()

    useEffect(() => {
        const fetchNews = async () => {
            const res = await getNews(id)
            setData(res)
        }
        fetchNews()
    }, [id])

    const handleClickEdit = () => router.push(`${id}/edit`)

    const handleClickFileView = (file: Attachment) => () => {
        setActiveImageData(file)
        toggleFileView()
    }

    const renderListItems = (items: any[]) => (
        <List>
            {items.map(el => (
                <List.Item key={el.id}>
                    {Content.GetTitleByLanguage(el)}
                </List.Item>
            ))}
        </List>
    )

    const renderAttachments = (attachments: Attachment[], type: "image" | "video" | "audio" | "file") => (
        <Flex wrap="wrap" gap={10}>
            {attachments.map(el => (
                <Box key={el.id} w={type === "image" ? 170 : 300} h={type === "image" ? 110 : 100}>
                    {type === "image" && (
                        <Image
                            onClick={handleClickFileView(el)}
                            width={150} height={110}
                            style={{ objectFit: "contain", cursor: "pointer" }}
                            src={AttachmentPath.GetAttachmentUrl(el.id, el.uuid)}
                            alt=""
                        />
                    )}
                    {type === "video" && (
                        <video
                            width={300} height={100} style={{ cursor: "pointer" }}
                            src={AttachmentPath.GetAttachmentUrl(el.id, el.uuid)}
                            onClick={handleClickFileView(el)}
                        />
                    )}
                    {type === "audio" && (
                        <AppAudioPlayer src={AttachmentPath.GetAttachmentUrl(el.id, el.uuid)} />
                    )}
                    {type === "file" && (
                        <AppIframe aspectRatio={3 / 4} width={150} src={AttachmentPath.GetAttachmentUrl(el.id, el.uuid)} />
                    )}
                </Box>
            ))}
        </Flex>
    )

    const getIcon = (value?: boolean) => value ? <IconCheck size={34} color="green" /> : <IconX size={34} color="orange" />


    const content = [
        { label: t("table.id"), value: data?.id },
        { label: t("table.active"), value: getIcon(data?.active) },
        { label: t("table.includedInMailing"), value: getIcon(data?.includedInMailing) },
        { label: t("table.isMain"), value: getIcon(data?.isMain) },
        { label: t("table.titleKg"), value: data?.titleKg },
        { label: t("table.titleRu"), value: data?.titleRu },
        { label: t("table.titleEn"), value: data?.titleEn },
        { label: t("table.contentKg"), value: Content.HtmlRender(data?.contentKg) },
        { label: t("table.contentRu"), value: Content.HtmlRender(data?.contentRu) },
        { label: t("table.contentEn"), value: Content.HtmlRender(data?.contentEn) },
        { label: t("table.publishedAt"), value: data?.publishedAt ? DateTime.Format(data.publishedAt, "HH:mm DD.MM.YYYY") : null },
        { label: t("table.plannedTo"), value: data?.plannedTo ? DateTime.Format(data.plannedTo, "HH:mm DD.MM.YYYY") : null },
        { label: t("table.region"), value: Content.GetTitleByLanguage(data?.region) },
        { label: t("table.countries"), value: renderListItems(data?.countries || []) },
        { label: t("table.categories"), value: renderListItems(data?.categories || []) },
        { label: t("table.tags"), value: renderListItems(data?.tags || []) },
        { label: t("table.audioAttachments"), value: renderAttachments(data?.audioAttachments || [], "audio") },
        { label: t("table.videoAttachments"), value: renderAttachments(data?.videoAttachments || [], "video") },
        { label: t("table.photoAttachments"), value: renderAttachments(data?.photoAttachments || [], "image") },
        { label: t("table.fileAttachmentsKg"), value: renderAttachments(data?.fileAttachmentsKg || [], "file") },
        { label: t("table.fileAttachmentsRu"), value: renderAttachments(data?.fileAttachmentsRu || [], "file") },
        { label: t("table.fileAttachmentsEn"), value: renderAttachments(data?.fileAttachmentsEn || [], "file") }
    ]

    const fileUrl = AttachmentPath.GetAttachmentUrl(activeImageData?.id, activeImageData?.uuid)

    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-news")}>
                <Flex justify="end">
                    <AppButton onClick={handleClickEdit} variant="sorting">
                        {t("button.edit")}
                    </AppButton>
                </Flex>
                {content && <ContentInfo data={content} />}
            </AdminAppShell>
            <AppModal opened={openedFileView} toggle={toggleFileView} closeOnClickOutside>
                {activeImageData?.type.includes("image") ? (
                    <Image width="100%" height="auto" style={{ objectFit: "contain" }} src={fileUrl} alt="" />
                ) : activeImageData?.type.includes("video") ? (
                    <video width="100%" height="auto" src={fileUrl} />
                ) : activeImageData?.type.includes("audio") ? (
                    <AppAudioPlayer src={fileUrl} />
                ) : (
                    <AppIframe aspectRatio={3 / 4} width="100%" src={fileUrl} />
                )}
            </AppModal>
        </>
    )
}
