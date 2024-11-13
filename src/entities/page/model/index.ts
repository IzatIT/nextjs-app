import {
    InfoBlock,
    InfoBlockForm, Reference
} from "@/entities";

export type PageFormUpdateInfoBlock = {
    toCreate: InfoBlockForm[];
    toUpdate: InfoBlockForm[];
    toDelete: number[];
    empty: boolean;
}

export type PageMenuResponse = {
    id: number,
    order: number,
    type: Reference | null,
    path: string;
    titleKg: string,
    titleRu: string,
    titleEn: string,
    children: Page[] | null
}


export type PageForm = {
    id?: number;
    parentId?: number;
    order: number;
    path: string;
    typeId?: number;
    titleKg: string;
    titleRu: string;
    titleEn: string;
    descriptionKg: string;
    descriptionRu: string;
    descriptionEn: string;
    bannerContent: PageFormUpdateInfoBlock
    documentContent: PageFormUpdateInfoBlock
    accordionContent: PageFormUpdateInfoBlock
    linkContent: PageFormUpdateInfoBlock
    cardContent: PageFormUpdateInfoBlock
}

export type Page = {
    id: number;
    order: number;
    path: string;
    children?: Page[];
    parentId?: number;
    styleType: string;
    type?: Reference;
    titleKg: string;
    titleRu: string;
    titleEn: string;
    descriptionKg: string;
    descriptionRu: string;
    descriptionEn: string;
    bannerContent: InfoBlock[];
    documentContent: InfoBlock[];
    accordionContent: InfoBlock[];
    linkContent: InfoBlock[];
    cardContent: InfoBlock[];
}

export type PageFilter = {
    title?: string;
    typeId?: number;
};

export type PageSearchRequest = {
    filter?: PageFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "ORDER";
        sortDirection?: "ASC" | "DESC";
    };
};
