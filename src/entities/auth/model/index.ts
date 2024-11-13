
export type LoginRequest = {
    login: string;
    password: string;
};

export type LoginErrorType = {
    login?: string;
    password?: string;
}

export enum RolesEnum {
    ROLE_ADMIN = "ROLE_ADMIN"
}

export type AnyRoleType = RolesEnum.ROLE_ADMIN

export type UserRoleType = {
    id: number;
    title: string;
    code: AnyRoleType
}

export type AuthRefreshTokenResponse = {
    authenticationToken: string;
    refreshToken: string;
    expiresAt: string;
    login: string;
    role: string;
    roles: string[];
    permissions: string[];
    fullName: string
}
export type Profile = {
    authenticationToken: string;
    refreshToken: string;
    expiresAt: string;
    login: string;
    role: AnyRoleType;
    roles: AnyRoleType[];
    permissions: string[];
    fullName: string;
}

