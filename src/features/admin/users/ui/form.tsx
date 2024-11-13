"use client"
import { createUser, searchUserRoles, updateUser, User, UserFormRequest, UserRoles } from "@/entities"
import { AppButtonGroup, AppDateInput, AppInput, AppSelect, DateTime } from "@/shared"
import { Center, Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getUserForm } from "../helpers"


type Props = {
    data?: User
}

export const UserFormFeature = ({ data }: Props) => {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations()
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState<UserRoles[]>()

    const form = useForm(getUserForm(data, t))

    const handleSubmit = async (values: UserFormRequest) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateUser(values)
        } else {
            res = await createUser(values)
        }
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/user`)
        }
    }

    const handleSaveAsNew = async () => {
        const res = await createUser(form.values)
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/user`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router.push(`/${locale}/admin/user`)
    }

    const selectDto = roles?.map(el => ({
        label: el.title,
        value: el.code
    }))

    const fetchRoles = async () => {
        const res = await searchUserRoles()
        setRoles(res?.content)
    }

    useEffect(() => {
        fetchRoles()
    }, [])
    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter={10}>
                <Grid.Col span={12}>
                    <AppDateInput
                        maxDate={DateTime.GetNow()}
                        label={t("form.label.dateOfBirth")}
                        {...form.getInputProps("dateOfBirth")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                    <AppInput
                        label={t("form.label.surname")}
                        {...form.getInputProps("surname")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                    <AppInput
                        label={t("form.label.name")}
                        {...form.getInputProps("name")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                    <AppInput
                        label={t("form.label.patronymic")}
                        {...form.getInputProps("patronymic")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                    <AppInput
                        maxLength={14}
                        minLength={14}
                        label={t("form.label.inn")}
                        {...form.getInputProps("inn")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                    <AppInput
                        label={t("form.label.login")}
                        {...form.getInputProps("login")}
                    />
                </Grid.Col>
                {!data &&
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <AppInput
                            type="password"
                            label={t("form.label.password")}
                            {...form.getInputProps("password")}
                        />
                    </Grid.Col>}
                <Grid.Col>
                    <AppSelect
                        label={t("form.label.role")}
                        data={selectDto || []}
                        {...form.getInputProps("role")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <Center>
                        <AppButtonGroup
                            loading={loading}
                            leftLabel={t("button.cancel")}
                            rightLabel={t("button.save")}
                            leftOnClick={handleCancel}
                            rightOnClick={form.onSubmit(handleSubmit)}
                            rightType="submit"
                            centerLabel={data && t("button.save-as-new")}
                            centerOnClick={data && handleSaveAsNew}
                            saveAsNew={!!data}
                        />
                    </Center>
                </Grid.Col>
            </Grid>
        </form>
    )
}
