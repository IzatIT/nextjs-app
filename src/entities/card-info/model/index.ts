import { Attachment, Reference } from "@/entities";
import { PageComponentsType } from "@/features/admin/page/ui/configuration";


export type CardInfoLaborActivity = {
    id?: number;
    order: number;
    titleKg: string;
    titleRu: string;
    titleEn: string;
    year: number;
}
export type CardInfo = {
    id?: number;
    order: number;
    active?: boolean;
    fullName?: string;
    phone?: string;
    email?: string;
    awardsRu?: string;
    awardsKg?: string;
    awardsEn?: string;
    positionRu?: string;
    positionEn?: string;
    positionKg?: string;
    shortBiographyRu?: string;
    shortBiographyKg?: string;
    shortBiographyEn?: string;
    type?: Reference;
    laborActivities?: CardInfoLaborActivity[];
    attachment?: Attachment;
    localType?: PageComponentsType
}

export type CardInfoForm = {
    id?: number;
    order?: number;
    active?: boolean;
    fullName?: string;
    phone?: string;
    email?: string;
    awardsRu?: string;
    awardsKg?: string;
    awardsEn?: string;
    positionRu?: string;
    positionEn?: string;
    positionKg?: string;
    shortBiographyRu?: string;
    shortBiographyKg?: string;
    shortBiographyEn?: string;
    typeId?: number;
    file: File[];
    attachment?: Attachment;
    laborActivities?: CardInfoLaborActivity[];
}

export type CardInfoFilter = {
    fullName?: string;
    phone?: string;
    email?: string;
    typeId?: number;
    active?: "true" | "false" | "null" | boolean;
    position?: string;
}

export type CardInfoSearchRequest = {
    pageRequest: PageRequest;
    sorting: {
        sortBy: "ID" | "ORDER";
        sortDirection: "ASC" | "DESC";
    };
    filter: CardInfoFilter
}