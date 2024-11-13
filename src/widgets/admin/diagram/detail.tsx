"use client"
import { Diagram, getDiagram } from "@/entities"
import { AdminAppShell } from "@/features"
import { AppButton, Content, ContentInfo, DateTime } from "@/shared"
import { Divider, Flex, Grid, List, Table, Text } from "@mantine/core"
import { useLocale, useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const DiagramDetailWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Diagram>()
    const router = useRouter()
    const locale = useLocale()
    const fetchUsers = async () => {
        const res = await getDiagram(id)
        setData(res)
    }

    const handleClickEdit = () => {
        router.push(`${id}/edit`)
    }

    const content = [
        {
            label: t("table.id"),
            value: `${data?.id}`
        },
        {
            label: t("table.type"),
            value: Content.GetTitleByLanguage(data?.type, locale)
        },
        {
            label: t("table.type"),
            value: Content.GetTitleByLanguage(data?.category, locale)
        },
        {
            label: t("table.year"),
            value: data?.year
        },
        {
            label: t("table.quarter"),
            value: data?.quarter
        },
        {
            label: t("table.dateFrom"),
            value: DateTime.Format(data?.dateFrom, "DD.MM.YYYY")
        },
        {
            label: t("table.dateTo"),
            value: DateTime.Format(data?.dateTo, "DD.MM.YYYY")
        },
        {
            label: t("table.order"),
            value: data?.order
        },
        {
            label: t("table.titleKg"),
            value: data?.titleKg
        },
        {
            label: t("table.titleRu"),
            value: data?.titleRu
        },
        {
            label: t("table.titleEn"),
            value: data?.titleEn
        },
        {
            label: t("table.contentKg"),
            value: data?.contentKg
        },
        {
            label: t("table.contentRu"),
            value: data?.contentRu
        },
        {
            label: t("table.contentEn"),
            value: data?.contentEn
        },
        {
            label: t("table.descriptionKg"),
            value: Content.HtmlRender(data?.descriptionKg)
        },
        {
            label: t("table.descriptionRu"),
            value: Content.HtmlRender(data?.descriptionRu)
        },
        {
            label: t("table.descriptionEn"),
            value: Content.HtmlRender(data?.descriptionEn)
        },
        {
            value: <List spacing={10}>
                {data?.fields?.map(field => (
                    <List.Item key={field.id}>
                        <Table border={1} borderColor="gray">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th lh={1}>
                                        {t("table.order")}
                                    </Table.Th>
                                    <Table.Th>
                                        {t("table.type")}
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
                                    <Table.Th>
                                        {t("table.value")}
                                    </Table.Th>
                                    <Table.Th>
                                        {t("table.values")}
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>
                                        {field.order}
                                    </Table.Td>
                                    <Table.Td>
                                        {Content.GetTitleByLanguage(field.type, locale)}
                                    </Table.Td>
                                    <Table.Td>
                                        {field.titleKg}
                                    </Table.Td>
                                    <Table.Td>
                                        {field.titleRu}
                                    </Table.Td>
                                    <Table.Td>
                                        {field.titleEn}
                                    </Table.Td>
                                    <Table.Td>
                                        {field.value}
                                    </Table.Td>
                                    <Table.Td>
                                        {field.values?.map(value => (
                                            <Flex direction="column" gap={5} key={value.id}>
                                                <div>{value.order}</div>
                                                <Text fz={16}>{t("table.title")}: {Content.GetTitleByLanguage(value, locale)}</Text>
                                                <div>{t("table.year")}:  {value.year}</div>
                                                <div>{t("table.value")}: {value.value}</div>
                                                <div>{t("table.quarter")}: {value?.quarter}</div>
                                                <div>{t("table.date")}: {DateTime.Format(value.dateFrom, "DD.MM.YY")} - {DateTime.Format(value.dateTo, "DD.MM.YY")}</div>
                                                <Divider w="100%" color="green" />
                                            </Flex>
                                        ))}
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
            <AdminAppShell pageTitle={t("table.titles.detail-diagram")}>
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
