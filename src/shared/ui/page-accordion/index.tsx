"use client"
import { AppAccordion, AppIframe, Content } from "@/shared";
import { Box, Flex, Image, Text, Title, } from "@mantine/core";
import { useLocale } from "next-intl";
import uniqid from "uniqid";

type Props = {
    data: PageAccordionCardProps[]
}

export type PageAccordionCardProps = {
    titleKg?: string;
    titleRu?: string;
    titleEn?: string;
    contentKg?: string;
    contentRu?: string;
    contentEn?: string;
    imageUrl?: string[];
    fileUrl?: string[];
}

export const PageAccordionCard = ({ data }: Props) => {
    const locale = useLocale()
    const accordionData = data?.map(el => ({
        control: <Title fz={18} c="white">{Content.GetTitleByLanguage(el)}</Title>,
        panel: <Box>
            <Text c="white">
                {Content.GetTitleByLanguage({
                    titleKg: el.contentKg,
                    titleRu: el.contentRu,
                    titleEn: el.contentEn,
                }, locale)}
            </Text>
            <Flex>
                {el.imageUrl?.map(image => <Image key={image} maw={300} mah={300} alt="" src={image} />)}
                {el.fileUrl?.map(file => <AppIframe key={file} src={file} aspectRatio={3 / 4} width={300} />)}
            </Flex>
        </Box>,
        key: uniqid()
    }))


    return (
        <AppAccordion
            variant="page"
            data={accordionData}
        />
    )
}
