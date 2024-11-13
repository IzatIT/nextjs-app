"use client"
import { Notify } from "@/shared/helpers";
import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown, notifyOnError: boolean) => {
    if (notifyOnError) {
        if (error instanceof AxiosError) {
            Notify.ShowError(`${error?.config?.url}`, `${error.status === undefined ? error.message : error.status}`)
        } else {
            Notify.ShowError()
        }
    } else {
        console.error("Requested new Error" + error)
    }

};
