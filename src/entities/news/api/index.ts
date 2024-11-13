import { createApi } from "@/constants";
import { api, DateTime, handleAxiosError, Notify } from "@/shared";
import { AttachmentUpdateRequest } from "@/types";
import { AxiosResponse } from "axios";
import { News, NewsForm, NewsSearchRequest } from "../model";

export class NewsPath {
    static get = (id: string | number) => createApi(`news/${id}`);
    static search = createApi(`news/search`);

    static delete = (id: number) => createApi(`news/${id}`);
    static create = createApi(`news`);
    static update = (id: number) => createApi(`news/${id}`);

    static subscribe = (email: string) => createApi(`news/subscription?email=${email}`);
    static unsubscribe = (email: string) => createApi(`news/unsubscription?email=${email}`);
}
export const getNews = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(NewsPath.get(id))
        return res.data as News
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const searchNews = async (body: NewsSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(NewsPath.search, { ...body })
        return res.data as SearchResponse<News>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const deleteNews = async (id: number, notifyOnError = true) => {
    try {
        await api.delete(NewsPath.delete(id));
        Notify.ShowSuccess();
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

const appendAttachments = (formData: FormData, key: string, attachments: AttachmentUpdateRequest) => {
    attachments?.toCreate?.forEach((el, index) => {
        formData.append(`${key}.toCreate[${index}].file`, el);
        formData.append(`${key}.toCreate[${index}].order`, `${index}`);
    });
    attachments?.toUpdate?.forEach((el, index) => {
        formData.append(`${key}.toUpdate[${index}].id`, `${el.id}`);
        formData.append(`${key}.toUpdate[${index}].order`, `${index}`);
    });
    attachments?.toDelete?.length && formData.append(`${key}.toDelete`, attachments.toDelete.toString());
};

const appendBasicData = (formData: FormData, data: NewsForm) => {
    const {
        active, isMain, includedInMailing, titleEn, titleKg, titleRu,
        contentEn, contentKg, contentRu, countriesIds, categoriesIds, tagsIds, regionId,
        plannedTo, publishedAt, videoLinks
    } = data;

    plannedTo && formData.append("plannedTo", DateTime.GetISOFromDate(plannedTo));
    publishedAt && formData.append("publishedAt", DateTime.GetISOFromDate(publishedAt));

    formData.append("active", `${active}`);
    formData.append("isMain", `${isMain}`);
    formData.append("includedInMailing", `${includedInMailing}`);
    formData.append("titleKg", titleKg);
    formData.append("titleRu", titleRu);
    titleEn && formData.append("titleEn", titleEn);
    contentEn && formData.append("contentEn", contentEn);
    contentKg && formData.append("contentKg", contentKg);
    contentRu && formData.append("contentRu", contentRu);
    countriesIds.length && formData.append("countriesIds", countriesIds.toString());
    categoriesIds.length && formData.append("categoriesIds", categoriesIds.toString());
    tagsIds?.length && formData.append("tagsIds", tagsIds.toString());
    regionId && formData.append("regionId", `${regionId}`);
    videoLinks?.length && formData.append("videoLinks", videoLinks.toString());
};

export const createNews = async (data: NewsForm) => {
    const formData = new FormData();
    appendBasicData(formData, data);
    data?.photoAttachments?.toCreate?.length &&
        data.photoAttachments?.toCreate?.forEach((el, index) => {
            formData.append(`photoAttachments[${index}].file`, el)
            formData.append(`photoAttachments[${index}].order`, `${index}`)
        })
    data?.videoAttachments?.toCreate?.length &&
        data.videoAttachments?.toCreate?.forEach((el, index) => {
            formData.append(`videoAttachments[${index}].file`, el)
            formData.append(`videoAttachments[${index}].order`, `${index}`)
        })
    data?.audioAttachments?.toCreate?.length &&
        data.audioAttachments?.toCreate?.forEach((el, index) => {
            formData.append(`audioAttachments[${index}].file`, el)
            formData.append(`audioAttachments[${index}].order`, `${index}`)
        })
    data?.fileAttachmentsKg?.toCreate?.length &&
        data.fileAttachmentsKg?.toCreate?.forEach((el, index) => {
            formData.append(`fileAttachmentsKg[${index}].file`, el)
            formData.append(`fileAttachmentsKg[${index}].order`, `${index}`)
        })
    data?.fileAttachmentsRu?.toCreate?.length &&
        data.fileAttachmentsRu?.toCreate?.forEach((el, index) => {
            formData.append(`fileAttachmentsRu[${index}].file`, el)
            formData.append(`fileAttachmentsRu[${index}].order`, `${index}`)
        })
    data?.fileAttachmentsEn?.toCreate?.length &&
        data.fileAttachmentsEn?.toCreate?.forEach((el, index) => {
            formData.append(`fileAttachmentsEn[${index}].file`, el)
            formData.append(`fileAttachmentsEn[${index}].order`, `${index}`)
        })
    try {
        const res = await api.post(NewsPath.create, formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<News>
    } catch (error) {
        Notify.ShowError();
    }
};

export const updateNews = async (data: NewsForm, notifyOnError = true) => {
    if (!data.id) return;

    const formData = new FormData();
    appendBasicData(formData, data);

    appendAttachments(formData, "videoAttachments", data.videoAttachments);
    appendAttachments(formData, "audioAttachments", data.audioAttachments);
    appendAttachments(formData, "photoAttachments", data.photoAttachments);
    appendAttachments(formData, "fileAttachmentsEn", data.fileAttachmentsEn);
    appendAttachments(formData, "fileAttachmentsRu", data.fileAttachmentsRu);
    appendAttachments(formData, "fileAttachmentsKg", data.fileAttachmentsKg);

    try {
        const res = await api.put(NewsPath.update(data.id), formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<News>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

