import { AppAccordion, Content } from "@/shared";
import { Flex, Grid, Image, List, Paper, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import uniqid from "uniqid";

export type PageCardInfoCardProps = {
    fullName?: string;
    awardsEn?: string;
    awardsKg?: string;
    awardsRu?: string;
    positionEn?: string;
    positionKg?: string;
    positionRu?: string;
    shortBiographyEn?: string;
    shortBiographyKg?: string;
    shortBiographyRu?: string;
    imageUrl?: string;
    laborActivities?: {
        order?: number;
        titleEn?: string;
        titleKg?: string;
        titleRu?: string;
        year?: number;
    }[];
}

export const PageCardInfoCard = ({
    awardsEn, awardsKg, awardsRu,
    imageUrl, fullName, laborActivities,
    positionEn, positionKg, positionRu, shortBiographyEn,
    shortBiographyKg, shortBiographyRu,
}: PageCardInfoCardProps) => {
    const t = useTranslations()
    const accordionData = [
        {
            control: t("section.titles.shortBiography"),
            key: "biography",
            panel: Content.HtmlRenderFromLocale({
                titleKg: shortBiographyKg,
                titleRu: shortBiographyRu,
                titleEn: shortBiographyEn,
            })
        },
        {
            control: t("section.titles.awards"),
            key: "awards",
            panel: Content.HtmlRenderFromLocale({
                titleKg: awardsKg,
                titleRu: awardsRu,
                titleEn: awardsEn,
            })
        },
        {
            control: t("section.titles.laborActivity"),
            key: "laborActivity",
            panel: <List>
                {laborActivities?.map(el => (
                    <List.Item key={uniqid()}>
                        {el.year} - {Content.GetTitleByLanguage(el)}
                    </List.Item>
                ))}
            </List>
        }
    ]

    return (
        <Paper py={16} px={8} w='100%'>
            <Grid>
                <Grid.Col span={{ base: 12, xs: 4 }}>
                    <Image src={imageUrl} maw={300} mah={400} alt="" style={{ objectFit: "contain" }} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 8 }}>
                    <Flex direction="column" gap={5} mb={10}>
                        <Title fz={{ base: 16, sm: 20 }}>
                            {Content.GetTitleByLanguage({
                                titleKg: positionKg,
                                titleRu: positionRu,
                                titleEn: positionEn,
                            })}
                        </Title>
                        <Title fz={{ base: 24, sm: 26 }}>
                            {fullName}
                        </Title>
                    </Flex>
                    <AppAccordion data={accordionData} />
                </Grid.Col>
            </Grid>
        </Paper>
    )
}
