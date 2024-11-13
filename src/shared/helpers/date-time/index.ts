import dayjs from "dayjs";
import "dayjs/locale/ky";
import "dayjs/locale/ru";

type DateTimeFormats =
    | "DD MMMM YYYY"
    | "DD MMM"
    | "DD.MM"
    | "DD.MM.YYYY"
    | "DD.MM.YY"
    | "DD.MM.YYYY HH:mm"
    | "HH:mm | DD.MM.YYYY"
    | "HH:mm DD.MM.YYYY"

export class DateTime {
    static Format = (date?: Date | string, format?: DateTimeFormats) => {
        const localDate = dayjs(new Date(date || "")).format(format)
        return localDate.slice(0, 5) + "" + localDate.slice(5)
    };
    static GetISONow = () => new Date().toISOString();
    static GetISOFromDate = (date?: Date) => date ? date.toISOString() : new Date().toISOString();
    static GetNow = () => new Date();
    static GetDateFromString = (date?: string) => date ? new Date(date) : new Date();
    static CreateDateFromString = (date?: string | Date) => date ? new Date(date) : new Date()
    static GetUTCNow = () => new Date().toUTCString();
    static GetFutureDate = (hours = 2, minutes = 1) => {
        const now = new Date();
        const plusedDate = new Date(now.getTime() + hours * minutes * 60 * 1000)
        now.setHours(now.getHours() + hours);
        now.setMinutes(now.getMinutes() + minutes);
        return now;
    };
    static FormatTimeAgo = (date: Date) => {
        const diffMs = Date.now() - new Date(date).getTime();
        const diffMinutes = Math.round(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 60) {
            return { minutes: diffMinutes };
        } else if (diffHours < 24) {
            return { hours: diffHours, minutes: diffMinutes % 60 };
        } else {
            return { days: diffDays, hours: diffHours % 24, minutes: diffMinutes % 60 };
        }
    };
};
