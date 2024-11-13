import { COLORS } from "@/constants";
import { AuthFeature } from "@/features";
import { AuthParticles, RootContainer } from "@/shared";
import authorized from "@/shared/config/auth/authorized";
import generateMetaData from "@/shared/config/seo/meta-data";
import { Card, Center, Flex, Title } from "@mantine/core";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params }: { params: LocaleTypeParams }): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale });
    const metaData = generateMetaData("Login")
    return metaData
}

function Page() {
    const t = useTranslations()
    return (
        <RootContainer centered>
            <Flex
                pos="relative"
                direction="column" mx={{ base: 0, xs: 100 }}
                mt={30} justify="start" w="100%" h="100%">
                <Flex
                    pos="relative" style={{ zIndex: 10 }}
                    align="center" mb={100} w="100%"
                    justify={{ base: "center", xs: "space-between" }}>
                    <Title display={{ base: "none", xs: "inline" }} c={COLORS.PRIMARY_COLOR} fz={24}>
                        {t("main")}
                    </Title>
                    <Image priority width={300} height={150} style={{ objectFit: "contain" }} src="/logo.svg" alt="" />
                    <Title display={{ base: "none", xs: "inline" }} c={COLORS.PRIMARY_COLOR} fz={24}>
                        {t("main")}
                    </Title>
                </Flex>
                <Center
                    pos="relative" style={{ zIndex: 10 }}
                    w="100%">
                    <Card w={340} radius="lg" style={{ boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px" }}>
                        <AuthFeature />
                    </Card>
                </Center>
                <AuthParticles />
            </Flex>
        </RootContainer>
    )
}

export default authorized(Page)