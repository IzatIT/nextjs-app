import { Content } from "@/shared";
import { Box, Card, Flex, Image, Text, Title } from "@mantine/core";
import { useLocale } from "next-intl";
import Link from "next/link";
import uniqid from "uniqid";

export type PageLinkCardProps = {
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    imageUrl?: string;
    links?: {
        link: string;
        order: number;
        titleKg: string;
        titleRu: string;
        titleEn: string;
    }[];
}

export const PageLinkCard = (data: PageLinkCardProps) => {
    const locale = useLocale()

    const links = <Flex gap={10}>
        {data?.links?.map(link => {
            const isExternalLink = link.link?.startsWith("http")
            return (
                <Text component={Link} key={uniqid()} td="underline" c="link"
                    target={isExternalLink ? "_blank" : undefined}
                    href={isExternalLink ? link.link : `/${locale}/${link.link}`}>
                    {Content.GetTitleByLanguage(link)}
                </Text>
            )
        })}
    </Flex>

    if ((data?.links?.length || 0) > 1) {
        return (
            <Card py={36} pos="relative" radius={10}>
                <Image pos="absolute" w="50%" right={0} top={0} opacity={0.3}
                    src={data?.imageUrl} alt='' />
                <Box pos='relative' style={{ zIndex: 3 }}>
                    <Box mb={{ base: 32, sm: 16 }}>
                        <Title lh={1.3} mb={{ base: 18, sm: 24 }} fz={24} fw={600}>
                            {Content.GetTitleByLanguage(data)}
                        </Title>
                        {Content.HtmlRenderFromLocale({
                            titleKg: data?.contentKg,
                            titleRu: data?.contentRu,
                            titleEn: data?.contentEn
                        })}
                    </Box>
                    {links}
                </Box>
            </Card>
        )
    }
    return (
        <Card component={Link} href={data?.links?.[0].link || ""} target="_blank" radius="14px"
            h={150}
            bg="white" px={{ base: 16, xs: 20 }} py={{ base: 20, xs: 24 }}>
            <Flex h="100%" align="center">
                <Image w={80} h={80} style={{ objectFit: "contain" }} src={data?.imageUrl} alt="" />
                <Flex
                    ml={18} pl={18} align="center" h="100%"
                    style={{ borderLeft: "1px solid #A0A0A3" }}>
                    <Text c="primaryDark" fz={14}>
                        {Content.GetTitleByLanguage(data)}
                    </Text>
                </Flex>
            </Flex>
        </Card>
    )
}



