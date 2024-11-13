
"use server"
import { getPageByPath } from "@/entities";
import { Content } from "@/shared";
import generateMetaData from "@/shared/config/seo/meta-data";
import { getTranslations } from "next-intl/server";


export async function fetchPageMetadata(path: string, locale: LocaleType) {
    const t = await getTranslations({ locale });
    const page = await getPageByPath(path);

    const title = Content.GetTitleByLanguage(page, locale) || t("main");
    const description = Content.GetTitleByLanguage({
        titleKg: page?.descriptionKg,
        titleRu: page?.descriptionRu,
        titleEn: page?.descriptionEn,
    }, locale) || t("main");

    return { metaData: generateMetaData(title, description), pageData: page }
}