import { createApi } from "@/constants";
import { UserMe } from "@/entities";
import { api, handleAxiosError } from "@/shared";

export class ProfilePath {
    static changePassword = createApi("accounts/change-password");
    static getMe = createApi("accounts/me");
}


export const getMyProfile = async (notifyOnError = true) => {
    try {
        const response = await api.get(ProfilePath.getMe);
        return response.data as UserMe;
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};
