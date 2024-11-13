"use client"
import { CardInfoFilter } from "@/entities";
import { Actions } from "@/shared";
import { AppButtonGroup, AppInput, AppModal, AppSelect } from "@/shared/ui";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCardInfoFilterForm } from "../helpers";

type Props = {
    opened: boolean;
    toggle: () => void;
}

export const CardInfoFilterFeature = ({ opened, toggle }: Props) => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const oldParams: CardInfoFilter = Object.fromEntries(searchParams);
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm(getCardInfoFilterForm(oldParams))

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<CardInfoFilter>({
            ...form.values,
        }, oldParams, pathname)
        router.push(resUrl);
        toggle()
    };

    const handleClearValues = () => {
        form.setInitialValues({
            fullName: "",
            phone: "",
            email: "",
            typeId: undefined,
            active: "true",
            position: "",
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
                    label={t("form.label.active")}
                    value={form.values.active}
                    data={enabledSelectDto}
                    {...form.getInputProps("enabled")}
                />
                <AppInput
                    label={t("form.label.fullname")}
                    {...form.getInputProps("fullname")} />
                <AppInput
                    label={t("form.label.phone")}
                    {...form.getInputProps("phone")} />
                <AppInput
                    {...form.getInputProps("email")}
                    label={t("form.label.email")}
                />
                <AppInput
                    {...form.getInputProps("position")}
                    label={t("form.label.position")}
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
