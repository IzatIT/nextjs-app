import { showNotification } from "@mantine/notifications";
import Cookies from "js-cookie";
import { Content } from "../content";
import { COLORS } from "@/constants";
export class Notify {
    static ShowError = async (message?: string, title?: string) => {
        if (!message) {
            message = Content.GetTitleByLanguage({
                titleRu: "Повторите попытку позже или сообщите нам ошибку",
                titleKg: "Бираздан кийин аракет кылыңыз же бизге кайрылыңыз",
                titleEn: "Try this later"
            });
        }
        const defaultTitle = Content.GetTitleByLanguage({
            titleRu: "Ошибка!",
            titleKg: "Катачылык кетти!",
            titleEn: "Error!"
        })
        showNotification({
            title: `${defaultTitle} ${title ? `- ${title}` : ""}`,
            message,
            color: "orange",
            bg: "linear-gradient(45deg, rgb(23, 25, 95) -15.1%,   rgb(4, 91, 126) 72.5%)",
            styles: () => ({
                root: {
                    width: "450px",
                    zIndex: 100
                },
                title: {
                    color: "orange",
                    fontWeight: "bold",
                    fontSize: 18
                },
                description: {
                    color: COLORS.PRIMARY_COLOR,
                    opacity: 1,
                    fontSize: 16
                },
            }),
        });
    };

    static ShowSuccess = async (message?: string, title?: string) => {
        if (!message) {
            message = Content.GetTitleByLanguage({
                titleRu: "Команда успешно выполнено",
                titleKg: "Буйрук ийгиликтүү аяктады",
                titleEn: "Command finished successfully",
            });
        }
        showNotification({
            title: title || Content.GetTitleByLanguage({
                titleRu: "Успешно!",
                titleKg: "Ийгиликтүү!",
                titleEn: "Success!",
            }),
            message: message,
            color: "#90EE90",
            bg: "linear-gradient(45deg, rgb(23, 25, 95) -15.1%,   rgb(4, 91, 126) 72.5%)",
            styles: () => ({
                root: {
                    width: "450px",
                    zIndex: 100
                },
                title: {
                    color: "green",
                    fontWeight: "bold",
                    fontSize: 18
                },
                description: {
                    color: COLORS.PRIMARY_COLOR,
                    opacity: 1,
                    fontSize: 16
                },
            }),
        });
    };
    static ShowMessage = async (message?: string, title?: string,) => {
        const locale = Cookies.get('locale');

        showNotification({
            title: title || Content.GetTitleByLanguage({
                titleRu: "Сообщение",
                titleKg: "Кат",
                titleEn: "Message",
            }),
            message: message,
            color: "#262626",
            bg: "#262626",
            styles: () => ({
                root: {
                    position: "absolute",
                    bottom: "30px",
                    right: "30px",
                    width: "350px",
                    zIndex: 100
                },
                title: {
                    color: COLORS.PRIMARY_COLOR,
                    fontWeight: "bold",
                    fontSize: 18
                },
                description: {
                    color: COLORS.PRIMARY_COLOR,
                    fontSize: 16,
                    fontWeight: "600"
                },
            }),
        });
    };
}