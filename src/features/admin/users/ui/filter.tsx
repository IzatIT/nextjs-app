"use client"
import { UserFilter } from "@/entities";
import { Actions } from "@/shared";
import { AppButtonGroup, AppDateInput, AppInput, AppModal, AppSelect } from "@/shared/ui";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUserFilterForm } from "../helpers";

type Props = {
    opened: boolean;
    toggle: () => void;
}

export const UserFilterFeature = ({ opened, toggle }: Props) => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const oldParams: UserFilter = Object.fromEntries(searchParams);
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm(getUserFilterForm(oldParams))

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<UserFilter>({
            ...form.values,
        }, oldParams, pathname)
        router.push(resUrl);
        toggle()
    };

    const handleClearValues = () => {
        form.setInitialValues({
            inn: "",
            surname: "",
            name: "",
            patronymic: "",
            enabled: "null",
        })
        form.reset()
    }

    const enabledSelectDto = [
        { label: t("form.label.active-true"), value: "true" },
        { label: t("form.label.active-false"), value: "false" },
        { label: t("form.label.null"), value: "null" },
    ]

    return (
        <AppModal closeOnClickOutside opened={opened} toggle={toggle}>
            <Flex p={24} direction="column" gap={20}>
                <AppSelect
                    label={t("form.label.enabled")}
                    value={form.values.enabled}
                    data={enabledSelectDto}
                    {...form.getInputProps("enabled")}
                />
                <AppInput
                    label={t("form.label.inn")}
                    {...form.getInputProps("inn")} />
                <AppInput
                    label={t("form.label.surname")}
                    {...form.getInputProps("surname")} />
                <AppDateInput
                    {...form.getInputProps("name")}
                    label={t("form.label.name")}
                />
                <AppDateInput
                    {...form.getInputProps("patronymic")}
                    label={t("form.label.patronymic")}
                />
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
