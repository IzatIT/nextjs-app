import { COLORS } from "@/constants"
import { CardInfoLaborActivity } from "@/entities"
import { AppButton, AppInput } from "@/shared"
import { Box, Divider, Grid, Title } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { useTranslations } from "next-intl"

type Props<T> = {
    form: UseFormReturnType<T, (values: T) => T>;
    laborActivities?: CardInfoLaborActivity[];
    path?: string;
}

export const CardInfoLaborActivityForm = <T,>({ form, laborActivities, path = "" }: Props<T>) => {
    const t = useTranslations()

    const initialValue = {
        order: laborActivities?.length || 0,
        year: 2020,
        titleKg: "",
        titleRu: "",
        titleEn: "",
    }
    const handleRemoveItem = (index: number) => () => {
        form.removeListItem(`${path}laborActivities`, index)
    }
    const handleAddItem = () => {
        form.insertListItem(`${path}laborActivities`, initialValue)
    }

    return (
        <Grid.Col>
            <Title c={COLORS.PRIMARY_COLOR} fz={{ base: 18, sm: 24 }} ta="center">
                {t("table.titles.labor-activities")}
            </Title>
            {laborActivities?.map((_, index) => (
                <Grid key={index} mt={12}>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppInput
                            label={t(`form.label.order`)}
                            {...form.getInputProps(`${path}laborActivities.${index}.order`)}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <AppInput
                            label={t("form.label.year")}
                            {...form.getInputProps(`${path}laborActivities.${index}.year`)}
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <Grid align="end">
                            <Grid.Col span={{ base: 12, sm: 3 }}>
                                <AppInput
                                    label={t("form.label.titleKg")}
                                    {...form.getInputProps(`${path}laborActivities.${index}.titleKg`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 3 }}>
                                <AppInput
                                    label={t("form.label.titleRu")}
                                    {...form.getInputProps(`${path}laborActivities.${index}.titleRu`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 3 }}>
                                <AppInput
                                    label={t("form.label.titleEn")}
                                    {...form.getInputProps(`${path}laborActivities.${index}.titleEn`)}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <AppButton onClick={handleRemoveItem(index)} variant="reset">
                                    <IconTrash color="orange" size={24} />
                                </AppButton>
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Divider my={32} w="100%" color="gray" />
                </Grid>
            ))}
            <Box mt={16}>
                <AppButton onClick={handleAddItem} variant="submit">
                    <IconPlus />
                </AppButton>
            </Box>
        </Grid.Col>
    )
}