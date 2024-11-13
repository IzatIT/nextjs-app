import { Page, PageFilter, PageForm } from '@/entities';
import { getFormType } from '@/types';
import { PAGE_COMPONENTS, PageComponentsType } from '../ui/configuration';
import { getInfoBlockForm } from '../../info-block';
import { UseFormReturnType } from '@mantine/form';


export const getPageFilterForm: getFormType<PageFilter, PageFilter> =
    (params?: PageFilter) => {
        const initialValues: PageFilter = {
            title: params?.title,
            typeId: params?.typeId,
        }
        return { initialValues }
    }


export const getPageForm: getFormType<PageForm, Page> = (values, t) => {
    const initialValues: PageForm = {
        id: values?.id,
        parentId: values?.parentId,
        order: values?.order || 20,
        path: values?.path || "",
        typeId: values?.type?.id,
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        titleEn: values?.titleEn || "",
        descriptionKg: values?.descriptionKg || "",
        descriptionRu: values?.descriptionRu || "",
        descriptionEn: values?.descriptionEn || "",
        bannerContent: {
            toCreate: values?.bannerContent?.map(el => ({
                ...el,
                photoAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.photoAttachments || [],
                    empty: false,
                },
                fileAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.fileAttachments || [],
                    empty: false,
                }
            })) || [],
            toUpdate: [],
            toDelete: [],
            empty: false
        },
        documentContent: {
            toCreate: values?.documentContent?.map(el => ({
                ...el,
                photoAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.photoAttachments || [],
                    empty: false,
                },
                fileAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.fileAttachments || [],
                    empty: false,
                }
            })) || [],
            toUpdate: [],
            toDelete: [],
            empty: false
        },
        accordionContent: {
            toCreate: values?.accordionContent?.map(el => ({
                ...el,
                photoAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.photoAttachments || [],
                    empty: false,
                },
                fileAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.fileAttachments || [],
                    empty: false,
                }
            })) || [],
            toUpdate: [],
            toDelete: [],
            empty: false
        },
        linkContent: {
            toCreate: values?.linkContent?.map(el => ({
                ...el,
                photoAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.photoAttachments || [],
                    empty: false,
                },
                fileAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.fileAttachments || [],
                    empty: false,
                }
            })) || [],
            toUpdate: [],
            toDelete: [],
            empty: false
        },
        cardContent: {
            toCreate: values?.cardContent?.map(el => ({
                ...el,
                photoAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.photoAttachments || [],
                    empty: false,
                },
                fileAttachments: {
                    toCreate: [],
                    toDelete: [],
                    toUpdate: [],
                    attachments: el.fileAttachments || [],
                    empty: false,
                }
            })) || [],
            toUpdate: [],
            toDelete: [],
            empty: false
        },
    }

    return {
        initialValues,
        validate: {
            titleKg: (value) => !value && t && t("form.error.required"),
            titleRu: (value) => !value && t && t("form.error.required"),
            path: (value) => !value && t && t("form.error.required"),
        }
    }
}

type HandleAddItemArgs = {
    type: PageComponentsType,
    handleChangeFormSection?: (a: PageComponentsType) => () => void;
    t: (a: string) => string
    form: UseFormReturnType<PageForm, (values: PageForm) => PageForm>
}

export const handleAddItem = ({
    type,
    form,
    handleChangeFormSection,
    t
}: HandleAddItemArgs) => {
    const contentsLength = form.values.documentContent.toCreate.length +
        form.values.bannerContent.toCreate.length +
        form.values.cardContent.toCreate.length +
        form.values.accordionContent.toCreate.length +
        form.values.linkContent.toCreate.length
    switch (type) {
        case PAGE_COMPONENTS.BANNER: {
            const initialValues = getInfoBlockForm({ order: contentsLength }, t).initialValues
            handleChangeFormSection && handleChangeFormSection(PAGE_COMPONENTS.BANNER)()
            form.insertListItem("bannerContent.toCreate", initialValues)
            break;
        }
        case PAGE_COMPONENTS.CARD_INFO: {
            const initialValues = getInfoBlockForm({ order: contentsLength }, t).initialValues
            handleChangeFormSection && handleChangeFormSection(PAGE_COMPONENTS.CARD_INFO)()
            form.insertListItem("cardContent.toCreate", initialValues)
            break;
        }
        case PAGE_COMPONENTS.DOCUMENT: {
            const initialValues = getInfoBlockForm({ order: contentsLength }, t).initialValues
            handleChangeFormSection && handleChangeFormSection(PAGE_COMPONENTS.DOCUMENT)()
            form.insertListItem("documentContent.toCreate", initialValues)
            break;
        }
        case PAGE_COMPONENTS.LINK: {
            const initialValues = getInfoBlockForm({ order: contentsLength }, t).initialValues
            handleChangeFormSection && handleChangeFormSection(PAGE_COMPONENTS.LINK)()
            form.insertListItem("linkContent.toCreate", initialValues)
            break;
        }
        case PAGE_COMPONENTS.ACCORDION: {
            const initialValues = getInfoBlockForm({ order: contentsLength }, t).initialValues
            handleChangeFormSection && handleChangeFormSection(PAGE_COMPONENTS.ACCORDION)()
            form.insertListItem("accordionContent.toCreate", initialValues)
            break;
        }
    }
}