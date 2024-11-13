"use client"
import { DiagramFilter, getReferenceByTypeCode, InfoBlockFilter, Reference, ReferenceTypeCodesEnum } from "@/entities";
import { Actions, Content } from "@/shared";
import { AppButtonGroup, AppInput, AppModal, AppSelect } from "@/shared/ui";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getDiagramFilterForm } from "../helpers";

type Props = {
    opened: boolean;
    toggle: () => void;
}

export const DiagramFilterFeature = ({ opened, toggle }: Props) => {
    const t = useTranslations()
    const locale = useLocale()
    const searchParams = useSearchParams()
    const oldParams: InfoBlockFilter = Object.fromEntries(searchParams);
    const router = useRouter()
    const pathname = usePathname()
    const [types, setTypes] = useState<SearchResponse<Reference>>()
    const [categories, setCategories] = useState<SearchResponse<Reference>>()
    const form = useForm(getDiagramFilterForm(oldParams))

    const fetchTypes = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_DIAGRAM_TYPE })
        setTypes(res)
    }
    const fetchCategories = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_DIAGRAM_CATEGORY_TYPE })
        setCategories(res)
    }

    const typesSelectDto = useMemo(() => {
        return types?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [types?.content])

    const categorySelectDto = useMemo(() => {
        return categories?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [categories?.content])

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<DiagramFilter>(form.values, oldParams, pathname)
        router.push(resUrl);
        toggle()
    };

    const handleClearValues = () => {
        form.setInitialValues({
            title: "",
            typeId: undefined,
            categoryId: undefined
        })
        form.reset()
    }

    useEffect(() => {
        fetchTypes()
        fetchCategories()
    }, [])
    return (
        <AppModal closeOnClickOutside opened={opened} toggle={toggle}>
            <Flex p={24} direction="column" gap={20}>
                <AppSelect
                    label={t("form.label.type")}
                    value={form.values.typeId}
                    data={typesSelectDto}
                    {...form.getInputProps("typeId")}
                />
                <AppSelect
                    label={t("form.label.category")}
                    value={form.values.categoryId}
                    data={categorySelectDto}
                    {...form.getInputProps("categoryId")}
                />
                <AppInput
                    label={t("form.label.title")}
                    {...form.getInputProps("title")} />
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
