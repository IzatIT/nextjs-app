import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AppLayout } from "@/features";
import generateMetaData from "@/shared/config/seo/meta-data";

export async function generateMetadata({ params }: { params: LocaleTypeParams }): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale });
    return generateMetaData("main", "main", "/")
}

export default function Page() {
    return (
        <AppLayout>

        </AppLayout >
    );
}
