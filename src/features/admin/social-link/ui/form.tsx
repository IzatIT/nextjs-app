"use client"
import {
    createInfoBlock,
    createSocialLink, getReferenceByTypeCode, Reference,
    ReferenceTypeCodesEnum, SocialLink,
    SocialLinkForm, updateSocialLink
} from "@/entities"
import {
    AppButtonGroup, AppCheckBox,
    AppDateInput,
    AppDropzone, AppInput, AppSelect,
    AppTextEdtior, Content
} from "@/shared"
import { Center, Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { getSocialLinkForm } from "../helpers"

type Props = {
    data?: SocialLink
}

type SocialLinkFormAttachmentTypes = "photoAttachment"

export const SocialLinkFormFeature = ({ data }: Props) => {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations()
    const [loading, setLoading] = useState(false)
    const [socialLinks, setSocialLinks] = useState<SearchResponse<Reference>>()

    const form = useForm(getSocialLinkForm(data, t));

    const fetchReference = async () => {
        const res = await getReferenceByTypeCode({
            typeCode: ReferenceTypeCodesEnum.REF_SOCIAL_LINK_TYPE,
            notifyOnError: true,
        })
        setSocialLinks(res)
    }

    const socialLinksReferences = useMemo(() => {
        return socialLinks?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [socialLinks?.content])

    const handleSubmit = async (values: SocialLinkForm) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateSocialLink(values)
        } else {
            res = await createSocialLink(values)
        }
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/social_link`)
        }
    }

    const handleSaveAsNew = async () => {
        const res = await createInfoBlock(form.values)
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/social_link`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router.push(`/${locale}/admin/social_link`)
    }


    const handleDeleteFile = (type: SocialLinkFormAttachmentTypes) => ({
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


    const handleSaveCropedFiles = ({
        file,
        group,
        index,
        id
    }: HandleSaveCropedArgs) => {
        switch (group) {
            case "attachment": {
                if (id) {
                    form.removeListItem("photoAttachment.attachments", index)
                    form.insertListItem("photoAttachment.toDelete", id)
                    form.insertListItem("photoAttachment.toCreate", file)
                }
                return;
            }
            case "file": {
                if (!id) {
                    form.removeListItem("photoAttachment.toCreate", index)
                    form.insertListItem("photoAttachment.toCreate", file, index)
                }
                return;
            }
        }
    }

    const formFields = [
        { label: "order", type: "input", span: 12 },
        { label: "titleKg", type: "input", span: 12 },
        { label: "titleRu", type: "input", span: 12 },
        { label: "titleEn", type: "input", span: 12 },
        { label: "link", type: "input", span: 12 },
    ]

    useEffect(() => {
        fetchReference()
    }, [])
    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter={24}>
                <Grid.Col>
                    <AppSelect searchable
                        label={t("form.label.type")}
                        data={socialLinksReferences}
                        {...form.getInputProps("typeId")}
                        value={`${form.values.typeId}`}
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
                <Grid.Col>
                    <AppDropzone
                        handleDeleteFile={handleDeleteFile("photoAttachment")}
                        aspectRatio={4 / 3}
                        maxFiles={1}
                        fileType="image"
                        label={t("form.label.photoAttachments")}
                        handleSaveCroped={handleSaveCropedFiles}
                        attachments={form.values?.photoAttachment?.attachment ? [form.values?.photoAttachment?.attachment] : []}
                        {...form.getInputProps("photoAttachment.toCreate")}
                    />
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
