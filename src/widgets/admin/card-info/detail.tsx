"use client"
import { AttachmentPath, CardInfo, getCardInfo } from "@/entities"
import { AdminAppShell } from "@/features"
import { AppButton, AppModal, Content, ContentInfo } from "@/shared"
import { Flex, List, Table } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCheck, IconX } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const CardInfoDetailWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [openedImageView, { toggle: toggleImageView }] = useDisclosure()
    const [data, setData] = useState<CardInfo>()
    const router = useRouter()
    const fetchUsers = async () => {
        const res = await getCardInfo(id)
        setData(res)
    }

    const photoUrl = data?.attachment?.id ?
        AttachmentPath.GetAttachmentUrl(data?.attachment.id, data?.attachment.uuid)
        : "/static/images/human.jpg"


    const handleClickEdit = () => {
        router.push(`${id}/edit`)
    }


    const content = [
        { label: t("table.id"), value: `${data?.id}` },
        { label: t("table.type"), value: Content.GetTitleByLanguage(data?.type) },
        { label: t("table.order"), value: data?.order },
        { label: t("table.active"), value: data?.active ? <IconCheck size={34} color="green" /> : <IconX size={34} color="orange" /> },
        { label: t("table.fullname"), value: data?.fullName },
        { label: t("table.email"), value: data?.email },
        { label: t("table.phone"), value: data?.phone },
        { label: t("table.positionKg"), value: data?.positionKg },
        { label: t("table.positionRu"), value: data?.positionRu },
        { label: t("table.positionEn"), value: data?.positionEn },
        { label: t("table.shortBiographyKg"), value: Content.HtmlRender(data?.shortBiographyKg) },
        { label: t("table.shortBiographyRu"), value: Content.HtmlRender(data?.shortBiographyRu) },
        { label: t("table.shortBiographyEn"), value: Content.HtmlRender(data?.shortBiographyEn) },
        { label: t("table.awardsKg"), value: Content.HtmlRender(data?.awardsKg) },
        { label: t("table.awardsRu"), value: Content.HtmlRender(data?.awardsRu) },
        { label: t("table.awardsEn"), value: Content.HtmlRender(data?.awardsEn) },
        {
            label: t("table.photo"),
            value: <Image
                onClick={toggleImageView}
                width={110} height={150}
                style={{ objectFit: "contain", cursor: "pointer" }}
                src={photoUrl} alt="" />
        },
        {
            label: t("table.laborActivity"), value: <List>
                {data?.laborActivities?.map(el => (
                    <List.Item my={15} key={el.order}>
                        <Table border={1} borderColor="gray">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th lh={1}>
                                        {t("table.order")}
                                    </Table.Th>
                                    <Table.Th>
                                        {t("table.year")}
                                    </Table.Th>
                                    <Table.Th>
                                        {t("table.titleKg")}
                                    </Table.Th>

                                    <Table.Th>
                                        {t("table.titleRu")}
                                    </Table.Th>
                                    <Table.Th>
                                        {t("table.titleEn")}
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>
                                        {el.order}
                                    </Table.Td>
                                    <Table.Td>
                                        {el.year}
                                    </Table.Td>
                                    <Table.Td>
                                        {el.titleKg}
                                    </Table.Td>

                                    <Table.Td>
                                        {el.titleRu}
                                    </Table.Td>
                                    <Table.Td>
                                        {el.titleEn}
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </List.Item>
                ))}
            </List>
        },
    ]


    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-card_info")}>
                <Flex justify="end">
                    <AppButton onClick={handleClickEdit} variant="sorting">
                        {t("button.edit")}
                    </AppButton>
                </Flex>
                {content && <ContentInfo data={content} />}
            </AdminAppShell>
            <AppModal opened={openedImageView} toggle={toggleImageView} closeOnClickOutside>
                <img
                    width="100%"
                    height="auto" style={{ objectFit: "contain" }}
                    src={photoUrl} alt="" />
            </AppModal>
        </>
    )
}
