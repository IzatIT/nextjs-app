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
export const PageLinkFormFeature = ({ form, parentIndex }: Props) => {
    const t = useTranslations()

    // const handleDeleteFile = (type: InfoBlockFormAttachmentTypes) => ({
    //     group,
    //     index,
    //     id
    // }: HandleDeleteFileArgs) => {
    //     switch (group) {
    //         case "attachment": {
    //             if (id) {
    //                 form.removeListItem(`linkContent.toCreate.${parentIndex}.${type}.attachments`, index)
    //                 form.removeListItem(`linkContent.toCreate.${parentIndex}.${type}.toDelete`, id)
    //             }
    //             return;
    //         }
    //         case "file": {
    //             if (!id) {
    //                 form.removeListItem(`linkContent.toCreate.${parentIndex}.${type}.toCreate`, index)
    //             }
    //             return;
    //         }
    //     }
    // }

    // const handleReOrderFile = (type: InfoBlockFormAttachmentTypes) => ({ from, to, group }: HandleReOrderArgs) => {
    //     if (group === "file") {
    //         form.reorderListItem(`linkContent.toCreate.${parentIndex}.${type}.toCreate`, { from, to });
    //     } else if (group === "attachment") {
    //         const item = form.values?.linkContent?.toCreate?.[parentIndex]?.[type]?.attachments?.[from];
    //         if (item) {
    //             form.insertListItem(`linkContent.toCreate.${parentIndex}.${type}.toUpdate`, { id: item.id, order: to });
    //             form.reorderListItem(`linkContent.toCreate.${parentIndex}.${type}.attachments`, { from, to });
    //         }
    //     }
    // };

    // const handleSaveCropedFiles = ({
    //     file,
    //     group,
    //     index,
    //     id
    // }: HandleSaveCropedArgs) => {
    //     switch (group) {
    //         case "attachment": {
    //             if (id) {
    //                 form.removeListItem(`linkContent.toCreate.${parentIndex}.photoAttachments.attachments`, index)
    //                 form.insertListItem(`linkContent.toCreate.${parentIndex}.photoAttachments.toDelete`, id)
    //                 form.insertListItem(`linkContent.toCreate.${parentIndex}.photoAttachments.toCreate`, file)
    //             }
    //             return;
    //         }
    //         case "file": {
    //             if (!id) {
    //                 form.removeListItem(`linkContent.toCreate.${parentIndex}.photoAttachments.toCreate`, index)
    //                 form.insertListItem(`linkContent.toCreate.${parentIndex}.photoAttachments.toCreate`, file, index)
    //             }
    //             return;
    //         }
    //     }
    // }

    const formFields = [
        { label: "order", formPath: `linkContent.toCreate.${parentIndex}.order`, type: "input", span: 12 },
        { label: "titleKg", formPath: `linkContent.toCreate.${parentIndex}.titleKg`, type: "input", span: 12 },
        { label: "titleRu", formPath: `linkContent.toCreate.${parentIndex}.titleRu`, type: "input", span: 12 },
        { label: "titleEn", formPath: `linkContent.toCreate.${parentIndex}.titleEn`, type: "input", span: 12 },
        { label: "contentKg", formPath: `linkContent.toCreate.${parentIndex}.contentKg`, type: "input", span: 12 },
        { label: "contentRu", formPath: `linkContent.toCreate.${parentIndex}.contentRu`, type: "input", span: 12 },
        { label: "contentEn", formPath: `linkContent.toCreate.${parentIndex}.contentEn`, type: "input", span: 12 },
    ]

    const handleDeleteLinkItem = () => {
        const id = form.values.linkContent.toCreate?.[parentIndex]?.id
        if (id) {
            form.insertListItem(`linkContent.toDelete`, id)
        }
        form.removeListItem(`linkContent.toCreate`, parentIndex)
    }

    return (
        <>
            <Text style={{ cursor: "pointer" }} fz={18} c="orange" onClick={handleDeleteLinkItem}>
                {t("button.delete")}
            </Text>
            <Grid mt={15}>
                {formFields.map((field, index) => (
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
                    path={`linkContent.toCreate.${parentIndex}.`}
                    links={form.values.linkContent.toCreate?.[parentIndex].links}
                    form={form} />
                {/* <Grid.Col>
                    <AppDropzone
                        aspectRatio={16 / 9}
                        fileType="image"
                        handleDeleteFile={handleDeleteFile("photoAttachments")}
                        label={t("form.label.photoAttachments")}
                        handleSaveCroped={handleSaveCropedFiles}
                        handleReOrder={handleReOrderFile("photoAttachments")}
                        attachments={form.values?.linkContent?.toCreate?.[parentIndex]?.photoAttachments?.attachments}
                        {...form.getInputProps(`linkContent.toCreate.${parentIndex}.photoAttachments.toCreate`)}
                    />
                </Grid.Col> */}
            </Grid>
        </>
    )
}
