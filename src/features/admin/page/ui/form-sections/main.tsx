import {getReferenceByTypeCode, Page, PageForm, Reference, ReferenceTypeCodesEnum, searchPages} from "@/entities"
import { AppCheckBox, AppDateInput, AppInput, AppSelect, AppTextEdtior, Content } from "@/shared"
import { Grid } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"

type Props = {
    form: UseFormReturnType<PageForm, (values: PageForm) => PageForm>
}

export const PageMainForm = ({ form }: Props) => {
    const [reference, setReference] = useState<SearchResponse<Reference>>()
    const locale = useLocale()
    const [pages, setPages] = useState<Page[]>()
    const t = useTranslations()
    const fetchReference = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_CREATE_PAGE_TYPE })
        setReference(res)
    }


    const fetchPages = async () => {
        const res = await searchPages({
            filter: {},
            pageRequest: {page: 0, limit: 100},
            sorting: {sortBy: "ID",sortDirection: "ASC"}
        })
        setPages(res?.content)
    }
    const parentSelectDto = pages?.map(el => ({
        label: Content.GetTitleByLanguage(el),
        value: `${el.id}`
    }))


    const referenceSelectDto = useMemo(() => {
        return reference?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el?.id}`
        }))
    }, [reference?.content, locale])

    const formFields = [
        { label: "order", type: "input", span: { base: 12, sm: 6 } },
        { label: "path", type: "input", span: { base: 12, sm: 6} },
        { label: "titleKg", type: "input", span: 12 },
        { label: "titleRu", type: "input", span: 12 },
        { label: "titleEn", type: "input", span: 12 },
        { label: "descriptionKg", type: "input", span: 12 },
        { label: "descriptionRu", type: "input", span: 12 },
        { label: "descriptionEn", type: "input", span: 12 },
    ]

    useEffect(() => {
        fetchReference()
        fetchPages()
    }, [])
    return (
        <>
            <Grid.Col span={{ base: 12, sm: 6 }}>
                <AppSelect searchable
                    label={t("form.label.type")}
                    data={referenceSelectDto}
                    {...form.getInputProps("typeId")}
                    value={`${form.values.typeId}`}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
                <AppSelect searchable
                           label={t("form.label.parentId")}
                           data={parentSelectDto}
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
                    ) : field.type === "date" ? (
                        <AppDateInput
                            label={t(`form.label.${field.label}`)}
                            {...form.getInputProps(field.label)} />
                    ) : field.type === "input" ? (
                        <AppInput
                            label={t(`form.label.${field.label}`)}
                            {...form.getInputProps(field.label)} />
                    ) : (
                        <AppTextEdtior
                            label={t(`form.label.${field.label}`)}
                            {...form.getInputProps(field.label)}
                        />
                    )}
                </Grid.Col>
            ))}
        </>
    )
}
