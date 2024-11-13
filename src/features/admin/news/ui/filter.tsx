"use client"
import { NewsFilter } from "@/entities";
import { Actions } from "@/shared";
import { AppButtonGroup, AppDateInput, AppInput, AppModal, AppSelect } from "@/shared/ui";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getNewsFilterForm } from "../helpers";

type Props = {
    opened: boolean;
    toggle: () => void;
}

export const NewsFilterFeature = ({ opened, toggle }: Props) => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const oldParams: NewsFilter = Object.fromEntries(searchParams);
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm(getNewsFilterForm(oldParams))

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<NewsFilter>({
            ...form.values,
            publishedAt: form.values.publishedAt && form.values.publishedAt,
            publishAt: form.values.publishAt && form.values.publishAt
        }, oldParams, pathname)
        router.push(resUrl);
        toggle()
    };

    const handleClearValues = () => {
        form.setInitialValues({
            active: "null",
            onSlider: "null",
            includedInMailing: "null",
            title: "",
            content: "",
            publishedAt: undefined,
            regionId: undefined,
            categories: undefined,
            countries: undefined,
            tags: undefined,
            publishAt: undefined,
        })
        form.reset()
    }

    const activeSelectDto = [
        { label: t("form.label.active-true"), value: "true" },
        { label: t("form.label.active-false"), value: "false" },
        { label: t("form.label.null"), value: "null" },
    ]

    const isMainSelectDto = [
        { label: t("form.label.isMain-true"), value: "true" },
        { label: t("form.label.isMain-false"), value: "false" },
        { label: t("form.label.null"), value: "null" },
    ]
    const includedInMailingSelectDto = [
        { label: t("form.label.includedInMailing-true"), value: "true" },
        { label: t("form.label.includedInMailing-false"), value: "false" },
        { label: t("form.label.includedInMailing-null"), value: "null" },
    ]

    return (
        <AppModal closeOnClickOutside opened={opened} toggle={toggle}>
            <Flex p={24} direction="column" gap={20}>
                <AppSelect
                    label={t("form.label.active")}
                    value={form.values.active}
                    data={activeSelectDto}
                    {...form.getInputProps("active")}
                />
                <AppSelect
                    label={t("form.label.isMain")}
                    value={form.values.onSlider}
                    data={isMainSelectDto}
                    {...form.getInputProps("onSlider")}
                />
                <AppSelect
                    label={t("form.label.includedInMailing")}
                    data={includedInMailingSelectDto}
                    value={form.values.includedInMailing}
                    {...form.getInputProps("includedInMailing")}
                />
                <AppInput
                    label={t("form.label.title")}
                    {...form.getInputProps("title")} />
                <AppInput
                    label={t("form.label.content")}
                    {...form.getInputProps("content")} />
                <AppDateInput
                    {...form.getInputProps("publishedAt")}
                    label={t("form.label.publishedAt")}
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
