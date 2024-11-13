import { AppButton, AppIframe, AppModal, Content } from "@/shared";
import { Box, Flex, Image, Paper, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";

export type PageDocumentCardProps = {
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    fileUrl?: string;
    imageUrl?: string
}

export const PageDocumentCard = (data: PageDocumentCardProps) => {
    const [openedViewDoc, { toggle: toggleViewDoc }] = useDisclosure()
    const t = useTranslations()
    return (
        <>
            <Paper pos="relative" maw={400}>
                <Image
                    opacity={0.4}
                    style={{ objectFit: "contain" }} pos="absolute" top={0} left={0} w="100%" h="100%"
                    src={data?.imageUrl} alt="" />
                <Flex align="center" justify="space-around" direction="column" h={500}
                    pos="relative" style={{ zIndex: 3 }} >
                    <Box>
                        <Title fz={{ base: 18, sm: 22 }}>
                            {Content.GetTitleByLanguage(data)}
                        </Title>
                        <Text>
                            {Content.GetTitleByLanguage({
                                titleKg: data?.contentKg,
                                titleRu: data?.contentRu,
                                titleEn: data?.contentEn,
                            })}
                        </Text>
                    </Box>
                    <AppButton onClick={toggleViewDoc} variant="banner-btn">
                        {t("button.view")}
                    </AppButton>
                </Flex>
            </Paper>
            <AppModal
                withCloseButton
                closeOnClickOutside
                opened={openedViewDoc}
                toggle={toggleViewDoc} variant="document">
                <AppIframe aspectRatio={9 / 14} width="100%" src={data?.fileUrl || ""} />
            </AppModal>
        </>
    )
}
