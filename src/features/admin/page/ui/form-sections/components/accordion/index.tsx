"use client"
import { PageForm } from "@/entities"
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
export const PageAccordionFormFeature = ({ form, parentIndex }: Props) => {
    const t = useTranslations()

    // const handleDeleteFile = (type: InfoBlockFormAttachmentTypes) => ({
    //     group,
    //     index,
    //     id
    // }: HandleDeleteFileArgs) => {
    //     switch (group) {
    //         case "attachment": {
    //             if (id) {
    //                 form.removeListItem(`accordionContent.toCreate.${parentIndex}.${type}.attachments`, index)
    //                 form.removeListItem(`accordionContent.toCreate.${parentIndex}.${type}.toDelete`, id)
    //             }
    //             return;
    //         }
    //         case "file": {
    //             if (!id) {
    //                 form.removeListItem(`accordionContent.toCreate.${parentIndex}.${type}.toCreate`, index)
    //             }
    //             return;
    //         }
    //     }
    // }

    // const handleReOrderFile = (type: InfoBlockFormAttachmentTypes) => ({ from, to, group }: HandleReOrderArgs) => {
    //     if (group === "file") {
    //         form.reorderListItem(`accordionContent.toCreate.${parentIndex}.${type}.toCreate`, { from, to });
    //     } else if (group === "attachment") {
    //         const item = form.values?.accordionContent?.toCreate?.[parentIndex]?.[type]?.attachments?.[from];
    //         if (item) {
    //             form.insertListItem(`accordionContent.toCreate.${parentIndex}.${type}.toUpdate`, { id: item.id, order: to });
    //             form.reorderListItem(`accordionContent.toCreate.${parentIndex}.${type}.attachments`, { from, to });
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
    //                 form.removeListItem(`accordionContent.toCreate.${parentIndex}.photoAttachments.attachments`, index)
    //                 form.insertListItem(`accordionContent.toCreate.${parentIndex}.photoAttachments.toDelete`, id)
    //                 form.insertListItem(`accordionContent.toCreate.${parentIndex}.photoAttachments.toCreate`, file)
    //             }
    //             return;
    //         }
    //         case "file": {
    //             if (!id) {
    //                 form.removeListItem(`accordionContent.toCreate.${parentIndex}.photoAttachments.toCreate`, index)
    //                 form.insertListItem(`accordionContent.toCreate.${parentIndex}.photoAttachments.toCreate`, file, index)
    //             }
    //             return;
    //         }
    //     }
    // }

    const formFields = [
        { label: "order", formPath: `accordionContent.toCreate.${parentIndex}.order`, type: "input", span: 12 },
        { label: "titleKg", formPath: `accordionContent.toCreate.${parentIndex}.titleKg`, type: "input", span: 12 },
        { label: "titleRu", formPath: `accordionContent.toCreate.${parentIndex}.titleRu`, type: "input", span: 12 },
        { label: "titleEn", formPath: `accordionContent.toCreate.${parentIndex}.titleEn`, type: "input", span: 12 },
        { label: "contentKg", formPath: `accordionContent.toCreate.${parentIndex}.contentKg`, type: "textEditor", span: 12 },
        { label: "contentRu", formPath: `accordionContent.toCreate.${parentIndex}.contentRu`, type: "textEditor", span: 12 },
        { label: "contentEn", formPath: `accordionContent.toCreate.${parentIndex}.contentEn`, type: "textEditor", span: 12 },
    ]

    const handleDeleteAccordionItem = () => {
        const id = form.values.accordionContent.toCreate?.[parentIndex]?.id
        if (id) {
            form.insertListItem(`accordionContent.toDelete`, id)
        }
        form.removeListItem(`accordionContent.toCreate`, parentIndex)
    }

    return (
        <>
            <Text style={{ cursor: "pointer" }} fz={18} c="orange" onClick={handleDeleteAccordionItem}>
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
                {/* <Grid.Col>
                    <AppDropzone
                        aspectRatio={16 / 9}
                        fileType="image"
                        handleDeleteFile={handleDeleteFile("photoAttachments")}
                        label={t("form.label.photoAttachments")}
                        handleSaveCroped={handleSaveCropedFiles}
                        handleReOrder={handleReOrderFile("photoAttachments")}
                        attachments={form.values?.accordionContent?.toCreate?.[parentIndex]?.photoAttachments?.attachments}
                        {...form.getInputProps(`accordionContent.toCreate.${parentIndex}.photoAttachments.toCreate`)}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        fileType="document"
                        handleDeleteFile={handleDeleteFile("fileAttachments")}
                        label={t("form.label.fileAttachments")}
                        handleReOrder={handleReOrderFile("fileAttachments")}
                        attachments={form.values?.accordionContent?.toCreate?.[parentIndex]?.fileAttachments?.attachments}
                        {...form.getInputProps(`accordionContent.toCreate.${parentIndex}.fileAttachments.toCreate`)}
                    />
                </Grid.Col> */}
            </Grid>
        </>
    )
}
