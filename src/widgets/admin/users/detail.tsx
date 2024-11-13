"use client"
import { getUser, User } from "@/entities"
import { AdminAppShell, UserChangePassword } from "@/features"
import { AppButton, ContentInfo, DateTime } from "@/shared"
import { Flex, List, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCheck, IconX } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const UserDetailWidget = () => {
    const t = useTranslations()
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<User>()
    const [opened, { toggle }] = useDisclosure()

    const fetchUsers = async () => {
        const res = await getUser(id)
        setData(res)
    }

    const content = [
        { label: t("table.id"), value: `${data?.id}` },
        { label: t("table.enabled"), value: data?.enabled ? <IconCheck size={34} color="green" /> : <IconX size={34} color="orange" /> },
        { label: t("table.name"), value: data?.name },
        { label: t("table.surname"), value: data?.surname },
        { label: t("table.patronymic"), value: data?.patronymic },
        { label: t("table.login"), value: data?.login },
        { label: t("table.role"), value: data?.role.title },
        { label: t("table.dateOfBirth"), value: data?.dateOfBirth ? DateTime.Format(data?.dateOfBirth, "DD.MM.YYYY") : "" },
        {
            label: t("table.roles"),
            value: <List>
                {data?.roles?.map(el => (
                    <List.Item key={el.id}>
                        {el.title}
                    </List.Item>
                ))}
            </List>
        },
    ]


    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <AdminAppShell pageTitle={t("table.titles.detail-users")}>
            <Flex justify="end">
                <AppButton onClick={toggle} variant="sorting">
                    {t("button.change-password")}
                </AppButton>
            </Flex>
            {content && <ContentInfo data={content} />}
            {data?.id &&
                <UserChangePassword
                    opened={opened}
                    userId={data?.id}
                    toggle={toggle} />}
        </AdminAppShell>
    )
}
