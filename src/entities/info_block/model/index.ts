import { Attachment, Reference } from "@/entities";
import { PageComponentsType } from "@/features/admin/page/ui/configuration";
import { AttachmentUpdateRequest } from "@/types";

export type InfoBlockForm = {
    id?: number,
    order?: number;
    typeId?: number;
    regionId?: number;
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    textKg?: string;
    textRu?: string;
    textEn?: string;
    links?: InfoBlockLinkType[];
    photoAttachments?: AttachmentUpdateRequest;
    fileAttachments?: AttachmentUpdateRequest;
}

export type InfoBlock = {
    id?: number;
    order: number;
    type?: Reference;
    region?: Reference;
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    textKg?: string;
    textRu?: string;
    textEn?: string;
    links?: InfoBlockLinkType[];
    photoAttachments?: Attachment[];
    fileAttachments?: Attachment[];
    localType?: PageComponentsType
}

export type InfoBlockWithComponentStyle = {
    id?: number;
    order: number;
    styleType: PageComponentsType
    type?: Reference;
    region?: Reference;
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    textKg?: string;
    textRu?: string;
    textEn?: string;
    links?: InfoBlockLinkType[];
    photoAttachments?: Attachment[];
    fileAttachments?: Attachment[];
    localType?: PageComponentsType
}



export type InfoBlockLinkType = {
    id?: number;
    order: number;
    titleKg: string;
    titleRu: string;
    titleEn: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    link: string;
}


export type InfoBlockFilter = {
    typeId?: number;
    regionId?: number;
    title?: string;
};

export type InfoBlockSearchRequest = {
    filter?: InfoBlockFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "ORDER";
        sortDirection?: "ASC" | "DESC";
    };
};
