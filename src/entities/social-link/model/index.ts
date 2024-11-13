import { Attachment, Reference } from "@/entities";

export type SocialLinkForm = {
    id?: number;
    order: number;
    typeId?: number;
    titleKg: string;
    titleRu: string;
    titleEn: string;
    link: string;
    photoAttachment?: {
        toCreate: File[];
        attachment?: Attachment
    }
}

export type SocialLink = {
    id: number;
    order: number;
    type?: Reference
    titleKg: string;
    titleRu: string;
    titleEn: string;
    link: string;
    photoAttachment?: Attachment;
}

export type SocialLinkFilter = {
    typeId?: number;
    title?: string;
};

export type SocialLinkSearchRequest = {
    filter?: SocialLinkFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "ORDER";
        sortDirection?: "ASC" | "DESC";
    };
};
