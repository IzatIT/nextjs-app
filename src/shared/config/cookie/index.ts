
import Cookies from "js-cookie"

type cookieKeysType = "refresh_token" | "access_token" | "profile" | "locale" | "navbar-open"

export class AppCookie {
    static GetCookie = <T>(key: cookieKeysType) => {
        const res = Cookies.get(key)
        if (res) {
            const parsedData: T = JSON.parse(res)
            return parsedData
        }
        return null
    }
    static SetCookie = (key: cookieKeysType, value: string, expires?: number) => {
        Cookies.set(key, value, { expires: expires });
    }
    static RemoveCookie = (key: cookieKeysType) => {
        Cookies.remove(key)
    }
}