import { AppCookie } from "@/shared/config";

export const logout = () => {
    AppCookie.RemoveCookie('access_token');
    AppCookie.RemoveCookie('refresh_token');
    AppCookie.RemoveCookie('profile');
};

