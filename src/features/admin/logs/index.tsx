"use client"
import { LogsFilter, searchUsers, User } from "@/entities";
import { Actions } from "@/shared";
import { AppButtonGroup, AppInput, AppModal, AppSelect } from "@/shared/ui";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getLogsFilterForm } from "./validation";

type Props = {
    opened: boolean;
    toggle: () => void;
}

export const LogsFilterFeature = ({ opened, toggle }: Props) => {
    const t = useTranslations()
    const locale = useLocale()
    const searchParams = useSearchParams()
    const oldParams: LogsFilter = Object.fromEntries(searchParams);
    const router = useRouter()
    const pathname = usePathname()
    const [users, setUsers] = useState<User[]>();
    const form = useForm(getLogsFilterForm(oldParams))

    const fetchUsers = async () => {
        const response = await searchUsers({
            filter: {},
            sorting: {},
            pageRequest: {
                limit: 100,
                page: 0
            }
        })
        setUsers(response?.content)
    }

    const usersSelectDto = useMemo(() => {
        return users?.map(user => ({
            label: `${user.inn} - ${user.surname} ${user.name} ${user.patronymic}`,
            value: `${user.id}`
        }))
    }, [users])

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<LogsFilter>(form.values, oldParams, pathname)
        router.push(resUrl);
        toggle()
    };

    const handleClearValues = () => {
        form.setInitialValues({
            clientId: undefined,
            clientIp: "",
            uri: ""
        })
        form.reset()
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <AppModal closeOnClickOutside opened={opened} toggle={toggle}>
            <Flex p={24} direction="column" gap={20}>
                <AppSelect
                    label={t("form.label.userId")}
                    value={form.values.clientId}
                    data={usersSelectDto}
                    {...form.getInputProps("clientId")}
                />
                <AppInput
                    label={t("form.label.logs-clientIp")}
                    {...form.getInputProps("clientIp")} />
                <AppInput
                    label={t("form.label.logs-uri")}
                    {...form.getInputProps("uri")} />
                <Center>
                    <AppButtonGroup
                        leftLabel={t("button.clear")}
                        leftOnClick={handleClearValues}
                        leftVariant="clear"
                        centerLabel={t("button.cancel")}
                        centerOnClick={toggle}
                        rightOnClick={handleSubmit}
                        rightLabel={t("button.submit")}
                    />
                </Center>
            </Flex>
        </AppModal>
    )
}
