import { News, NewsFilter, NewsForm } from '@/entities';
import { DateTime } from '@/shared';
import { getFormType } from '@/types';


export const getNewsFilterForm: getFormType<NewsFilter, NewsFilter> = (params?: NewsFilter) => {
    const initialValues: NewsFilter = {
        active: params?.active,
        onSlider: params?.onSlider,
        includedInMailing: params?.includedInMailing,
        title: params?.title,
        content: params?.content,
        categories: params?.categories,
        regionId: params?.regionId,
        tags: params?.tags,
        countries: params?.countries,
        publishedAt: params?.publishedAt ? new Date(params.publishedAt) : undefined,
        publishAt: params?.publishAt ? new Date(params.publishAt) : undefined,
    }
    return {
        initialValues
    }
}

export const getNewsForm: getFormType<NewsForm, News> = (values, t) => {
    const initialValues: NewsForm = {
        id: values?.id,
        active: values?.active === undefined ? true : values.active,
        isMain: values?.isMain === undefined ? true : values.isMain,
        includedInMailing: values?.includedInMailing === undefined ? true : values.includedInMailing,
        publishedAt: DateTime.GetDateFromString(values?.publishedAt),
        plannedTo: values?.plannedTo ? DateTime.GetDateFromString(values?.plannedTo) : undefined,
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        titleEn: values?.titleEn || "",
        contentKg: values?.contentKg || "",
        contentRu: values?.contentRu || "",
        contentEn: values?.contentEn || "",
        videoLinks: values?.videoLinks || [],
        categoriesIds: values?.categories?.map(el => el.id) || [],
        tagsIds: values?.tags?.map(el => el.id) || [],
        countriesIds: values?.countries?.map(el => el.id) || [],
        regionId: values?.region?.id,
        fileAttachmentsKg: {
            attachments: values?.fileAttachmentsKg,
            toUpdate: [],
            toDelete: [],
            toCreate: [],
        },
        fileAttachmentsRu: {
            attachments: values?.fileAttachmentsRu,
            toUpdate: [],
            toDelete: [],
            toCreate: [],
        },
        fileAttachmentsEn: {
            attachments: values?.fileAttachmentsEn,
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
        audioAttachments: {
            attachments: values?.audioAttachments,
            toUpdate: [],
            toDelete: [],
            toCreate: [],
        },
        videoAttachments: {
            attachments: values?.videoAttachments,
            toUpdate: [],
            toDelete: [],
            toCreate: [],
        },
    }

    return {
        initialValues,
        validate: {
            titleKg: (value) => !value && t && t("form.error.required"),
            titleRu: (value) => !value && t && t("form.error.required"),
            publishedAt: (value) => !value && t && t("form.error.required"),
        }
    }
}