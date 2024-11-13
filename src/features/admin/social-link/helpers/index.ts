import { SocialLink, SocialLinkFilter, SocialLinkForm } from '@/entities';
import { getFormType } from '@/types';


export const getSociallinkFilterForm: getFormType<SocialLinkFilter, SocialLinkFilter> =
    (params?: SocialLinkFilter) => {
        const initialValues: SocialLinkFilter = {
            title: params?.title,
            typeId: params?.typeId,
        }
        return { initialValues }
    }

export const getSocialLinkForm: getFormType<SocialLinkForm, SocialLink> = (values, t) => {
    const initialValues: SocialLinkForm = {
        id: values?.id,
        order: values?.order || 10,
        titleEn: values?.titleEn || "",
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        typeId: values?.type?.id,
        link: values?.link || "",
        photoAttachment: {
            attachment: values?.photoAttachment,
            toCreate: []
        },
    }

    return {
        initialValues,
        validate: {
            titleKg: (value) => !value && t && t("form.error.required"),
            titleRu: (value) => !value && t && t("form.error.required"),
        }
    }
}