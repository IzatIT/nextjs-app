"use client"
import {
    createReference,
    getReferenceByTypeCode, Reference, ReferenceRequest,
    ReferenceTypeCodesEnum, TypeCode, updateReference
} from "@/entities"
import { AppButtonGroup, AppCheckBox, AppInput, AppSelect, Content } from "@/shared"
import { Center, Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getReferenceForm } from "../helpers"

type Props = {
    data?: Reference
}

export const ReferenceFormFeature = ({ data }: Props) => {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations()
    const [loading, setLoading] = useState(false)
    const [references, setReferences] = useState<SearchResponse<Reference>>()

    const fetchReferences = async (typeCode?: TypeCode) => {
        if (typeCode) {
            const res = await getReferenceByTypeCode({ typeCode: typeCode })
            setReferences(res)
        }
    }

    const parentSelectDto = references?.content?.map(el => ({
        label: Content.GetTitleByLanguage(el, locale),
        value: `${el.id}`
    }))

    const form = useForm(getReferenceForm(data, t));

    const handleSubmit = async (values: ReferenceRequest) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateReference(values)
        } else {
            res = await createReference(values)
        }
        setLoading(false)
        router.push(`/${locale}/admin/reference`)
    }

    const handleSaveAsNew = async () => {
        await createReference(form.values)
        setLoading(false)
        router.push(`/${locale}/admin/reference`)
    }

    const handleCancel = () => {
        form.reset()
        router.push(`/${locale}/admin/reference`)
    }

    const formFields = [
        { label: "titleKg", type: "input", span: 12 },
        { label: "titleRu", type: "input", span: 12 },
    ]

    const typeSelectDto = [
        { label: t("form.label.REF_CARD_INFO_TYPE"), value: ReferenceTypeCodesEnum.REF_CARD_INFO_TYPE },
        { label: t("form.label.REF_COUNTRIES"), value: ReferenceTypeCodesEnum.REF_COUNTRIES },
        { label: t("form.label.REF_CREATE_PAGE_TYPE"), value: ReferenceTypeCodesEnum.REF_CREATE_PAGE_TYPE },
        { label: t("form.label.REF_INFO_BLOCK_TYPE"), value: ReferenceTypeCodesEnum.REF_INFO_BLOCK_TYPE },
        { label: t("form.label.REF_MENU"), value: ReferenceTypeCodesEnum.REF_MENU },
        { label: t("form.label.REF_NEWS_CATEGORY"), value: ReferenceTypeCodesEnum.REF_NEWS_CATEGORY },
        { label: t("form.label.REF_NEWS_TAG"), value: ReferenceTypeCodesEnum.REF_NEWS_TAG },
        { label: t("form.label.REF_REGIONS"), value: ReferenceTypeCodesEnum.REF_REGIONS },
        { label: t("form.label.REF_ROLE"), value: ReferenceTypeCodesEnum.REF_ROLE },
        { label: t("form.label.REF_SOCIAL_LINK_TYPE"), value: ReferenceTypeCodesEnum.REF_SOCIAL_LINK_TYPE },
    ]

    useEffect(() => {
        fetchReferences(form?.values?.type)
    }, [form.values.type])

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter={24}>
                <Grid.Col>
                    <AppSelect
                        data={typeSelectDto}
                        label={t("form.label.type")}
                        required
                        {...form.getInputProps("type")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppSelect
                        data={parentSelectDto}
                        label={t("form.label.parent")}
                        {...form.getInputProps("parentId")}
                        value={`${form.values.parentId}`}
                    />
                </Grid.Col>
                {formFields.map((field, index) => (
                    <Grid.Col key={index} span={field.span}>
                        {field.type === "checkbox" ? (
                            <AppCheckBox
                                label={t(`form.label.${field.label}`)}
                                {...form.getInputProps(field.label)}
                                checked={form.getInputProps(field.label).value} />
                        ) : (
                            <AppInput
                                label={t(`form.label.${field.label}`)}
                                {...form.getInputProps(field.label)} />
                        )}
                    </Grid.Col>
                ))}
                <Grid.Col>
                    <AppInput
                        label={t(`form.label.titleEn`)}
                        {...form.getInputProps("titleEn")} />
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
