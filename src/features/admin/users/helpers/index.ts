import { RolesEnum, User, UserFilter, UserFormRequest } from '@/entities';
import { DateTime } from '@/shared';
import { getFormType } from '@/types';



export const getUserFilterForm: getFormType<UserFilter, UserFilter> = (params?: UserFilter) => {
    const initialValues: UserFilter = {
        inn: params?.inn || "",
        surname: params?.surname || "",
        name: params?.name || "",
        patronymic: params?.patronymic || "",
        enabled: params?.enabled || "null"
    }
    return {
        initialValues
    }
}


export const getUserForm: getFormType<UserFormRequest, User> = (values, t) => {
    const initialValues: UserFormRequest = {
        id: values?.id,
        inn: values?.inn || "",
        login: values?.login || "",
        surname: values?.surname || "",
        name: values?.name || "",
        patronymic: values?.patronymic || "",
        dateOfBirth: DateTime.GetDateFromString(values?.dateOfBirth) || DateTime.GetNow(),
        organId: null,
        sipId: null,
        role: values?.role?.code || RolesEnum.ROLE_ADMIN,
        roles: values?.roles?.map(el => el.code) || [],
    }
    return {
        initialValues,
        validate: {
            inn: (value) => !value && t && t("form.error.required"),
            login: (value) => !value && t && t("form.error.required"),
            surname: (value) => !value && t && t("form.error.required"),
            name: (value) => !value && t && t("form.error.required"),
            patronymic: (value) => !value && t && t("form.error.required"),
            dateOfBirth: (value) => !value && t && t("form.error.required"),
            role: (value) => !value && t && t("form.error.required"),
        }
    }
}