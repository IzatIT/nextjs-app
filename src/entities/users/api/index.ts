import { createApi } from "@/constants";
import { api, handleAxiosError, Notify } from "@/shared";
import { AxiosResponse } from "axios";
import {
    User, UserChangePassword,
    UserFormRequest,
    UserRoles,
    UserRolesSearchRequest,
    UserSearchRequest,
    UserUpdatePassword
} from "../model";

export class UserPath {
    static get = (employeeId: number | string) => createApi(`employees/${employeeId}`);
    static search = createApi(`employees/search`);

    static create = createApi(`employees`);
    static update = (employeeId: number | string) => createApi(`employees/${employeeId}`);

    static changeMyPassword = createApi(`accounts/change-password`);

    static updatePassword = (employeeId: number | string) => createApi(`employees/${employeeId}/update-employee-password`);
    static changePassword = (employeeId: number | string) => createApi(`employees/${employeeId}/change-password`);


    static searchRoles = createApi("roles/search")
}

export const getUser = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(UserPath.get(id))
        return res.data as User
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const searchUsers = async (searchBody?: UserSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(UserPath.search, searchBody)
        return res.data as SearchResponse<User>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const changeMyPassword = async (data: UserChangePassword, notifyOnError = true) => {
    try {
        const res = await api.put(UserPath.changeMyPassword, data)
        Notify.ShowSuccess()
        return res as AxiosResponse<string>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const createUser = async (data: UserFormRequest, notifyOnError = true) => {
    try {
        const res = await api.post(UserPath.create, data)
        Notify.ShowSuccess()
        return res as AxiosResponse<User>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const updateUser = async (data: UserFormRequest, notifyOnError = true) => {
    if (data.id) {
        try {
            const res = await api.put(UserPath.update(data.id), data)
            Notify.ShowSuccess()
            return res as AxiosResponse<User>
        } catch (error) {
            handleAxiosError(error, notifyOnError)
        }
    }
}
export const changeUserPassword = async (userId: number | string, data: UserChangePassword, notifyOnError = true) => {
    try {
        const res = await api.put(UserPath.changePassword(userId), data)
        Notify.ShowSuccess()
        return res as AxiosResponse<string>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const updateUserPassword = async (userId: number | string, data: UserUpdatePassword, notifyOnError = true) => {
    try {
        const res = await api.post(UserPath.updatePassword(userId), data)
        Notify.ShowSuccess()
        return res as AxiosResponse<string>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const searchUserRoles = async (data?: UserRolesSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(UserPath.searchRoles, data || {
            pageRequest: {
                limit: 100,
                page: 0
            },
            filter: {},
            sorting: {
                sortBy: "ID",
                sortDirection: "ASC"
            }
        })
        return res.data as SearchResponse<UserRoles>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}