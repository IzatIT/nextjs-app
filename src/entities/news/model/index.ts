import { Attachment, Reference } from "@/entities";
import { AttachmentUpdateRequest } from "@/types";

export type NewsForm = {
    id?: number;
    active: boolean;
    isMain: boolean;
    includedInMailing: boolean;
    publishedAt: Date;
    plannedTo?: Date;
    titleKg: string;
    titleRu: string;
    titleEn: string;
    contentKg: string;
    contentRu: string;
    contentEn: string;
    videoLinks: string[];
    categoriesIds: number[];
    tagsIds: number[];
    countriesIds: number[];
    regionId?: number;
    fileAttachmentsKg: AttachmentUpdateRequest;
    fileAttachmentsRu: AttachmentUpdateRequest;
    fileAttachmentsEn: AttachmentUpdateRequest;
    photoAttachments: AttachmentUpdateRequest;
    audioAttachments: AttachmentUpdateRequest;
    videoAttachments: AttachmentUpdateRequest;
}

export type News = {
    id: number;
    active?: boolean;
    isMain?: boolean;
    includedInMailing?: boolean;
    publishedAt: string;
    plannedTo?: string;
    titleKg: string;
    titleRu: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    videoLinks?: string[];
    categories?: Reference[];
    tags?: Reference[];
    countries?: Reference[];
    region?: Reference;
    fileAttachmentsKg?: Attachment[];
    fileAttachmentsRu?: Attachment[];
    fileAttachmentsEn?: Attachment[];
    photoAttachments?: Attachment[];
    audioAttachments?: Attachment[];
    videoAttachments?: Attachment[];
}

export type NewsFilter = {
    title?: string;
    content?: string;
    publishedAt?: Date;
    regionId?: number;
    categories?: number[];
    countries?: number[];
    tags?: number[];
    includedInMailing?: "true" | "false" | "null";
    active?: "true" | "false" | "null";
    publishAt?: Date;
    onSlider?: "true" | "false" | "null" | boolean;
};

export type NewsSearchRequest = {
    filter?: NewsFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "PUBLISHED_AT";
        sortDirection?: "ASC" | "DESC";
    };
};
