import withAuth from "@/shared/config/auth/with-auth";
import generateMetaData from "@/shared/config/seo/meta-data";
import { RootContainer } from "@/shared/ui";
import { CreateReferencesWidget } from "@/widgets/admin/create_references/table";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: LocaleTypeParams }): Promise<Metadata> {
    const metaData = generateMetaData("References")
    return metaData
}

function Page() {
    return (
        <RootContainer>
            <CreateReferencesWidget />
        </RootContainer>
    )
}

export default withAuth(Page)