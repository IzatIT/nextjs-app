import { ReactNode } from "react";

export type HeadCell<E> = {
    label: string;
    render?: (entity: E) => ReactNode;
};


export type SearchResponse<T> = {
    content: T[];
    numberOfElements: number;
    page: number;
    totalElements: number;
    totalPages: number;
}