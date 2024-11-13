declare module "*.json" {
    const value: any;
    export default value;
}

declare type LocaleType = "kg" | "ru" | "en"

declare type LocaleTypeParams = {
    locale: LocaleType
}
declare type ILocaledTitles = {
    id?: number;
    titleKg: string;
    titleRu: string;
    titleEn?: string;
}

declare type SearchResponse<T> = {
    content: T[];
    numberOfElements: number;
    page: number;
    totalElements: number;
    totalPages: number;
}


declare type Color = "link" | "reset" | "submit" | "default" | "primary" | "secondary" | "tertiary" | "clear" | "label" | "description";
declare type ButtonVariants = "filter" | "reset" | "submit" | "default"
    | "primary" | "secondary" | "tertiary" | "outlined" | "sorting"
    | "clear" | "banner-btn" | "card_button" | "minimalistic";


declare type GetInputPropsReturnType = {
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    error?: string;
    value?: string | number | readonly string[];
    onBlur?: () => void;
    onFocus?: () => void;
    defaultValue?: string | number
}

declare type Pagination = {
    page?: number,
    limit?: string
    total?: number;
}
declare type PageRequest = {
    page: number,
    limit: number
}

declare type SortBy = "ID" | "PUBLISHED_AT" | "ORDER"
declare type SortDirection = "ASC" | "DESC"
declare type SortRequest = {
    sortBy: SortBy,
    sortDirection: SortDirection
}

declare type stringArrayLength10 = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
]

declare type HandleSaveCropedArgs = {
    group: "attachment" | "file"
    file: File;
    index: number;
    id?: number
}

declare type HandleDeleteFileArgs = {
    group: "attachment" | "file"
    index: number,
    id?: number
}

declare type HandleReOrderArgs = {
    group?: "attachment" | "file"
    from: number;
    to: number;
}
