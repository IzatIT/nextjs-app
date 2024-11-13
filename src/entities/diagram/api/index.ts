import { createApi } from "@/constants";
import { api, DateTime, handleAxiosError, Notify } from "@/shared";
import { AxiosResponse } from "axios";
import { Diagram, DiagramForm, DiagramFormRequest } from "../model";

export class DiagramPath {
    static get = (id: string | number) => createApi(`diagrams/${id}`);
    static search = createApi(`diagrams/search`);

    static delete = (id: number) => createApi(`diagrams/${id}`);
    static create = createApi(`diagrams`);
    static update = (id: number) => createApi(`diagrams/${id}`);
}


export const getDiagram = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(DiagramPath.get(id))
        return res.data as Diagram
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const deleteDiagram = async (id: number, notifyOnError = true) => {
    try {
        const res = await api.delete(DiagramPath.delete(id));
        Notify.ShowSuccess();
        return res as AxiosResponse<string>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

export const appendDiagramData = (data: DiagramForm) => {
    const res: DiagramFormRequest = {
        ...data,
        dateFrom: data?.dateFrom?.toISOString() || undefined,
        dateTo: data?.dateTo?.toISOString() || undefined,
        order: parseInt(`${data.order ? data.order : 50}`),
        year: data.year ? parseInt(`${data.year}`) : undefined,
        fields: data.fields?.map((field) => ({
            ...field,
            order: parseInt(`${field.order ? field.order : 50}`),
            value: parseInt(`${field?.value ? field.value : 0}`),
            values: field.values?.map((fieldValue) => ({
                ...fieldValue,
                dateFrom: fieldValue?.dateFrom?.toISOString() || undefined,
                dateTo: fieldValue?.dateTo?.toISOString() || undefined,
                order: parseInt(`${fieldValue.order ? fieldValue.order : 50}`),
                value: parseInt(`${fieldValue?.value ? fieldValue.value : 0}`),
                year: fieldValue?.year ? parseInt(`${fieldValue.year}`) : undefined,
            }))
        }))
    }
    return JSON.stringify(res)
}



export const createDiagram = async (data: DiagramForm, notifyOnError = true) => {
    const result = appendDiagramData(data)
    try {
        const res = await api.post(DiagramPath.create, result);
        Notify.ShowSuccess();
        return res as AxiosResponse<Diagram>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

export const updateDiagram = async (data: DiagramForm, notifyOnError = true) => {
    const result = appendDiagramData(data)
    if (!data.id) return;
    try {
        const res = await api.put(DiagramPath.update(data.id), result);
        Notify.ShowSuccess();
        return res as AxiosResponse<Diagram>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

