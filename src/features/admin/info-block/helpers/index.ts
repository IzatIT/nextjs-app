import { InfoBlock, InfoBlockFilter, InfoBlockForm, Reference } from '@/entities';
import { getFormType } from '@/types';


export const getInfoBlockFilterForm: getFormType<InfoBlockFilter, InfoBlockFilter> =
    (params?: InfoBlockFilter) => {
        const initialValues: InfoBlockFilter = {
            title: params?.title,
            typeId: params?.typeId,
        }
        return { initialValues }
    }


export const getInfoBlockForm: getFormType<InfoBlockForm, InfoBlock> = (values, t) => {
    const initialValues: InfoBlockForm = {
        id: values?.id,
        contentEn: values?.contentEn || "",
        contentKg: values?.contentKg || "",
        contentRu: values?.contentRu || "",
        links: values?.links || [],
        order: values?.order || 1,
        textEn: values?.textEn || "",
        textKg: values?.textKg || "",
        textRu: values?.textRu || "",
        titleEn: values?.titleEn || "",
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        typeId: values?.type?.id,
        regionId: values?.region?.id,
        fileAttachments: {
            attachments: values?.fileAttachments,
            toUpdate: [],
            toDelete: [],
            toCreate: [],
        },
        photoAttachments: {
            attachments: values?.photoAttachments,
            toUpdate: [],
            toDelete: [],
            toCreate: [],
        },
    }

    return {
        initialValues,
        validate: {

        }
    }
}

export type FieldType = {
    label: string;
    type: string;
    formKey: string;
    span: number
}

