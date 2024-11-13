import {PageMenuResponse, PageSearchRequest} from '@/entities';
import { createApi } from "@/constants";
import { appendInfoBlockContent } from "@/entities";
import { api, handleAxiosError, Notify } from "@/shared";
import { AxiosResponse } from "axios";
import { Page, PageForm } from "../model";

export class PagePath {
    static get = (id: string | number) => createApi(`pages/${id}`);
    static getByPath = (path: string) => createApi(`pages/by-path/${path}`);
    static update = (id: string | number) => createApi(`pages/${id}`);
    static create = createApi("pages");
    static search = createApi("pages/search");
    static delete = (id: string | number) => createApi(`pages/${id}`);
    static getMenu = createApi(`pages/menu`);
}
export const getMenu = async (notifyOnError = true) => {
    try {
        const res = await api.get(PagePath.getMenu)
        return res.data as PageMenuResponse[]
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const getPage = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(PagePath.get(id))
        return res.data as Page
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const getPageByPath = async (path: string, notifyOnError = true) => {
    try {
        const res = await api.get(PagePath.getByPath(path))
        return res.data as Page
    } catch (error) {
        console.log(error, "Error message")
    }
}

export const searchPages = async (body: PageSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(PagePath.search, body)
        return res.data as SearchResponse<Page>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const deletePage = async (id: number, notifyOnError = true) => {
    try {
        await api.delete(PagePath.delete(id));
        Notify.ShowSuccess();
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

const appendRootBasicData = (formData: FormData, data: PageForm) => {
    const {
        descriptionEn, descriptionKg, descriptionRu,
        order, path, titleEn, titleKg, titleRu, typeId,parentId
    } = data;

    titleKg && formData.append("titleKg", titleKg)
    titleRu && formData.append("titleRu", titleRu)
    titleEn && formData.append("titleEn", titleEn)
    descriptionKg && formData.append("descriptionKg", descriptionKg)
    descriptionRu && formData.append("descriptionRu", descriptionRu)
    descriptionEn && formData.append("descriptionEn", descriptionEn)
    path && formData.append("path", path)
    order && formData.append("order", `${order}`)
    typeId && formData.append("typeId", `${typeId}`)
    parentId && formData.append("parentId", `${parentId}`)
};

export const createPage = async (data: PageForm, notifyOnError = true) => {
    const formData = new FormData();
    appendRootBasicData(formData, data)

    data.bannerContent?.toCreate?.forEach((infoBlock, index) => {
        appendInfoBlockContent({
            data: infoBlock,
            formData,
            rootPath: `bannerContent[${index}].`,
        })
    })

    data.linkContent?.toCreate?.forEach((link, index) => {
        appendInfoBlockContent({
            data: link,
            formData,
            rootPath: `linkContent[${index}].`,
        })
    })

    data.accordionContent?.toCreate?.forEach((item, index) => {
        appendInfoBlockContent({
            data: item,
            formData,
            rootPath: `accordionContent[${index}].`,
        })
    })


    data.documentContent?.toCreate?.forEach((document, index) => {
        appendInfoBlockContent({
            data: document,
            formData,
            rootPath: `documentContent[${index}].`,
        })
    })

    data.cardContent?.toCreate?.forEach((card, index) => {
        appendInfoBlockContent({
            data: card,
            formData,
            rootPath: `cardContent[${index}].`
        })
    })

    try {
        const res = await api.post(PagePath.create, formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<Page>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

export const updatePage = async (data: PageForm, notifyOnError = true) => {
    if (!data?.id) return;
    const formData = new FormData();
    appendRootBasicData(formData, data)

    data.bannerContent?.toCreate?.filter(el => !el.id)?.forEach((infoBlock, index) => {
        appendInfoBlockContent({
            data: infoBlock,
            formData,
            rootPath: `bannerContent.toCreate[${index}].`,
        })
    })
    data.bannerContent?.toCreate.filter(el => el.id).forEach((infoBlock, index) => {
        formData.append(`bannerContent.toUpdate[${index}].id`, `${infoBlock.id}`)
        appendInfoBlockContent({
            data: infoBlock,
            formData,
            rootPath: `bannerContent.toUpdate[${index}].`,
        })
    })
    data.bannerContent?.toDelete.forEach((el, index) => {
        formData.append(`bannerContent.toDelete[${index}]`, `${el}`)
    })
    // ===============================

    data.linkContent?.toCreate?.filter(el => !el.id)?.forEach((link, index) => {
        appendInfoBlockContent({
            data: link,
            formData,
            rootPath: `linkContent.toCreate[${index}].`,
        })
    })

    data.linkContent?.toCreate?.filter(el => el.id)?.forEach((document, index) => {
        formData.append(`linkContent.toUpdate[${index}].id`, `${document.id}`)
        appendInfoBlockContent({
            data: document,
            formData,
            rootPath: `linkContent.toUpdate[${index}].`,
        })
    })
    data.linkContent?.toDelete.forEach((el, index) => {
        formData.append(`linkContent.toDelete[${index}]`, `${el}`)
    })
    // ===============================

    data.accordionContent?.toCreate?.filter(el => !el.id)?.forEach((item, index) => {
        appendInfoBlockContent({
            data: item,
            formData,
            rootPath: `accordionContent.toCreate[${index}].`,
        })
    })
    data.accordionContent?.toCreate?.filter(el => el.id)?.forEach((document, index) => {
        formData.append(`accordionContent.toUpdate[${index}].id`, `${document.id}`)
        appendInfoBlockContent({
            data: document,
            formData,
            rootPath: `accordionContent.toUpdate[${index}].`,
        })
    })
    data.accordionContent?.toDelete.forEach((el, index) => {
        formData.append(`accordionContent.toDelete[${index}]`, `${el}`)
    })
    // ===============================

    data.documentContent?.toCreate?.filter(el => !el.id)?.forEach((document, index) => {
        appendInfoBlockContent({
            data: document,
            formData,
            rootPath: `documentContent.toCreate[${index}].`,
        })
    })

    data.documentContent?.toCreate?.filter(el => el.id)?.forEach((document, index) => {
        formData.append(`documentContent.toUpdate[${index}].id`, `${document.id}`)
        appendInfoBlockContent({
            data: document,
            formData,
            rootPath: `documentContent.toUpdate[${index}].`,
        })
    })
    data.documentContent?.toDelete.forEach((el, index) => {
        formData.append(`documentContent.toDelete[${index}]`, `${el}`)
    })
    // ===============================

    data.cardContent?.toCreate?.filter(el => !el.id)?.forEach((card, index) => {
        appendInfoBlockContent({
            data: card,
            formData,
            rootPath: `cardContent.toCreate[${index}].`
        })
    })

    data.cardContent?.toCreate?.filter(el => el.id)?.forEach((card, index) => {
        formData.append(`cardContent.toUpdate[${index}].id`, `${card.id}`)
        appendInfoBlockContent({
            data: card,
            formData,
            rootPath: `cardContent.toUpdate[${index}].`
        })
    })

    data.cardContent?.toDelete.forEach((el, index) => {
        formData.append(`cardContent.toDelete[${index}]`, `${el}`)
    })


    try {
        const res = await api.put(PagePath.update(data.id), formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<Page>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

