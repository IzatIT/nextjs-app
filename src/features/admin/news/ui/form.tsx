"use client"
import { createNews, getReferenceByTypeCode, News, NewsForm, Reference, ReferenceTypeCodesEnum, updateNews } from "@/entities"
import { AppButton, AppButtonGroup, AppCheckBox, AppDateInput, AppDropzone, AppInput, AppMultySelect, AppSelect, AppTextEdtior, Content } from "@/shared"
import { Box, Center, CheckIcon, Flex, Grid, Title } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { getNewsForm } from "../helpers"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { COLORS } from "@/constants"
import uniqid from "uniqid"

type Props = {
    data?: News
}

type NewsFormAttachmentTypes = "photoAttachments" | "fileAttachmentsEn" | "fileAttachmentsKg" | "fileAttachmentsRu" | "audioAttachments" | "videoAttachments"

export const NewsFormFeature = ({ data }: Props) => {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations()
    const [loading, setLoading] = useState(false)
    const [countries, setCountries] = useState<SearchResponse<Reference>>()
    const [categories, setCategories] = useState<SearchResponse<Reference>>()
    const [tags, setTags] = useState<SearchResponse<Reference>>()
    const [regions, setRegions] = useState<SearchResponse<Reference>>()

    const form = useForm(getNewsForm(data, t));

    const fetchCountries = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_COUNTRIES })
        setCountries(res)
    }
    const fetchCategories = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_NEWS_CATEGORY })
        setCategories(res)
    }
    const fetchTags = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_NEWS_TAG })
        setTags(res)
    }
    const fetchRegions = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_REGIONS })
        setRegions(res)
    }

    const countriesSelectDto = useMemo(() => {
        return countries?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [countries?.content, locale])

    const categoriesSelectDto = useMemo(() => {
        return categories?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [categories?.content, locale])

    const tagsSelectDto = useMemo(() => {
        return tags?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [tags?.content, locale])

    const regionsSelectDto = useMemo(() => {
        return regions?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [regions?.content, locale])

    const handleSubmit = async (values: NewsForm) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateNews(values)
        } else {
            res = await createNews(values)
        }
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/news`)
        }
    }

    const addNewVideoLink = () => {
        form.insertListItem("videoLinks", "")
    }

    const handleSaveAsNew = async () => {
        const res = await createNews(form.values)
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/news`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router.push(`/${locale}/admin/news`)
    }


    const handleDeleteFile = (type: NewsFormAttachmentTypes) => ({
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

    const handleReOrderFile = (type: NewsFormAttachmentTypes) => ({ from, to, group }: HandleReOrderArgs) => {
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

    const formFields = [
        { label: "active", type: "checkbox", span: 12 },
        { label: "isMain", type: "checkbox", span: 12 },
        { label: "includedInMailing", type: "checkbox", span: 12 },
        { label: "publishedAt", type: "date", span: { base: 12, sm: 6 } },
        { label: "plannedTo", type: "date", span: { base: 12, sm: 6 } },
        { label: "titleKg", type: "input", span: 12 },
        { label: "titleRu", type: "input", span: 12 },
        { label: "titleEn", type: "input", span: 12 },
        { label: "contentKg", type: "textEditor", span: 12 },
        { label: "contentRu", type: "textEditor", span: 12 },
        { label: "contentEn", type: "textEditor", span: 12 },
    ]

    useEffect(() => {
        Promise.all([fetchCountries(), fetchCategories(), fetchTags(), fetchRegions()])
    }, [])
    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter={24}>
                <Grid.Col>
                    <AppSelect searchable
                        label={t("form.label.region")}
                        data={regionsSelectDto}
                        {...form.getInputProps("regionId")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppMultySelect searchable
                        label={t("form.label.countries")}
                        data={countriesSelectDto}
                        {...form.getInputProps("countriesIds")}
                        value={form.values.countriesIds?.map(el => el.toString())}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppMultySelect searchable
                        label={t("form.label.categories")}
                        data={categoriesSelectDto}
                        {...form.getInputProps("categoriesIds")}
                        value={form.values.categoriesIds?.map(el => el.toString())}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppMultySelect searchable
                        label={t("form.label.tags")}
                        data={tagsSelectDto}
                        {...form.getInputProps("tagsIds")}
                        value={form.values.tagsIds?.map(el => el.toString())}
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
                    <Title c={COLORS.PRIMARY_COLOR} fz={{ base: 18, sm: 24 }} ta="center">
                        {t("section.titles.videoLinks")}
                    </Title>
                    <Grid >
                        {form.values?.videoLinks?.map((_, index) => (
                            <VideoLinksItem key={index} form={form} index={index} />
                        ))}
                    </Grid>
                    <Box mt={16}>
                        <AppButton onClick={addNewVideoLink} variant="filter">
                            <IconPlus size={20} />
                        </AppButton>
                    </Box>
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        aspectRatio={16 / 9}
                        fileType="image"
                        handleDeleteFile={handleDeleteFile("photoAttachments")}
                        label={t("form.label.photoAttachments")}
                        handleSaveCroped={handleSaveCropedFiles}
                        handleReOrder={handleReOrderFile("photoAttachments")}
                        attachments={form.values.photoAttachments.attachments}
                        {...form.getInputProps("photoAttachments.toCreate")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        fileType="video"
                        handleDeleteFile={handleDeleteFile("videoAttachments")}
                        label={t("form.label.videoAttachments")}
                        handleReOrder={handleReOrderFile("videoAttachments")}
                        attachments={form.values.videoAttachments.attachments}
                        {...form.getInputProps("videoAttachments.toCreate")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        fileType="audio"
                        handleDeleteFile={handleDeleteFile("audioAttachments")}
                        label={t("form.label.audioAttachments")}
                        handleReOrder={handleReOrderFile("audioAttachments")}
                        attachments={form.values.audioAttachments.attachments}
                        {...form.getInputProps("audioAttachments.toCreate")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        fileType="document"
                        handleDeleteFile={handleDeleteFile("fileAttachmentsKg")}
                        label={t("form.label.fileAttachmentsKg")}
                        handleReOrder={handleReOrderFile("fileAttachmentsKg")}
                        attachments={form.values.fileAttachmentsKg.attachments}
                        {...form.getInputProps("fileAttachmentsKg.toCreate")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        fileType="document"
                        handleDeleteFile={handleDeleteFile("fileAttachmentsRu")}
                        label={t("form.label.fileAttachmentsRu")}
                        handleReOrder={handleReOrderFile("fileAttachmentsRu")}
                        attachments={form.values.fileAttachmentsRu.attachments}
                        {...form.getInputProps("fileAttachmentsRu.toCreate")}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        fileType="document"
                        handleDeleteFile={handleDeleteFile("fileAttachmentsEn")}
                        label={t("form.label.fileAttachmentsEn")}
                        handleReOrder={handleReOrderFile("fileAttachmentsEn")}
                        attachments={form.values.fileAttachmentsEn.attachments}
                        {...form.getInputProps("fileAttachmentsEn.toCreate")}
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

type VideoLinksItemProps = {
    form: UseFormReturnType<NewsForm, (values: NewsForm) => NewsForm>;
    index: number
}

const VideoLinksItem = ({ form, index }: VideoLinksItemProps) => {
    const [newIndex, setNewIndex] = useState<number>(index);
    const changed = newIndex !== index;
    const length = form.values.videoLinks.length
    const removeListItem = (index: number) => () => {
        form.removeListItem("videoLinks", index)
    }

    const reorderListItem = (args: { from: number, to: number }) => {
        form.reorderListItem("videoLinks", args)
    }

    const handleOnChangeIndex = (event: ChangeEvent<HTMLInputElement>) => {
        if (length) {
            const idx = parseInt(event.target.value);
            setNewIndex(idx > length ? length - 1 : idx - 1 || 0);
        }
    };

    return (
        <Grid.Col key={index}>
            <Flex gap={10} align="center">
                <Flex gap={5}>
                    <Box w={90}>
                        <AppInput minNumber={0}
                            onChange={handleOnChangeIndex}
                            value={newIndex + 1}
                        />
                    </Box>
                    <AppButton disabled={!changed} variant={changed ? "filter" : "submit"}
                        onClick={() => changed && reorderListItem({ from: index, to: newIndex })}>
                        <CheckIcon size={20} />
                    </AppButton>
                </Flex>
                <Box w="80%">
                    <AppInput
                        {...form.getInputProps(`videoLinks.${index}`)} />
                </Box>
                <AppButton onClick={removeListItem(index)} variant="reset">
                    <IconTrash color="orange" size={24} />
                </AppButton>
            </Flex>
        </Grid.Col>
    )
}