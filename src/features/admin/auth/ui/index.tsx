"use client"
import { login, LoginRequest } from "@/entities"
import { AppButton, AppInput } from "@/shared"
import { Box, Center, Flex, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconId } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getLoginForm } from "../helpers"

export const AuthFeature = () => {
    const t = useTranslations();
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const form = useForm<LoginRequest>(getLoginForm({
        minTitle: t("form.errors.minTitle"),
        requiredTitle: t("form.errors.requiredTitle"),
    }))

    const handleSubmit = async () => {
        if (!form.validate().hasErrors) {
            setLoading(true)
            login(form.values).then(() => {
                router.push(`admin/news`)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <Center px={16} py={32} mx="auto">
            <Box h="70%">
                <Title fz={{ base: 18, sm: 24 }} ta="center">
                    {t("page.titles.auth")}
                </Title>
                <Flex align="end" w={280} direction="column" gap={24} mt={50}>
                    <Box w="100%">
                        <AppInput
                            disabled={loading}
                            rightSection={<IconId stroke={1.2} color="black" />}
                            variant="primary"
                            label={t("form.label.inn")}
                            {...form.getInputProps("login")}
                        />
                    </Box>
                    <Box w="100%">
                        <AppInput
                            disabled={loading}
                            minLength={5}
                            variant="primary"
                            type="password"
                            label={t("form.label.password")}
                            {...form.getInputProps("password")}
                        />
                    </Box>
                    <AppButton
                        disabled={loading}
                        onClick={handleSubmit} type="submit"
                        loading={loading}
                        variant="primary">
                        {t("button.login")}
                    </AppButton>
                </Flex>
            </Box>
        </Center>
    )
}
