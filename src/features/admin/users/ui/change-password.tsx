"use client"
import { changeMyPassword, ChangePasswordRequest, changeUserPassword } from "@/entities";
import { getChangePasswordForm } from "@/features";
import { AppModal } from "@/shared";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChangePasswordFeature } from "../../app-shell/ui/change-password";

type Props = {
    opened: boolean;
    toggle: () => void;
    userId: number | null;
}

export const UserChangePassword = ({
    opened,
    toggle,
    userId
}: Props) => {
    const t = useTranslations()
    const [loading, setLoading] = useState(false)

    const handleChangePassword = () => {
        setLoading(true)
        if (userId) {
            changeUserPassword(userId, form.values)
        } else {
            changeMyPassword(form.values)
        }
        setLoading(false)
        toggle()
        form.reset()
    }
    const handleChangePasswordCancel = () => {
        toggle()
    }

    const form = useForm<ChangePasswordRequest>(getChangePasswordForm({
        minTitle: t("form.errors.minTitle"),
        requiredTitle: t("form.errors.requiredTitle"),
    }))

    return (
        <AppModal opened={opened} toggle={toggle} closeOnClickOutside>
            <ChangePasswordFeature
                loading={loading}
                newPasswordProps={form.getInputProps("newPassword")}
                oldPasswordProps={form.getInputProps("oldPassword")}
                handleSubmit={handleChangePassword}
                handleCancel={handleChangePasswordCancel} />
        </AppModal>
    )
}
