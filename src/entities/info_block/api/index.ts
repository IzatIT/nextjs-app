import { createApi } from "@/constants";
import { api, handleAxiosError, Notify } from "@/shared";
import { AttachmentUpdateRequest } from "@/types";
import { AxiosResponse } from "axios";
import { InfoBlock, InfoBlockForm, InfoBlockSearchRequest } from "../model";

export class InfoBlockPath {
    static get = (id: string | number) => createApi(`info-block/${id}`);
    static search = createApi("info-block/search");

    static delete = (id: number) => createApi(`info-block/${id}`);
    static create = createApi("info-block");
    static update = (id: number) => createApi(`info-block/${id}`);

}

export const getInfoBlock = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(InfoBlockPath.get(id))
        return res.data as InfoBlock
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const searchInfoBlock = async (body: InfoBlockSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(InfoBlockPath.search, { ...body })
        return res.data as SearchResponse<InfoBlock>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const deleteInfoBlock = async (id: number, notifyOnError = true) => {
    try {
        const res = await api.delete(InfoBlockPath.delete(id));
        Notify.ShowSuccess();
        return res as AxiosResponse<string>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

const appendAttachments = (formData: FormData, key: string, attachments?: AttachmentUpdateRequest) => {
    attachments?.toCreate?.forEach((el, index) => {
        formData.append(`${key}.toCreate[${index}].file`, el);
        formData.append(`${key}.toCreate[${index}].order`, `${index}`);
    });
    attachments?.toUpdate?.forEach((el, index) => {
        formData.append(`${key}.toUpdate[${index}].id`, `${el.id}`);
        formData.append(`${key}.toUpdate[${index}].order`, `${el.order}`);
    });
    attachments?.toDelete?.length && formData.append(`${key}.toDelete`, attachments?.toDelete.toString());
};
type AppendInfoBlockContentArgs = {
    formData: FormData,
    data: InfoBlockForm,
    rootPath?: string;
    isUpdateRequest?: boolean
}

export const appendInfoBlockContent = ({
    formData, data,
    rootPath = "", isUpdateRequest
}: AppendInfoBlockContentArgs) => {
    const {
        order, titleKg, titleRu, contentEn, contentKg, contentRu, fileAttachments,
        links, photoAttachments, textEn, textKg, textRu, titleEn, typeId, regionId
    } = data;

    if (isUpdateRequest) {
        appendAttachments(formData, `${rootPath}photoAttachments`, data?.photoAttachments);
        appendAttachments(formData, `${rootPath}fileAttachments`, data?.fileAttachments);
    } else {
        photoAttachments?.toCreate?.length &&
            data.photoAttachments?.toCreate?.forEach((el, index) => {
                formData.append(`${rootPath}photoAttachments[${index}].file`, el)
                formData.append(`${rootPath}photoAttachments[${index}].order`, `${index}`)
            })

        fileAttachments?.toCreate?.length &&
            data.fileAttachments?.toCreate?.forEach((el, index) => {
                formData.append(`${rootPath}fileAttachments[${index}].file`, el)
                formData.append(`${rootPath}fileAttachments[${index}].order`, `${index}`)
            })
    }
    order && formData.append(`${rootPath}order`, `${order}`)
    regionId && formData.append(`${rootPath}regionId`, `${regionId}`)
    typeId && formData.append(`${rootPath}typeId`, `${typeId}`)
    titleKg && formData.append(`${rootPath}titleKg`, titleKg)
    titleRu && formData.append(`${rootPath}titleRu`, titleRu)
    titleEn && formData.append(`${rootPath}titleEn`, titleEn)
    contentKg && formData.append(`${rootPath}contentKg`, contentKg)
    contentRu && formData.append(`${rootPath}contentRu`, contentRu)
    contentEn && formData.append(`${rootPath}contentEn`, contentEn)
    textKg && formData.append(`${rootPath}textKg`, textKg)
    textRu && formData.append(`${rootPath}textRu`, textRu)
    textEn && formData.append(`${rootPath}textEn`, textEn)
    links?.forEach((el, index) => {
        el?.id && formData.append(`${rootPath}links[${index}].id`, `${el.id}`)
        formData.append(`${rootPath}links[${index}].order`, `${index}`)
        formData.append(`${rootPath}links[${index}].titleKg`, `${el.titleKg}`)
        formData.append(`${rootPath}links[${index}].titleRu`, `${el.titleRu}`)
        formData.append(`${rootPath}links[${index}].titleEn`, `${el.titleEn}`)
        formData.append(`${rootPath}links[${index}].contentKg`, `${el.contentKg}`)
        formData.append(`${rootPath}links[${index}].contentRu`, `${el.contentRu}`)
        formData.append(`${rootPath}links[${index}].contentEn`, `${el.contentEn}`)
        formData.append(`${rootPath}links[${index}].link`, `${el.link}`)
    })
};

export const createInfoBlock = async (data: InfoBlockForm, notifyOnError = true) => {
    const formData = new FormData();
    appendInfoBlockContent({
        data,
        formData
    });

    try {
        const res = await api.post(InfoBlockPath.create, formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<InfoBlock>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

export const updateInfoBlock = async (data: InfoBlockForm, notifyOnError = true) => {
    if (!data.id) return;

    const formData = new FormData();
    appendInfoBlockContent({
        data,
        formData,
        isUpdateRequest: true
    })

    try {
        const res = await api.put(InfoBlockPath.update(data.id), formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<InfoBlock>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

