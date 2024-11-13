"use client"
import { createInfoBlock, getReferenceByTypeCode, InfoBlock, InfoBlockForm, Reference, ReferenceTypeCodesEnum, updateInfoBlock } from "@/entities"
import { AppButtonGroup, AppCheckBox, AppDateInput, AppDropzone, AppInput, AppSelect, AppTextEdtior, Content } from "@/shared"
import { Center, Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { FieldType, getInfoBlockForm } from "../helpers"
import { InfoBlockLinksForm } from "./form-sections"
import { MAIN_PAGE } from "@/constants"

type Props = {
    data?: InfoBlock
}

type InfoBlockFormAttachmentTypes = "photoAttachments" | "fileAttachments"

export const InfoBlockFormFeature = ({ data }: Props) => {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations()
    const [loading, setLoading] = useState(false)
    const [infoBlockTypes, setInfoBlockTypes] = useState<SearchResponse<Reference>>()
    const [regions, setRegions] = useState<SearchResponse<Reference>>()

    const form = useForm(getInfoBlockForm(data, t));

    const isMainPage = infoBlockTypes?.content?.find(el => `${el.id}` === `${form.values.typeId}`)?.titleEn.toUpperCase() === MAIN_PAGE.toUpperCase()

    const fetchReference = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_INFO_BLOCK_TYPE })
        setInfoBlockTypes(res)
    }

    const fetchRegions = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_REGIONS })
        setRegions(res)
    }

    const referenceSelectDto = useMemo(() => {
        return infoBlockTypes?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [infoBlockTypes?.content, locale])

    const regionsSelectDto = useMemo(() => {
        return regions?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [regions?.content, locale])

    const handleSubmit = async (values: InfoBlockForm) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateInfoBlock(values)
        } else {
            res = await createInfoBlock(values)
        }
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/info_block`)
        }
    }

    const handleSaveAsNew = async () => {
        const res = await createInfoBlock(form.values)
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/info_block`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router.push(`/${locale}/admin/info_block`)
    }


    const handleDeleteFile = (type: InfoBlockFormAttachmentTypes) => ({
        group,
        index,
        id
    }: HandleDeleteFileArgs) => {
        switch (group) {
            case "attachment": {
                if (id) {
                    form.removeListItem(`${type}.attachments`, index)
                    form.insertListItem(`${type}.toDelete`, id)
                }
                return;
            }
            case "file": {
                if (!id) {
                    form.removeListItem(`${type}.toCreate`, index)
                }
                return;
            }
        }
    }

    const handleReOrderFile = (type: InfoBlockFormAttachmentTypes) =>
        ({ from, to, group }: HandleReOrderArgs) => {
            if (group === "file") {
                form.reorderListItem(`${type}.toCreate`, { from, to });
            } else if (group === "attachment") {
                const item = form.values?.[type]?.attachments?.[from];
                if (item) {
                    form.insertListItem(`${type}.toUpdate`, { id: item.id, order: to });
                    form.reorderListItem(`${type}.attachments`, { from, to });
                }
            }
        };

    const handleSaveCropedFiles = ({
        file,
        group,
        index,
        id
    }: HandleSaveCropedArgs) => {
        switch (group) {
            case "attachment": {
                if (id) {
                    form.removeListItem("photoAttachments.attachments", index)
                    form.insertListItem("photoAttachments.toDelete", id)
                    form.insertListItem("photoAttachments.toCreate", file)
                }
                return;
            }
            case "file": {
                if (!id) {
                    form.removeListItem("photoAttachments.toCreate", index)
                    form.insertListItem("photoAttachments.toCreate", file, index)
                }
                return;
            }
        }
    }

    useEffect(() => {
        fetchReference()
        fetchRegions()
    }, [])

    const getField = (field: FieldType) => {
        switch (field.type) {
            case "checkbox":
                return <AppCheckBox
                    label={t(`form.label.${field.label}`)}
                    {...form.getInputProps(field.formKey)}
                    checked={form.getInputProps(field.formKey).value} />
            case "date":
                return <AppDateInput
                    label={t(`form.label.${field.label}`)}
                    {...form.getInputProps(field.formKey)} />
            case "input":
                return <AppInput
                    label={t(`form.label.${field.label}`)}
                    {...form.getInputProps(field.formKey)} />
            case "textEditor":
                return <AppTextEdtior
                    label={t(`form.label.${field.label}`)}
                    {...form.getInputProps(field.formKey)}
                />
        }
    }

    const attachmentsFields = () => (
        <>
            {!isMainPage && linksSection}
            <Grid.Col>
                <AppDropzone
                    aspectRatio={16 / 9}
                    fileType="image"
                    handleDeleteFile={handleDeleteFile("photoAttachments")}
                    label={t("form.label.photoAttachments")}
                    handleSaveCroped={handleSaveCropedFiles}
                    handleReOrder={handleReOrderFile("photoAttachments")}
                    attachments={form.values?.photoAttachments?.attachments}
                    {...form.getInputProps("photoAttachments.toCreate")}
                />
            </Grid.Col>
            {!isMainPage && <Grid.Col>
                <AppDropzone
                    fileType="document"
                    handleDeleteFile={handleDeleteFile("fileAttachments")}
                    label={t("form.label.fileAttachments")}
                    handleReOrder={handleReOrderFile("fileAttachments")}
                    attachments={form.values?.fileAttachments?.attachments}
                    {...form.getInputProps("fileAttachments.toCreate")}
                />
            </Grid.Col>}
        </>
    )

    const linksSection = <InfoBlockLinksForm<InfoBlockForm> links={form.values.links} form={form} />

    const formFields = isMainPage ? [
        // { formKey: "titleKg", label: "titleKg", type: "input", span: 12 },
        // { formKey: "titleRu", label: "titleRu", type: "input", span: 12 },
        // { formKey: "titleEn", label: "titleEn", type: "input", span: 12 },
    ] :
        [
            { formKey: "order", label: "order", type: "input", span: 12 },
            { formKey: "titleKg", label: "titleKg", type: "input", span: 12 },
            { formKey: "titleRu", label: "titleRu", type: "input", span: 12 },
            { formKey: "titleEn", label: "titleEn", type: "input", span: 12 },
            { formKey: "contentEn", label: "contentEn", type: "input", span: 12 },
            { formKey: "contentRu", label: "contentRu", type: "input", span: 12 },
            { formKey: "contentKg", label: "contentKg", type: "input", span: 12 },
            { formKey: "textKg", label: "textKg", type: "textEditor", span: 12 },
            { formKey: "textRu", label: "textRu", type: "textEditor", span: 12 },
            { formKey: "textEn", label: "textEn", type: "textEditor", span: 12 },
        ]


    const regionSelect = () => {
        if (!isMainPage) {
            return (
                <Grid.Col>
                    <AppSelect searchable
                        label={t("form.label.region")}
                        data={regionsSelectDto}
                        {...form.getInputProps("regionId")}
                        value={`${form.values.regionId}`}
                    />
                </Grid.Col>
            )
        }
    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter={24}>
                <Grid.Col>
                    <AppSelect searchable
                        label={t("form.label.type")}
                        data={referenceSelectDto}
                        {...form.getInputProps("typeId")}
                        value={`${form.values.typeId}`}
                    />
                </Grid.Col>
                {formFields?.map((field, index) => (
                    <Grid.Col key={index} span={field.span}>
                        {getField(field)}
                    </Grid.Col>
                ))}
                {attachmentsFields()}
                {regionSelect()}
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
