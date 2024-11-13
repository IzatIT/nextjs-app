import { COLORS } from "@/constants"
import { DIAGRAM_QUARTER, DiagramFieldForm, DiagramFieldValueRequest, DiagramForm, getReferenceByTypeCode, Reference, ReferenceTypeCodesEnum } from "@/entities"
import { AppButton, AppDateInput, AppInput, AppSelect, Content, DateTime } from "@/shared"
import { Box, Divider, Grid, Title } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"
import { quarterSelectDto } from "./main"

interface Props {
    form: UseFormReturnType<DiagramForm, (values: DiagramForm) => DiagramForm>
}

export const DiagramFieldsForm = ({ form }: Props) => {
    const t = useTranslations()
    const [types, setTypes] = useState<SearchResponse<Reference>>()
    const locale = useLocale()
    const initialValue: DiagramFieldForm = {
        order: form.values.fields?.length || 0,
        typeId: undefined,
        value: 0,
        titleKg: "",
        titleRu: "",
        titleEn: "",
        values: []
    }
    const handleRemoveItem = (index: number) => () => {
        form.removeListItem("fields", index)
    }
    const handleAddItem = () => {
        form.insertListItem("fields", initialValue)
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

    useEffect(() => {
        fetchTypes()
    }, [])
    return (
        <Grid.Col>
            <Title c={COLORS.PRIMARY_COLOR} fz={{ base: 18, sm: 24 }} ta="center">
                {t("table.titles.fields")}
            </Title>
            {form.values.fields?.map((_, index) => (
                <Grid align="end" key={index} gutter={10} mt={12}>
                    <Grid.Col span={12}>
                        <AppButton onClick={handleRemoveItem(index)} variant="reset">
                            <IconTrash color="orange" size={24} />
                        </AppButton>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppSelect searchable
                            label={t("form.label.type")}
                            data={typesSelectDto}
                            {...form.getInputProps("typeId")}
                            value={`${form.values.typeId}`}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppInput type="number" minNumber={0}
                            label={t(`form.label.order`)}
                            {...form.getInputProps(`fields.${index}.order`)}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppInput type="number"
                            label={t("form.label.value")}
                            {...form.getInputProps(`fields.${index}.value`)}
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <Grid >
                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                <AppInput
                                    label={t("form.label.titleKg")}
                                    {...form.getInputProps(`fields.${index}.titleKg`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                <AppInput
                                    label={t("form.label.titleRu")}
                                    {...form.getInputProps(`fields.${index}.titleRu`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                <AppInput
                                    label={t("form.label.titleEn")}
                                    {...form.getInputProps(`fields.${index}.titleEn`)}
                                />
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <FieldValues fieldIndex={index} form={form} />
                    <Divider my={32} w="100%" color="gray" />
                </Grid>
            ))}
            <Box mt={16}>
                <AppButton onClick={handleAddItem} variant="submit">
                    <IconPlus />
                </AppButton>
            </Box>
        </Grid.Col>
    )
}

type ValuesProps = {
    form: UseFormReturnType<DiagramForm, (values: DiagramForm) => DiagramForm>
    fieldIndex: number;
}

const FieldValues = ({ form, fieldIndex }: ValuesProps) => {
    const t = useTranslations()
    const initialValue: DiagramFieldValueRequest = {
        order: form.values.fields?.[fieldIndex]?.values?.length || 0,
        value: 0,
        dateFrom: DateTime.GetNow(),
        dateTo: DateTime.GetNow(),
        quarter: DIAGRAM_QUARTER.FIRST,
        year: 2020,
        titleKg: "",
        titleRu: "",
        titleEn: "",
    }
    const handleRemoveItem = (valueIndex: number) => () => {
        form.removeListItem(`fields.${fieldIndex}.values`, valueIndex)
    }
    const handleAddItem = () => {
        form.insertListItem(`fields.${fieldIndex}.values`, initialValue)
    }
    return (
        <Grid.Col>
            <Title c={COLORS.PRIMARY_COLOR} fz={24} ta="center">
                {t("section.titles.values")}
            </Title>
            {form.values.fields?.[fieldIndex]?.values?.map((_, valueIndex) => (
                <Grid align="end" key={valueIndex}>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppInput type="number" minNumber={0}
                            label={t(`form.label.order`)}
                            {...form.getInputProps(`fields.${fieldIndex}.values.${valueIndex}.order`)}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppInput type="number" minNumber={1000}
                            label={t(`form.label.year`)}
                            {...form.getInputProps(`fields.${fieldIndex}.values.${valueIndex}.year`)}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <AppSelect searchable
                            label={t("form.label.quarter")}
                            data={quarterSelectDto(t)}
                            {...form.getInputProps(`fields.${fieldIndex}.values.${valueIndex}.quarter`)}
                            value={`${form.values.fields?.[fieldIndex]?.values?.[valueIndex].quarter}`}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppDateInput
                            maxDate={form.values.fields?.[fieldIndex]?.values?.[valueIndex]?.dateTo}
                            label={t(`form.label.dateFrom`)}
                            {...form.getInputProps(`fields.${fieldIndex}.values.${valueIndex}.dateFrom`)} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppDateInput
                            minDate={form.values.fields?.[fieldIndex]?.values?.[valueIndex]?.dateFrom}
                            label={t(`form.label.dateTo`)}
                            {...form.getInputProps(`fields.${fieldIndex}.values.${valueIndex}.dateTo`)} />
                    </Grid.Col>
                    <Grid.Col>
                        <Grid >
                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                <AppInput
                                    label={t("form.label.titleKg")}
                                    {...form.getInputProps(`fields.${fieldIndex}.values.${valueIndex}.titleKg`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                <AppInput
                                    label={t("form.label.titleRu")}
                                    {...form.getInputProps(`fields.${fieldIndex}.values.${valueIndex}.titleRu`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                <AppInput
                                    label={t("form.label.titleEn")}
                                    {...form.getInputProps(`fields.${fieldIndex}.values.${valueIndex}.titleEn`)}
                                />
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppInput type="number"
                            label={t("form.label.value")}
                            {...form.getInputProps(`fields.${fieldIndex}.values.${valueIndex}.value`)}
                        />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <AppButton onClick={handleRemoveItem(valueIndex)} variant="reset">
                            <IconTrash color="orange" size={24} />
                        </AppButton>
                    </Grid.Col>
                    <Divider my={32} w="100%" color="purple" />
                </Grid>
            ))}
            <Box mt={16}>
                <AppButton onClick={handleAddItem} variant="filter">
                    <IconPlus size={20} />
                </AppButton>
            </Box>
        </Grid.Col>

    )
}