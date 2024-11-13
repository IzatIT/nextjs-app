import withAuth from "@/shared/config/auth/with-auth";
import generateMetaData from "@/shared/config/seo/meta-data";
import { RootContainer } from "@/shared/ui";
import { CardInfoDetailWidget } from "@/widgets/admin/card-info";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: LocaleTypeParams }): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale });
    const metaData = generateMetaData(t("table.titles.detail-card_info"))
    return metaData
}

function Page() {
    return (
        <RootContainer>
            <CardInfoDetailWidget />
        </RootContainer>
    )
}

export default withAuth(Page)