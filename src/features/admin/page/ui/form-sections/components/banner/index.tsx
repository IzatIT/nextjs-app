"use client"
import { PageForm } from "@/entities"
import { InfoBlockLinksForm } from "@/features"
import { AppButton, AppDropzone, AppInput, AppTextEdtior } from "@/shared"
import { Grid, Text } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { IconTrash } from "@tabler/icons-react"
import { useTranslations } from "next-intl"


type InfoBlockFormAttachmentTypes = "photoAttachments" | "fileAttachments"
type Props = {
    form: UseFormReturnType<PageForm, (values: PageForm) => PageForm>
    parentIndex: number
}
export const PageBannerFormFeature = ({ form, parentIndex }: Props) => {
    const t = useTranslations()

    const handleDeleteFile = (type: InfoBlockFormAttachmentTypes) => ({
        group,
        index,
        id
    }: HandleDeleteFileArgs) => {
        switch (group) {
            case "attachment": {
                if (id) {
                    form.removeListItem(`bannerContent.toCreate.${parentIndex}.${type}.attachments`, index)
                    form.removeListItem(`bannerContent.toCreate.${parentIndex}.${type}.toDelete`, id)
                }
                return;
            }
            case "file": {
                if (!id) {
                    form.removeListItem(`bannerContent.toCreate.${parentIndex}.${type}.toCreate`, index)
                }
                return;
            }
        }
    }

    const handleReOrderFile = (type: InfoBlockFormAttachmentTypes) => ({ from, to, group }: HandleReOrderArgs) => {
        if (group === "file") {
            form.reorderListItem(`bannerContent.toCreate.${parentIndex}.${type}.toCreate`, { from, to });
        } else if (group === "attachment") {
            const item = form.values?.bannerContent?.toCreate?.[parentIndex]?.[type]?.attachments?.[from];
            if (item) {
                form.insertListItem(`bannerContent.toCreate.${parentIndex}.${type}.toUpdate`, { id: item.id, order: to });
                form.reorderListItem(`bannerContent.toCreate.${parentIndex}.${type}.attachments`, { from, to });
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
                    form.removeListItem(`bannerContent.toCreate.${parentIndex}.photoAttachments.attachments`, index)
                    form.insertListItem(`bannerContent.toCreate.${parentIndex}.photoAttachments.toDelete`, id)
                    form.insertListItem(`bannerContent.toCreate.${parentIndex}.photoAttachments.toCreate`, file)
                }
                return;
            }
            case "file": {
                if (!id) {
                    form.removeListItem(`bannerContent.toCreate.${parentIndex}.photoAttachments.toCreate`, index)
                    form.insertListItem(`bannerContent.toCreate.${parentIndex}.photoAttachments.toCreate`, file, index)
                }
                return;
            }
        }
    }

    const formFields = [
        { label: "order", formPath: `bannerContent.toCreate.${parentIndex}.order`, type: "input", span: 12 },
        { label: "titleKg", formPath: `bannerContent.toCreate.${parentIndex}.titleKg`, type: "input", span: 12 },
        { label: "titleRu", formPath: `bannerContent.toCreate.${parentIndex}.titleRu`, type: "input", span: 12 },
        { label: "titleEn", formPath: `bannerContent.toCreate.${parentIndex}.titleEn`, type: "input", span: 12 },
        { label: "contentKg", formPath: `bannerContent.toCreate.${parentIndex}.contentKg`, type: "input", span: 12 },
        { label: "contentRu", formPath: `bannerContent.toCreate.${parentIndex}.contentRu`, type: "input", span: 12 },
        { label: "contentEn", formPath: `bannerContent.toCreate.${parentIndex}.contentEn`, type: "input", span: 12 },
        { label: "textKg", formPath: `bannerContent.toCreate.${parentIndex}.textKg`, type: "input", span: 12 },
        { label: "textRu", formPath: `bannerContent.toCreate.${parentIndex}.textRu`, type: "input", span: 12 },
        { label: "textEn", formPath: `bannerContent.toCreate.${parentIndex}.textEn`, type: "input", span: 12 },
    ]

    const handleDeleteBannerItem = () => {
        const id = form.values.bannerContent.toCreate?.[parentIndex]?.id
        if (id) {
            form.insertListItem(`bannerContent.toDelete`, id)
        }
        form.removeListItem(`bannerContent.toCreate`, parentIndex)
    }

    return (
        <>
            <Text style={{ cursor: "pointer" }} fz={18} c="orange" onClick={handleDeleteBannerItem}>
                {t("button.delete")}
            </Text>
            <Grid w="100%" mt={15}>
                {/* {formFields.map((field, index) => (
                    <Grid.Col key={index} span={field.span}>
                        {field.type === "input" ? (
                            <AppInput
                                label={t(`form.label.${field.label}`)}
                                {...form.getInputProps(field.formPath)} />
                        ) : (
                            <AppTextEdtior
                                label={t(`form.label.${field.label}`)}
                                {...form.getInputProps(field.formPath)}
                            />
                        )}
                    </Grid.Col>
                ))}
                <InfoBlockLinksForm<PageForm>
                    path={`bannerContent.toCreate.${parentIndex}.`}
                    links={form.values.bannerContent.toCreate?.[parentIndex].links}
                    form={form} /> */}
                <Grid.Col>
                    <AppDropzone
                        aspectRatio={16 / 9}
                        fileType="image"
                        handleDeleteFile={handleDeleteFile("photoAttachments")}
                        label={t("form.label.photoAttachments")}
                        handleSaveCroped={handleSaveCropedFiles}
                        handleReOrder={handleReOrderFile("photoAttachments")}
                        attachments={form.values?.bannerContent?.toCreate?.[parentIndex]?.photoAttachments?.attachments}
                        {...form.getInputProps(`bannerContent.toCreate.${parentIndex}.photoAttachments.toCreate`)}
                    />
                </Grid.Col>
                {/* <Grid.Col>
                    <AppDropzone
                        fileType="document"
                        handleDeleteFile={handleDeleteFile("fileAttachments")}
                        label={t("form.label.fileAttachments")}
                        handleReOrder={handleReOrderFile("fileAttachments")}
                        attachments={form.values?.bannerContent?.toCreate?.[parentIndex]?.fileAttachments?.attachments}
                        {...form.getInputProps(`bannerContent.toCreate.${parentIndex}.fileAttachments.toCreate`)}
                    />
                </Grid.Col> */}
            </Grid>
        </>
    )
}
