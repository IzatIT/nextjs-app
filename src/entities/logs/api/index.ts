import { createApi } from "@/constants";
import { api, handleAxiosError, Notify } from "@/shared";
import { LogsGetResponse, LogsSearchResponse } from "../model";

export class LogsPath {
    static get = (id: string | number) => createApi(`logs/${id}`);
    static search = createApi(`logs/search`);
}

export const getLogs = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(LogsPath.get(id))
        return res.data as LogsGetResponse
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const searchLogs = async (notifyOnError = true) => {
    try {
        const res = await api.get(LogsPath.search)
        return res.data as LogsSearchResponse
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}