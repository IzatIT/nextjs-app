import { createApi } from "@/constants";
import { api, handleAxiosError, Notify } from "@/shared";
import { AxiosResponse } from "axios";
import { CardInfo, CardInfoForm, CardInfoSearchRequest } from "../model";

export class CardInfoPath {
    static get = (id: number | string) => createApi(`cards/${id}`);
    static search = createApi("cards/search");

    static create = createApi("cards");
    static update = (id: number | string) => createApi(`cards/${id}`);
    static delete = (id: number | string) => createApi(`cards/${id}`);
}

export const getCardInfo = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(CardInfoPath.get(id))
        return res.data as CardInfo
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const searchCardInfo = async (body: CardInfoSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(CardInfoPath.search, { ...body })
        return res.data as SearchResponse<CardInfo>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

type AppendCardInfoArgs = {
    formData: FormData;
    data: CardInfoForm;
    rootPath?: string;

}

export const appendCardInfoContent = ({ formData, data, rootPath = "" }: AppendCardInfoArgs) => {
    const {
        order, active, awardsEn, awardsKg, awardsRu, email, file, fullName, laborActivities,
        phone, positionEn, positionKg, positionRu, shortBiographyEn, shortBiographyKg,
        shortBiographyRu, typeId
    } = data;

    file?.[0] &&
        formData.append(`${rootPath}file`, file[0])

    laborActivities?.length &&
        laborActivities?.forEach((item, index) => {
            item.titleKg && formData.append(`${rootPath}laborActivities[${index}].year`, `${item.year}`)
            item.order && formData.append(`${rootPath}laborActivities[${index}].order`, `${index}`)
            item.titleEn && formData.append(`${rootPath}laborActivities[${index}].titleEn`, `${item.titleEn}`)
            item.titleKg && formData.append(`${rootPath}laborActivities[${index}].titleKg`, `${item.titleKg}`)
            item.titleRu && formData.append(`${rootPath}laborActivities[${index}].titleRu`, `${item.titleRu}`)
        })
    formData.append(`${rootPath}active`, `${active}`);
    awardsEn && formData.append(`${rootPath}awardsEn`, awardsEn);
    awardsKg && formData.append(`${rootPath}awardsKg`, awardsKg);
    awardsRu && formData.append(`${rootPath}awardsRu`, awardsRu);
    email && formData.append(`${rootPath}email`, email);
    fullName && formData.append(`${rootPath}fullName`, fullName);
    formData.append(`${rootPath}order`, `${order || 50}`);
    phone && formData.append(`${rootPath}phone`, phone);
    positionEn && formData.append(`${rootPath}positionEn`, positionEn);
    positionKg && formData.append(`${rootPath}positionKg`, positionKg);
    positionRu && formData.append(`${rootPath}positionRu`, positionRu);
    shortBiographyEn && formData.append(`${rootPath}shortBiographyEn`, shortBiographyEn);
    shortBiographyKg && formData.append(`${rootPath}shortBiographyKg`, shortBiographyKg);
    shortBiographyRu && formData.append(`${rootPath}shortBiographyRu`, shortBiographyRu);
    typeId && formData.append(`${rootPath}typeId`, `${typeId}`);
};

export const createCardInfo = async (data: CardInfoForm, notifyOnError = true) => {
    const formData = new FormData();
    appendCardInfoContent({ formData, data })

    try {
        const res = await api.post(CardInfoPath.create, formData)
        return res as AxiosResponse<CardInfo>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const updateCardInfo = async (data: CardInfoForm, notifyOnError = true) => {
    const formData = new FormData();
    appendCardInfoContent({ formData, data })

    if (data.id) {
        try {
            if (data.id) {
                const res = await api.put(CardInfoPath.update(data?.id), formData)
                return res as AxiosResponse<CardInfo>
            }
        } catch (error) {
            handleAxiosError(error, notifyOnError)
        }
    }
}


export const deleteCardInfo = async (id: number, notifyOnError = true) => {
    try {
        const res = await api.delete(CardInfoPath.delete(id))
        Notify.ShowSuccess()
        return res as AxiosResponse<string>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}