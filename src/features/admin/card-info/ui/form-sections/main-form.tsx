"use client"
import { CardInfoForm, getReferenceByTypeCode, Reference, ReferenceTypeCodesEnum } from "@/entities"
import { AppCheckBox, AppDropzone, AppInput, AppSelect, Content } from "@/shared"
import { Box, Grid } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from "react"

type Props = {
    form: UseFormReturnType<CardInfoForm, (values: CardInfoForm) => CardInfoForm>
}

export const CardInfoMainForm = ({ form }: Props) => {
    const t = useTranslations()
    const locale = useLocale()
    const [references, setReferences] = useState<SearchResponse<Reference>>()

    const fetchReferences = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_CARD_INFO_TYPE })
        setReferences(res)
    }

    const referenceSelectDto = references?.content?.map(el => ({
        label: Content.GetTitleByLanguage(el, locale),
        value: `${el?.id}`
    }))

    const handleDeleteFile = ({ group, index, id }: HandleDeleteFileArgs) => {
        if (group === "attachment") {
            form.removeListItem("attachment", index)
            form.insertListItem("toDeleteFile", id)
        } else {
            form.removeListItem("file", index)
        }
    }

    const handleSaveCroped = ({ file, group, index, id }: HandleSaveCropedArgs) => {
        if (group === "file") {
            form.removeListItem("file", index)
            form.insertListItem("file", file)
        } else if (group === "attachment") {
            form.removeListItem("file", index)
            form.insertListItem("file", file)
            form.insertListItem("toDeleteFile", id)
        } else if (group === "base64") {
            form.removeListItem("attachment", index)
            form.insertListItem("file", file)
        }
    }

    useEffect(() => {
        fetchReferences()
    }, [])
    return (
        <>
            <Grid.Col>
                <AppSelect
                    label={t("form.label.cardType")}
                    data={referenceSelectDto}
                    {...form.getInputProps("typeId")}
                />
            </Grid.Col>
            <Grid.Col>
                <AppCheckBox
                    label={t("form.label.active")}
                    checked={form.getInputProps("active").checked}
                    {...form.getInputProps("active")}
                />
            </Grid.Col>
            <Grid.Col span={12}>
                <Box maw={200}>
                    <AppInput
                        label={t("form.label.order")}
                        {...form.getInputProps("order")}
                    />
                </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
                <AppInput
                    label={t("form.label.fullname")}
                    {...form.getInputProps("fullName")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
                <AppInput
                    type="email"
                    label={t("form.label.email")}
                    {...form.getInputProps("email")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
                <AppInput
                    label={t("form.label.phone")}
                    {...form.getInputProps("phone")}
                />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 4 }}>
                <AppInput
                    label={t("form.label.positionKg")}
                    {...form.getInputProps("positionKg")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
                <AppInput
                    label={t("form.label.positionRu")}
                    {...form.getInputProps("positionRu")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
                <AppInput
                    label={t("form.label.positionEn")}
                    {...form.getInputProps("positionEn")}
                />
            </Grid.Col>
            <Grid.Col >
                <AppDropzone
                    aspectRatio={3 / 4}
                    handleSaveCroped={handleSaveCroped}
                    handleDeleteFile={handleDeleteFile}
                    attachments={form.values.attachment ? [form.values.attachment] : undefined}
                    maxFiles={10}
                    label={t("form.label.photo")}
                    fileType="image"
                    {...form.getInputProps("file")}
                />
            </Grid.Col>
        </>
    )
}
