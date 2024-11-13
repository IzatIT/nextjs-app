import { createApi } from "@/constants";
import { LoginRequest, Profile } from "@/entities";
import { Notify } from "@/shared/";
import { api, handleAxiosError } from "@/shared/config";
import Cookies from "js-cookie";

export class AuthPath {
    static login = createApi("auth/login");
    static logout = createApi("auth/logout");
    static refreshToken = createApi("auth/refresh/token");
    static registrationAuth = createApi("auth/registration");
    static OtpVerification = createApi("auth/verify-otp");
}

export const login = async (credentials: LoginRequest, notifyOnError = true) => {
    try {
        const response = await api.post<Profile>(AuthPath.login, credentials);
        const { authenticationToken, refreshToken, ...userProfile } = response.data;
        Notify.ShowSuccess(userProfile.login)
        Cookies.set('access_token', authenticationToken);
        Cookies.set('refresh_token', refreshToken);
        Cookies.set('profile', JSON.stringify(userProfile));
        return response.data;
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

export const getCurrentUser = async (notifyOnError = true) => {
    try {
        const response = await api.get(AuthPath.OtpVerification);
        return response.data;
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};
