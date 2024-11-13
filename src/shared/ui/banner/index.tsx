"use client"
import { COLORS } from "@/constants";
import { AppButton, AppIframe, AppModal, Content } from "@/shared";
import { BackgroundImage, Box, Center, Flex, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import uniqid from "uniqid";

export type PageBannerCardProps = {
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    imageUrl?: string;
    fileUrl?: string[];
    links?: {
        link?: string;
        order?: number;
        titleKg?: string;
        titleRu?: string;
        titleEn?: string;
    }[];
}

export const PageBannerCard = (data: PageBannerCardProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const [openedDocument, setOpenedDocument] = useState<string>()
    const [openedViewDoc, { toggle }] = useDisclosure()
    const handleViewDocument = (doc?: string) => () => {
        setOpenedDocument(doc)
        toggle()
    }
    const linkButtons = data?.links?.map(link => {
        const isExternalLink = link?.link?.startsWith("http")
        return (
            <Link target={isExternalLink ? "_blank" : undefined}
                key={uniqid()} href={isExternalLink ? (link?.link || "") : `/${locale}/${link.link}`}>
                <AppButton variant="banner-btn" >
                    {Content.GetTitleByLanguage(link)}
                </AppButton>
            </Link>
        )
    })

    const documentButtons = data?.fileUrl?.map(el => (
        <AppButton onClick={handleViewDocument(el)} key={uniqid()} variant="banner-btn" >
            {t("button.view")}
        </AppButton>
    ))

    return (
        <>
            <BackgroundImage src={data?.imageUrl || ""}>
                <Center h={200}>
                    <Box>
                        <Box mb={12}>
                            <Title c={COLORS.PRIMARY_COLOR} fz={{ base: 16, sm: 24 }}>
                                {Content.GetTitleByLanguage(data)}
                            </Title>
                            <Text c={COLORS.TRIOTERY_COLOR} fz={{ base: 14, sm: 16 }}>
                                {Content.GetTitleByLanguage({
                                    titleKg: data?.contentKg,
                                    titleEn: data?.contentEn,
                                    titleRu: data?.contentRu,
                                })}
                            </Text>
                        </Box>
                        <Flex align="center" gap={10} justify="center">
                            {linkButtons}
                            {documentButtons}
                        </Flex>
                    </Box>
                </Center>
            </BackgroundImage>
            <AppModal
                withCloseButton
                closeOnClickOutside
                opened={openedViewDoc}
                toggle={toggle} variant="document">
                {openedDocument &&
                    <AppIframe aspectRatio={3 / 4} width="100%" src={openedDocument} />}
            </AppModal>
        </>
    )
}
