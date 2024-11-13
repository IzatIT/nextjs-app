import withAuth from "@/shared/config/auth/with-auth";
import generateMetaData from "@/shared/config/seo/meta-data";
import { RootContainer } from "@/shared/ui";
import { CreateCountriesWidget } from "@/widgets/admin/create_countries/table";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: LocaleTypeParams }): Promise<Metadata> {
    const metaData = generateMetaData("Countries")
    return metaData
}

function Page() {
    return (
        <RootContainer>
            <CreateCountriesWidget />
        </RootContainer>
    )
}

export default withAuth(Page)