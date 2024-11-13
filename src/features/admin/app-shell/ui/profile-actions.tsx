"use client"
import { ChangePasswordRequest, logout } from "@/entities";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconLock, IconLogout, IconUserHexagon, IconUserScan } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getChangePasswordForm } from "../validation";
import { AppActions, AppModal } from "@/shared";
import { ChangePasswordFeature } from "./change-password";

export const ProfileActionsFeature = () => {
    const locale = useLocale()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [opened, { toggle }] = useDisclosure()
    const t = useTranslations()

    const handleLogout = async () => {
        logout()
        router.push(`/${locale}`)
    };

    const actions = [
        {
            icon: <IconUserHexagon />,
            title: t("button.profile"),
            onClick: () => router.push(`profile`)
        },
        {
            icon: <IconLock />,
            title: t("button.changePassword"),
            onClick: toggle,
        },
        {
            icon: <IconLogout />,
            title: t("button.logout"),
            onClick: handleLogout,
        },
    ];

    const form = useForm<ChangePasswordRequest>(getChangePasswordForm({
        minTitle: t("form.errors.minTitle"),
        requiredTitle: t("form.errors.requiredTitle"),
    }))

    const handleSubmit = async () => {
        if (!form.validate().hasErrors) {
            setLoading(true)
            setLoading(false)
        }
    }

    return (
        <>
            <AppActions
                target={
                    <IconUserScan
                        strokeWidth={1}
                        style={{ cursor: "pointer" }}
                        size={36} />
                }
                actions={actions}
            />
            <AppModal opened={opened} toggle={toggle}>
                <ChangePasswordFeature
                    loading={loading}
                    handleCancel={toggle}
                    handleSubmit={handleSubmit}
                    newPasswordProps={form.getInputProps("newPassword")}
                    oldPasswordProps={form.getInputProps("oldPassword")}
                    repeatNewPasswordProps={form.getInputProps("repeatNewPassword")}
                />
            </AppModal>
        </>
    )
}
