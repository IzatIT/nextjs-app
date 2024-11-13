"use client"
import { PageForm } from "@/entities"
import { InfoBlockLinksForm } from "@/features"
import { AppDropzone, AppInput, AppTextEdtior } from "@/shared"
import { Grid, Text } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useTranslations } from "next-intl"


type InfoBlockFormAttachmentTypes = "photoAttachments" | "fileAttachments"
type Props = {
    form: UseFormReturnType<PageForm, (values: PageForm) => PageForm>
    parentIndex: number
}
export const PageCardFormFeature = ({ form, parentIndex }: Props) => {
    const t = useTranslations()

    // const handleDeleteFile = (type: InfoBlockFormAttachmentTypes) => ({
    //     group,
    //     index,
    //     id
    // }: HandleDeleteFileArgs) => {
    //     switch (group) {
    //         case "attachment": {
    //             if (id) {
    //                 form.removeListItem(`cardContent.toCreate.${parentIndex}.${type}.attachments`, index)
    //                 form.removeListItem(`cardContent.toCreate.${parentIndex}.${type}.toDelete`, id)
    //             }
    //             return;
    //         }
    //         case "file": {
    //             if (!id) {
    //                 form.removeListItem(`cardContent.toCreate.${parentIndex}.${type}.toCreate`, index)
    //             }
    //             return;
    //         }
    //     }
    // }

    // const handleReOrderFile = (type: InfoBlockFormAttachmentTypes) => ({ from, to, group }: HandleReOrderArgs) => {
    //     if (group === "file") {
    //         form.reorderListItem(`cardContent.toCreate.${parentIndex}.${type}.toCreate`, { from, to });
    //     } else if (group === "attachment") {
    //         const item = form.values?.cardContent?.toCreate?.[parentIndex]?.[type]?.attachments?.[from];
    //         if (item) {
    //             form.insertListItem(`cardContent.toCreate.${parentIndex}.${type}.toUpdate`, { id: item.id, order: to });
    //             form.reorderListItem(`cardContent.toCreate.${parentIndex}.${type}.attachments`, { from, to });
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
    //                 form.removeListItem(`cardContent.toCreate.${parentIndex}.photoAttachments.attachments`, index)
    //                 form.insertListItem(`cardContent.toCreate.${parentIndex}.photoAttachments.toDelete`, id)
    //                 form.insertListItem(`cardContent.toCreate.${parentIndex}.photoAttachments.toCreate`, file)
    //             }
    //             return;
    //         }
    //         case "file": {
    //             if (!id) {
    //                 form.removeListItem(`cardContent.toCreate.${parentIndex}.photoAttachments.toCreate`, index)
    //                 form.insertListItem(`cardContent.toCreate.${parentIndex}.photoAttachments.toCreate`, file, index)
    //             }
    //             return;
    //         }
    //     }
    // }

    const formFields = [
        { label: "order", formPath: `cardContent.toCreate.${parentIndex}.order`, type: "input", span: 12 },
        { label: "titleKg", formPath: `cardContent.toCreate.${parentIndex}.titleKg`, type: "input", span: 12 },
        { label: "titleRu", formPath: `cardContent.toCreate.${parentIndex}.titleRu`, type: "input", span: 12 },
        { label: "titleEn", formPath: `cardContent.toCreate.${parentIndex}.titleEn`, type: "input", span: 12 },
         // { label: "contentKg", formPath: `cardContent.toCreate.${parentIndex}.contentKg`, type: "textEditor", span: 12 },
         // { label: "contentRu", formPath: `cardContent.toCreate.${parentIndex}.contentRu`, type: "textEditor", span: 12 },
         // { label: "contentEn", formPath: `cardContent.toCreate.${parentIndex}.contentEn`, type: "textEditor", span: 12 },
        // { label: "textKg", formPath: `cardContent.toCreate.${parentIndex}.textKg`, type: "input", span: 12 },
        // { label: "textRu", formPath: `cardContent.toCreate.${parentIndex}.textRu`, type: "input", span: 12 },
        // { label: "textEn", formPath: `cardContent.toCreate.${parentIndex}.textEn`, type: "input", span: 12 },
    ]

    const handleDeleteBannerItem = () => {
        const id = form.values.cardContent.toCreate?.[parentIndex]?.id
        if (id) {
            form.insertListItem(`cardContent.toDelete`, id)
        }
        form.removeListItem(`cardContent.toCreate`, parentIndex)
    }

    return (
        <>
            <Text style={{ cursor: "pointer" }} fz={18} c="orange" onClick={handleDeleteBannerItem}>
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
                    withContent
                    linksTitle={t("table.titles.accordion")}
                    path={`cardContent.toCreate.${parentIndex}.`}
                    links={form.values.cardContent.toCreate?.[parentIndex].links}
                    form={form} />
                {/* <Grid.Col>
                    <AppDropzone
                        aspectRatio={16 / 9}
                        fileType="image"
                        handleDeleteFile={handleDeleteFile("photoAttachments")}
                        label={t("form.label.photoAttachments")}
                        handleSaveCroped={handleSaveCropedFiles}
                        handleReOrder={handleReOrderFile("photoAttachments")}
                        attachments={form.values?.cardContent?.toCreate?.[parentIndex]?.photoAttachments?.attachments}
                        {...form.getInputProps(`cardContent.toCreate.${parentIndex}.photoAttachments.toCreate`)}
                    />
                </Grid.Col>
                <Grid.Col>
                    <AppDropzone
                        fileType="document"
                        handleDeleteFile={handleDeleteFile("fileAttachments")}
                        label={t("form.label.fileAttachments")}
                        handleReOrder={handleReOrderFile("fileAttachments")}
                        attachments={form.values?.cardContent?.toCreate?.[parentIndex]?.fileAttachments?.attachments}
                        {...form.getInputProps(`cardContent.toCreate.${parentIndex}.fileAttachments.toCreate`)}
                    />
                </Grid.Col> */}
            </Grid>
        </>
    )
}
