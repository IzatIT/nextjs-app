import withAuth from "@/shared/config/auth/with-auth";
import generateMetaData from "@/shared/config/seo/meta-data";
import { RootContainer } from "@/shared/ui";
import { SocialLinkCreateWidget } from "@/widgets/admin/social-link";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";


export async function generateMetadata({ params }: { params: LocaleTypeParams }): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale });
    const metaData = generateMetaData(t("table.titles.create-social_link"))
    return metaData
}


function Page() {
    return (
        <RootContainer>
            <SocialLinkCreateWidget />
        </RootContainer>
    )
}

export default withAuth(Page)