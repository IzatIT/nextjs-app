"use client"
import { getMyProfile, UserMe } from "@/entities"
import { AdminAppShell, UserChangePassword } from "@/features"
import { AppButton, ContentInfo } from "@/shared"
import { Flex, List } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export const ProfileInfoWidget = () => {
    const t = useTranslations()
    const [data, setData] = useState<UserMe>()
    const [opened, { toggle }] = useDisclosure()

    const fetchMyData = async () => {
        const res = await getMyProfile()
        setData(res)
    }

    const content = [
        {
            label: t("table.id"),
            value: data?.id
        },
        {
            label: t("table.name"),
            value: data?.name
        },
        {
            label: t("table.surname"),
            value: data?.surname
        },
        {
            label: t("table.patronymic"),
            value: data?.patronymic
        },
        {
            label: t("table.login"),
            value: data?.login
        },

        {
            label: t("table.role"),
            value: data?.role
        },
        {
            label: t("table.roles"),
            value: <List>
                {data?.roles?.map(el => (
                    <List.Item key={el}>
                        {el}
                    </List.Item>
                ))}
            </List>
        },
        {
            label: t("table.permissions"),
            value: <List>
                {data?.permissions?.map(el => (
                    <List.Item key={el}>
                        {el}
                    </List.Item>
                ))}
            </List>
        },
    ]


    useEffect(() => {
        fetchMyData()
    }, [])
    return (
        <AdminAppShell>
            <Flex justify="end">
                <AppButton onClick={toggle} variant="sorting">
                    {t("button.change-password")}
                </AppButton>
            </Flex>
            {content && <ContentInfo data={content} />}
            <UserChangePassword opened={opened} userId={null} toggle={toggle} />
        </AdminAppShell>
    )
}
