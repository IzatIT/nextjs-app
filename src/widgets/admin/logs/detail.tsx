"use client"
import Scroll from "@/app/[locale]/scroll"
import { getLogs, LogsGetResponse } from "@/entities"
import { AdminAppShell } from "@/features"
import { ContentInfo } from "@/shared"
import { Flex, List, ScrollArea, Text, Title } from "@mantine/core"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const LogsDetailWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<LogsGetResponse>()
    const parsedRequest = JSON.parse(data?.request || "{}")
    const parsedResponse = JSON.parse(data?.response || "{}")
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getLogs(id)
            setData(res)
        }
        fetchUsers()
    }, [id])

    const renderListItems = (items: any) =>
        Object.keys(items).map(key => (
            <List.Item key={key}>
                <Flex align="center" gap={10}>
                    <Title fz={16}>{key}:</Title>
                    <Text fz={12} style={{ wordWrap: "break-word" }} >
                        {items[key]}
                    </Text>
                </Flex>
            </List.Item>
        ))

    const content = [
        { label: t("table.date"), value: data?.date },
        { label: t("table.client"), value: data?.client },
        { label: t("table.method"), value: data?.method },
        { label: t("table.clientIp"), value: data?.clientIp },
        { label: t("table.url"), value: data?.url },
        {
            label: t("table.request"),
            value: (
                <List style={{ overflowX: "scroll" }}>
                    {Array.isArray(parsedRequest)
                        ? parsedRequest.map(renderListItems)
                        : renderListItems(parsedRequest)
                    }
                </List>
            )
        },
        {
            label: t("table.response"),
            value: (
                <List style={{ overflowX: "scroll" }} w="100%">
                    {Array.isArray(parsedResponse)
                        ? parsedResponse.map(renderListItems)
                        : renderListItems(parsedResponse)
                    }
                </List>
            )
        }
    ]

    return (
        <AdminAppShell pageTitle={t("table.titles.detail-logs")}>
            <ContentInfo data={content} />
        </AdminAppShell>
    )
}
