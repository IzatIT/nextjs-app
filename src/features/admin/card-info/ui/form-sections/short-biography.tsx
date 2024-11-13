import { CardInfoForm } from "@/entities"
import { AppTextEdtior } from "@/shared"
import { Grid } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useTranslations } from "next-intl"

type Props = {
    form: UseFormReturnType<CardInfoForm, (values: CardInfoForm) => CardInfoForm>
}

export const CardInfoShortBiographyForm = ({ form }: Props) => {
    const t = useTranslations()

    return (
        <>
            <Grid.Col>
                <AppTextEdtior
                    label={t("form.label.shortBiographyKg")}
                    {...form.getInputProps("shortBiographyKg")}
                />
            </Grid.Col>
            <Grid.Col>
                <AppTextEdtior
                    label={t("form.label.shortBiographyRu")}
                    {...form.getInputProps("shortBiographyRu")}
                />
            </Grid.Col>
            <Grid.Col >
                <AppTextEdtior
                    label={t("form.label.shortBiographyEn")}
                    {...form.getInputProps("shortBiographyEn")}
                />
            </Grid.Col>
        </>
    )
}
