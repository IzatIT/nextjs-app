import { CardInfoForm } from "@/entities"
import { AppTextEdtior } from "@/shared"
import { Grid } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useTranslations } from "next-intl"

type Props = {
    form: UseFormReturnType<CardInfoForm, (values: CardInfoForm) => CardInfoForm>
}

export const CardInfoAwardsForm = ({ form }: Props) => {
    const t = useTranslations()

    return (
        <>
            <Grid.Col>
                <AppTextEdtior
                    label={t("form.label.awardsKg")}
                    {...form.getInputProps("awardsKg")}
                />
            </Grid.Col>
            <Grid.Col>
                <AppTextEdtior
                    label={t("form.label.awardsRu")}
                    {...form.getInputProps("awardsRu")}
                />
            </Grid.Col>
            <Grid.Col >
                <AppTextEdtior
                    label={t("form.label.awardsEn")}
                    {...form.getInputProps("awardsEn")}
                />
            </Grid.Col>
        </>
    )
}
