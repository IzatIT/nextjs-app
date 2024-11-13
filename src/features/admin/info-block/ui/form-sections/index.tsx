import { InfoBlockLinkType } from "@/entities"
import { AppInput, AppTextEdtior } from "@/shared"
import { Box, Divider, Grid, Text, Title } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useTranslations } from "next-intl"

type Props<T> = {
    form: UseFormReturnType<T, (values: T) => T>
    path?: string;
    linksTitle?: string;
    links?: InfoBlockLinkType[];
    withContent?: boolean;
}

export const InfoBlockLinksForm = <T,>({
    form,
    links,
    linksTitle,
    path = "",
    withContent = false
}: Props<T>) => {
    const t = useTranslations()
    const title = linksTitle || t("table.titles.links")
    const initialValue = {
        order: links?.length || 0,
        link: "",
        titleKg: "",
        titleRu: "",
        titleEn: "",
        contentKg: "",
        contentRu: "",
        contentEn: "",
    }
    const handleRemoveItem = (index: number) => () => {
        form.removeListItem(`${path}links`, index)
    }
    const handleAddItem = () => {
        form.insertListItem(`${path}links`, initialValue)
    }

    return (
        <Grid.Col>
            <Title c="white" fz={{ base: 18, sm: 24 }} ta="center">
                {title}
            </Title>
            {links?.map((_, index) => (
                <Grid key={index} mt={12}>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppInput
                            label={t(`form.label.order`)}
                            {...form.getInputProps(`${path}links.${index}.order`)}
                        />
                    </Grid.Col>
                    {!withContent &&
                        <Grid.Col span={{ base: 12, sm: 4 }}>
                            <AppInput
                                label={t("form.label.link")}
                                {...form.getInputProps(`${path}links.${index}.link`)}
                            />
                        </Grid.Col>}
                    <Grid.Col>
                        <Grid align="end">
                            <Grid.Col span={{ base: 12, sm: 3 }}>
                                <AppInput
                                    label={t("form.label.titleKg")}
                                    {...form.getInputProps(`${path}links.${index}.titleKg`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 3 }}>
                                <AppInput
                                    label={t("form.label.titleRu")}
                                    {...form.getInputProps(`${path}links.${index}.titleRu`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 3 }}>
                                <AppInput
                                    label={t("form.label.titleEn")}
                                    {...form.getInputProps(`${path}links.${index}.titleEn`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Text c="orange" fz={16} style={{ cursor: "pointer" }}
                                    onClick={handleRemoveItem(index)}>
                                    {t("button.delete-link")}
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    {withContent &&
                        <Grid>
                            <Grid.Col span={12}>
                                <AppTextEdtior
                                    label={t("form.label.contentKg")}
                                    {...form.getInputProps(`${path}links.${index}.contentKg`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <AppTextEdtior
                                    label={t("form.label.contentRu")}
                                    {...form.getInputProps(`${path}links.${index}.contentRu`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <AppTextEdtior
                                    label={t("form.label.contentEn")}
                                    {...form.getInputProps(`${path}links.${index}.contentEn`)}
                                />
                            </Grid.Col>
                        </Grid>}
                    <Divider my={15} w="100%" color="gray" />
                </Grid>
            ))}
            <Box mt={16}>
                <Text c="blue" fz={18} style={{ cursor: "pointer" }}
                    onClick={handleAddItem}>
                    {t("button.add-item")}
                </Text>
            </Box>
        </Grid.Col>
    )
}
