import { DIAGRAM_QUARTER, DiagramForm, getReferenceByTypeCode, Reference, ReferenceTypeCodesEnum } from "@/entities"
import { AppCheckBox, AppDateInput, AppInput, AppSelect, AppTextEdtior, Content } from "@/shared"
import { Grid } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"

interface Props {
    form: UseFormReturnType<DiagramForm, (values: DiagramForm) => DiagramForm>
}

export const quarterSelectDto = (t: (a: string) => string) => [
    {
        label: t("form.label.quarter-first"),
        value: `${DIAGRAM_QUARTER.FIRST}`
    },
    {
        label: t("form.label.quarter-second"),
        value: `${DIAGRAM_QUARTER.SECOND}`
    },
    {
        label: t("form.label.quarter-third"),
        value: `${DIAGRAM_QUARTER.THIRD}`
    },
    {
        label: t("form.label.quarter-fourth"),
        value: `${DIAGRAM_QUARTER.FOURTH}`
    },
]


export const DiagramMainForm = ({ form }: Props) => {
    const [categories, setCategories] = useState<SearchResponse<Reference>>()
    const [types, setTypes] = useState<SearchResponse<Reference>>()
    const locale = useLocale();
    const t = useTranslations()

    const fetchCategories = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_DIAGRAM_CATEGORY_TYPE })
        setCategories(res)
    }

    const fetchTypes = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_DIAGRAM_TYPE })
        setTypes(res)
    }

    const typesSelectDto = useMemo(() => {
        return types?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [types?.content, locale])

    const categoriesSelectDto = useMemo(() => {
        return categories?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [categories?.content, locale])


    const formFields = [
        { label: "order", type: "input", span: 12 },
        { label: "titleKg", type: "input", span: 12 },
        { label: "titleRu", type: "input", span: 12 },
        { label: "titleEn", type: "input", span: 12 },
        { label: "contentKg", type: "input", span: 12 },
        { label: "contentRu", type: "input", span: 12 },
        { label: "contentEn", type: "input", span: 12 },
        { label: "descriptionKg", type: "textEditor", span: 12 },
        { label: "descriptionRu", type: "textEditor", span: 12 },
        { label: "descriptionEn", type: "textEditor", span: 12 },
    ]


    useEffect(() => {
        fetchTypes()
        fetchCategories()
    }, [])
    return (
        <>
            <Grid.Col span={{ base: 12, sm: 6 }}>
                <AppSelect searchable
                    label={t("form.label.type")}
                    data={typesSelectDto}
                    {...form.getInputProps("typeId")}
                    value={`${form.values.typeId}`}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
                <AppSelect searchable
                    label={t("form.label.category")}
                    data={categoriesSelectDto}
                    {...form.getInputProps("categoryId")}
                    value={`${form.values.categoryId}`}
                />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
                <AppSelect searchable
                    label={t("form.label.quarter")}
                    data={quarterSelectDto(t)}
                    {...form.getInputProps("quarter")}
                    value={`${form.values.quarter}`}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
                <AppInput minNumber={1000}
                    label={t(`form.label.year`)}
                    {...form.getInputProps("year")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
                <AppDateInput
                    maxDate={form.values.dateTo}
                    label={t(`form.label.dateFrom`)}
                    {...form.getInputProps(`dateFrom`)} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
                <AppDateInput
                    minDate={form.values.dateFrom}
                    label={t(`form.label.dateTo`)}
                    {...form.getInputProps(`dateTo`)} />
            </Grid.Col>
            {formFields.map((field, index) => (
                <Grid.Col key={index} span={field.span}>
                    {field.type === "checkbox" ? (
                        <AppCheckBox
                            label={t(`form.label.${field.label}`)}
                            {...form.getInputProps(field.label)}
                            checked={form.getInputProps(field.label).value} />
                    ) : field.type === "input" ? (
                        <AppInput minNumber={0}
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
