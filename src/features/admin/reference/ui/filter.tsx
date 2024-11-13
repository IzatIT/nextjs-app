"use client"
import { NewsFilter, ReferenceFilter, ReferenceTypeCodesEnum } from "@/entities";
import { Actions } from "@/shared";
import { AppButtonGroup, AppInput, AppModal, AppSelect } from "@/shared/ui";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getReferenceFilterForm } from "../helpers";

type Props = {
    opened: boolean;
    toggle: () => void;
}

export const ReferenceFilterFeature = ({ opened, toggle }: Props) => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const oldParams: NewsFilter = Object.fromEntries(searchParams);
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm(getReferenceFilterForm(oldParams))

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<ReferenceFilter>({
            ...form.values,
        }, oldParams, pathname)
        router.push(resUrl);
        toggle()
    };

    const handleClearValues = () => {
        form.setInitialValues({
            enabled: "null",
            title: "",
            typeCode: undefined,
            typeId: undefined
        })
        form.reset()
    }

    const enabledSelectDto = [
        { label: t("form.label.active-true"), value: "true" },
        { label: t("form.label.active-false"), value: "false" },
        { label: t("form.label.null"), value: "null" },
    ]

    const typeCodeSelectDto = [
        { label: t("form.label.REF_CARD_INFO_TYPE"), value: ReferenceTypeCodesEnum.REF_CARD_INFO_TYPE },
        { label: t("form.label.REF_COUNTRIES"), value: ReferenceTypeCodesEnum.REF_COUNTRIES },
        { label: t("form.label.REF_CREATE_PAGE_TYPE"), value: ReferenceTypeCodesEnum.REF_CREATE_PAGE_TYPE },
        { label: t("form.label.REF_DIAGRAM_CATEGORY_TYPE"), value: ReferenceTypeCodesEnum.REF_DIAGRAM_CATEGORY_TYPE },
        { label: t("form.label.REF_DIAGRAM_TYPE"), value: ReferenceTypeCodesEnum.REF_DIAGRAM_TYPE },
        { label: t("form.label.REF_INFO_BLOCK_TYPE"), value: ReferenceTypeCodesEnum.REF_INFO_BLOCK_TYPE },
        { label: t("form.label.REF_MENU"), value: ReferenceTypeCodesEnum.REF_MENU },
        { label: t("form.label.REF_NEWS_CATEGORY"), value: ReferenceTypeCodesEnum.REF_NEWS_CATEGORY },
        { label: t("form.label.REF_NEWS_TAG"), value: ReferenceTypeCodesEnum.REF_NEWS_TAG },
        { label: t("form.label.REF_REGIONS"), value: ReferenceTypeCodesEnum.REF_REGIONS },
        { label: t("form.label.REF_ROLE"), value: ReferenceTypeCodesEnum.REF_ROLE },
        { label: t("form.label.REF_SOCIAL_LINK_TYPE"), value: ReferenceTypeCodesEnum.REF_SOCIAL_LINK_TYPE },
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
                <AppSelect
                    label={t("form.label.type")}
                    value={form.values.typeCode}
                    data={typeCodeSelectDto}
                    {...form.getInputProps("typeCode")}
                />
                <AppInput
                    label={t(`form.label.titleEn`)}
                    {...form.getInputProps("titleEn")} />
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
