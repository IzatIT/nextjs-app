
export type LogsSearchResponse = {
    id: string;
    client: string;
    date: string;
    method: string;
    clientIp: string;
    url: string;
}
export type LogsGetResponse = {
    client: string;
    date: string;
    method: string;
    clientIp: string;
    url: string;
    request: string;
    response: string;
}


export type LogsFilter = {
    uri?: string;
    clientId?: number;
    clientIp?: string;
};

export type LogsSearchRequest = {
    filter?: LogsFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID";
        sortDirection?: "ASC" | "DESC";
    };
};
