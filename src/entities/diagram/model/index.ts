import { Reference } from "@/entities";

export enum DIAGRAM_QUARTER {
    FIRST = 0,
    SECOND = 1,
    THIRD = 2,
    FOURTH = 3
}

export type DiagramQuarterType = DIAGRAM_QUARTER.FIRST | DIAGRAM_QUARTER.SECOND | DIAGRAM_QUARTER.THIRD | DIAGRAM_QUARTER.FOURTH

export type DiagramFormRequest = {
    id?: number;
    order: number;
    categoryId?: number;
    typeId?: number;
    titleKg: string;
    titleRu: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    descriptionKg?: string;
    descriptionRu?: string;
    descriptionEn?: string;
    dateFrom?: string;
    dateTo?: string;
    quarter?: DiagramQuarterType;
    year?: number;
    fields: {
        id?: number;
        order: number;
        titleKg: string;
        titleEn?: string;
        titleRu: string;
        typeId?: number;
        value: number;
        values?: {
            id?: number;
            value: number;
            order: number;
            dateFrom?: string;
            dateTo?: string;
            quarter?: number;
            year?: number;
            titleKg?: string;
            titleRu?: string;
            titleEn?: string;
        }[]
    }[]
}
export type DiagramForm = {
    id?: number;
    order: number;
    categoryId?: number;
    typeId?: number;
    titleKg: string;
    titleRu: string;
    titleEn: string;
    contentKg: string;
    contentRu: string;
    contentEn: string;
    descriptionKg: string;
    descriptionRu: string;
    descriptionEn: string;
    dateFrom?: Date;
    dateTo?: Date;
    quarter?: DiagramQuarterType;
    year?: number;
    fields: DiagramFieldForm[];
}
export type DiagramFieldForm = {
    id?: number;
    order: number;
    titleKg: string;
    titleEn: string;
    titleRu: string;
    typeId?: number;
    value: number;
    values?: DiagramFieldValueRequest[];
}

export type DiagramFieldValueRequest = {
    id?: number;
    value: number;
    order: number;
    dateFrom?: Date;
    dateTo?: Date;
    quarter?: number;
    year?: number;
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
}

export type DiagramFieldValueResponse = {
    id?: number;
    value: number;
    order: number;
    dateFrom?: string;
    dateTo?: string;
    quarter?: number;
    year?: number;
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
}


export type DiagramField = {
    id: number;
    order: number;
    titleKg: string;
    titleEn: string;
    titleRu: string;
    type: Reference;
    value: number;
    values?: DiagramFieldValueResponse[];
}
export type Diagram = {
    id: number;
    order: number;
    category: Reference;
    type: Reference;
    titleKg: string;
    titleRu: string;
    titleEn: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    descriptionKg?: string;
    descriptionRu?: string;
    descriptionEn?: string;
    dateFrom: string;
    dateTo: string;
    quarter: DiagramQuarterType;
    year: number;
    fields: DiagramField[];
}



export type DiagramFilter = {
    title?: string;
    typeId?: number;
    categoryId?: number;
};

export type DiagramSearchRequest = {
    filter?: DiagramFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "ORDER";
        sortDirection?: "ASC" | "DESC";
    };
};
