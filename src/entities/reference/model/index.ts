export type Reference = {
    id: number,
    enabled: boolean,
    parent: ILocaledTitles,
    titleEn: string,
    titleKg: string,
    titleRu: string,
    type: TypeCode
};

export type ReferenceRequest = {
    id?: number;
    type?: TypeCode;
    parentId?: number;
    titleRu: string;
    titleKg: string;
    titleEn: string;
}
export type ReferenceFilter = {
    enabled?: "null" | "false" | "true";
    typeId?: number;
    title?: string;
    typeCode?: TypeCode;
}

export type ReferenceSearchRequest = {
    filter?: ReferenceFilter,
    pageRequest?: {
        limit?: number,
        page?: number
    },
    sorting?: {
        sortBy?: "ID",
        sortDirection?: "ASC" | "DESC"
    }
}

export type ReferenceTypeCode = {
    code: TypeCode;
    id: number;
    titleEn: string;
    titleKg: string;
    titleRu: string;
}

export enum ReferenceTypeCodesEnum {
    REF_MENU = "REF_MENU",
    REF_ROLE = "REF_ROLE",
    REF_CARD_INFO_TYPE = "REF_CARD_INFO_TYPE",
    REF_INFO_BLOCK_TYPE = "REF_INFO_BLOCK_TYPE",
    REF_CREATE_PAGE_TYPE = "REF_CREATE_PAGE_TYPE",
    REF_SOCIAL_LINK_TYPE = "REF_SOCIAL_LINK_TYPE",
    REF_NEWS_CATEGORY = "REF_NEWS_CATEGORY",
    REF_NEWS_TAG = "REF_NEWS_TAG",
    REF_REGIONS = "REF_REGIONS",
    REF_COUNTRIES = "REF_COUNTRIES",
    REF_DIAGRAM_CATEGORY_TYPE = "REF_DIAGRAM_CATEGORY_TYPE",
    REF_DIAGRAM_TYPE = "REF_DIAGRAM_TYPE"
}

export type TypeCode =
    ReferenceTypeCodesEnum.REF_MENU |
    ReferenceTypeCodesEnum.REF_ROLE |
    ReferenceTypeCodesEnum.REF_CARD_INFO_TYPE |
    ReferenceTypeCodesEnum.REF_INFO_BLOCK_TYPE |
    ReferenceTypeCodesEnum.REF_CREATE_PAGE_TYPE |
    ReferenceTypeCodesEnum.REF_SOCIAL_LINK_TYPE |
    ReferenceTypeCodesEnum.REF_NEWS_CATEGORY |
    ReferenceTypeCodesEnum.REF_NEWS_TAG |
    ReferenceTypeCodesEnum.REF_REGIONS |
    ReferenceTypeCodesEnum.REF_COUNTRIES |
    ReferenceTypeCodesEnum.REF_DIAGRAM_TYPE |
    ReferenceTypeCodesEnum.REF_DIAGRAM_CATEGORY_TYPE