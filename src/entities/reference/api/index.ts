import { ReferenceSearchRequest } from './../model/index';
import { createApi, MAIN_PAGE } from "@/constants";
import { api, handleAxiosError, Notify } from "@/shared";
import { Reference, ReferenceRequest, ReferenceTypeCodesEnum, TypeCode } from "../model";

export class ReferencePath {
    static get = (id: string | number) => createApi(`references/${id}`);
    static create = (type: string) => createApi(`references/${type}`);
    static search = createApi(`references/search`);

    static update = (id: number, type: string) => createApi(`references/${id}/${type}`);

    static searchTypeCodes = createApi(`references-type/search`);
}

type GetByTypCodeArgs = {
    typeCode: TypeCode;
    notifyOnError?: boolean;
    title?: string
}

export const getReferenceByTypeCode = async ({ typeCode, notifyOnError = false, title }: GetByTypCodeArgs) => {
    try {
        const res = await api.post(ReferencePath.search, {
            pageRequest: {
                page: 0,
                limit: 200,
            },
            filter: {
                typeCode: typeCode,
                title: title
            },
            sorting: {
                sortBy: "ID",
                sortDirection: "DESC"
            }
        })
        return res.data as SearchResponse<Reference>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const getReference = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(ReferencePath.get(id))
        return res.data as Reference
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const searchReference = async (data: ReferenceSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(ReferencePath.search, data)
        return res.data as SearchResponse<Reference>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const createReference = async ({ type, ...body }: ReferenceRequest, notifyOnError = true) => {
    if (type) {
        try {
            const res = await api.post(ReferencePath.create(type), body)
            Notify.ShowSuccess()
            return res.data as { message: string }
        } catch (error) {
            handleAxiosError(error, notifyOnError)
        }
    }
}


export const updateReference = async ({ id, type, ...body }: ReferenceRequest, notifyOnError = true) => {
    if (id && type) {
        try {
            const res = await api.put(ReferencePath.update(id, type), body)
            Notify.ShowSuccess()
            return res.data as string
        } catch (error) {
            handleAxiosError(error, notifyOnError)
        }
    }
}


export const defaultReferenceItemsForCreate: ReferenceRequest[] = [
    {
        id: 8,
        titleEn: MAIN_PAGE,
        titleKg: "Башкы Баракча",
        titleRu: "Главная страница",
        type: ReferenceTypeCodesEnum.REF_INFO_BLOCK_TYPE
    },
    {
        id: 8,
        titleEn: "Bishkek",
        titleKg: "Бишкек",
        titleRu: "Бишкек",
        type: ReferenceTypeCodesEnum.REF_REGIONS
    },
    {
        id: 9,
        titleEn: "Chuy",
        titleKg: "Чуй",
        titleRu: "Чуй",
        type: ReferenceTypeCodesEnum.REF_REGIONS
    },
    {
        id: 10,
        titleEn: "Ysyk-Kol",
        titleKg: "Ысык-Көл",
        titleRu: "Иссык-Куль",
        type: ReferenceTypeCodesEnum.REF_REGIONS
    },
    {
        id: 11,
        titleEn: "Jalal-Adad",
        titleKg: "Жалал-Абад",
        titleRu: "Джалал-Абад",
        type: ReferenceTypeCodesEnum.REF_REGIONS
    },
    {
        id: 12,
        titleEn: "Naryn",
        titleKg: "Нарын",
        titleRu: "Нарын",
        type: ReferenceTypeCodesEnum.REF_REGIONS
    },
    {
        id: 13,
        titleEn: "Osh",
        titleKg: "Ош",
        titleRu: "Ош",
        type: ReferenceTypeCodesEnum.REF_REGIONS
    },
    {
        id: 14,
        titleEn: "Batken",
        titleKg: "Баткен",
        titleRu: "Баткен",
        type: ReferenceTypeCodesEnum.REF_REGIONS
    },
    {
        id: 15,
        titleEn: "Talas",
        titleKg: "Талас",
        titleRu: "Талас",
        type: ReferenceTypeCodesEnum.REF_REGIONS
    },
    {
        id: 16,
        titleEn: "Social Links",
        titleKg: "Социалдык ссылкалар",
        titleRu: "Социальные ссылки",
        type: ReferenceTypeCodesEnum.REF_SOCIAL_LINK_TYPE
    },
]