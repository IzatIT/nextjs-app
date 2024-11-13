import { createApi } from "@/constants";
import { api, handleAxiosError, Notify } from "@/shared";
import { AxiosResponse } from "axios";
import { SocialLink, SocialLinkForm, SocialLinkSearchRequest } from "../model";

export class SocialLinkPath {
    static get = (id: string | number) => createApi(`social-link/${id}`);
    static search = createApi("social-link/search");

    static delete = (id: number) => createApi(`social-link/${id}`);
    static create = createApi("social-link");
    static update = (id: number) => createApi(`social-link/${id}`);

}

export const searchSocialLink = async (body: SocialLinkSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(SocialLinkPath.search, body)
        return res.data as SearchResponse<SocialLink>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const getSocialLink = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(SocialLinkPath.get(id))
        return res.data as SocialLink
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const deleteSocialLink = async (id: number, notifyOnError = true) => {
    try {
        const res = await api.delete(SocialLinkPath.delete(id));
        Notify.ShowSuccess();
        return res as AxiosResponse<string>
    } catch (error) {
        handleAxiosError(error, notifyOnError);
    }
};

const appendBasicData = (formData: FormData, data: SocialLinkForm, notifyOnError = true) => {
    const { link, order, titleEn, titleKg, titleRu, typeId } = data;

    formData.append("order", `${order}`);
    formData.append("titleKg", titleKg);
    formData.append("titleRu", titleRu);
    titleEn && formData.append("titleEn", titleEn);
    link && formData.append("link", link);
    typeId && formData.append("typeId", `${typeId}`);
};

export const createSocialLink = async (data: SocialLinkForm, notifyOnError = true) => {
    const formData = new FormData();
    appendBasicData(formData, data);

    data?.photoAttachment?.toCreate?.length && formData.append("file", data.photoAttachment?.toCreate?.[0])

    try {
        const res = await api.post(SocialLinkPath.create, formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<SocialLink>
    } catch (error) {
        handleAxiosError(error, notifyOnError);
    }
};

export const updateSocialLink = async (data: SocialLinkForm, notifyOnError = true) => {
    if (!data?.id) return;

    const formData = new FormData();
    appendBasicData(formData, data);
    data?.photoAttachment?.toCreate?.length && formData.append("file", data.photoAttachment?.toCreate?.[0])

    try {
        const res = await api.put(SocialLinkPath.update(data.id), formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<SocialLink>
    } catch (error) {
        handleAxiosError(error, notifyOnError);
    }
};

