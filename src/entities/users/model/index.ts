import { AnyRoleType, UserRoleType } from "@/entities";

export type User = {
    id: number;
    login: string;
    inn: string;
    name: string;
    surname: string;
    patronymic: string;
    dateOfBirth: string;
    role: UserRoleType;
    roles: UserRoleType[];
    enabled: boolean
}


export type UserMe = {
    id: number;
    login: string;
    inn: string;
    role: string;
    roles: string[];
    permissions: string[];
    surname: string;
    name: string;
    patronymic: string;
    credentialsValid: true;
}

export type UserFormRequest = {
    id?: number;
    inn: string;
    login: string;
    surname: string;
    name: string;
    patronymic: string;
    enabled?: boolean;
    dateOfBirth: Date;
    organId: number | null;
    sipId: number | null;
    role: AnyRoleType;
    roles: AnyRoleType[]
    password?: string;
}

export type UserFilter = {
    inn?: string;
    surname?: string;
    name?: string;
    patronymic?: string;
    enabled?: "true" | "false" | "null";
};

export type UserSearchRequest = {
    filter?: UserFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "INN" | "NAME" | "SURNAME" | "PATRONYMIC" | "ROLE_CODE ";
        sortDirection?: "ASC" | "DESC";
    };
};


export type UserForm = {
    inn: string;
    login: string;
    surname: string;
    name: string;
    patronymic: string;
    password: string;
    dateOfBirth: string;
    organId: number;
    sipId: number;
    role: AnyRoleType;
    roles: AnyRoleType[]
};


export type UserChangePassword = {
    oldPassword: string;
    newPassword: string;
}

export type UserUpdatePassword = {
    newPassword: string;
}

export type UserRolesSearchRequest = {
    pageRequest: PageRequest,
    sorting: {
        sortBy: "ID" | "TITLE" | "CODE"
        sortDirection: "ASC" | "DESC"
    },
    filter: {
        id: number;
        title: string;
        code: UserRoleType
    }
}

export type UserRoles = {
    id: number;
    title: string;
    code: string;
}