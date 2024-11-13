import Cookies from "js-cookie";

type TitleLocaleObject = {
    titleRu: string;
    titleKg: string;
    titleEn: string;
    [key: string]: any | undefined;
}

type UniversalObject<T extends TitleLocaleObject> =
    | Record<string, T[keyof T]>
    | undefined
    | null;

export class Content {
    static GetTitleByLanguage = <T extends TitleLocaleObject>(data: UniversalObject<T>, locale?: string) => {
        const localLocale = locale || Cookies.get("locale")
        if (data) {
            switch (localLocale) {
                case "en":
                    return data?.["titleEn"];
                case "kg":
                    return data?.["titleKg"];
                case "ru":
                    return data?.["titleRu"];
                default:
                    return data?.["titleKg"];
            };
        };
        return "";
    };

    static HtmlRenderFromLocale = <T extends TitleLocaleObject>(data?: UniversalObject<T>, locale?: string) => {
        if (!data) {
            return "";
        };
        const contentResult = this.GetTitleByLanguage(data, locale);
        return this.HtmlRender(contentResult)
    };

    static HtmlRender = (data?: string) => {
        if (data) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            const removeStyles = (element: Element) => {
                for (const child of Array.from(element.children)) {
                    if (child.hasAttribute('style')) {
                        child.removeAttribute('style');
                    }
                    removeStyles(child);
                }
            };

            removeStyles(doc.body);

            return (
                <span dangerouslySetInnerHTML={{
                    __html: doc.body.innerHTML
                }} />
            );
        }
        return "";
    }

};
