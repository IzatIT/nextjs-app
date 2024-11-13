"use client"
import { CardInfo, CardInfoForm, createCardInfo, updateCardInfo } from "@/entities"
import { AppButton, AppButtonGroup } from "@/shared"
import { Center, Flex, Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getCardInfoForm } from "../helpers"
import { CardInfoLaborActivityForm } from "./form-sections"
import { CardInfoAwardsForm } from "./form-sections/awards-form"
import { CardInfoMainForm } from "./form-sections/main-form"
import { CardInfoShortBiographyForm } from "./form-sections/short-biography"

type Props = {
    data?: CardInfo
}

export const CardInfoFormFeature = ({ data }: Props) => {
    const router = useRouter()
    const [formStage, setFormStage] = useState(1)
    const locale = useLocale()
    const t = useTranslations()
    const [loading, setLoading] = useState(false)
    const form = useForm(getCardInfoForm(data, t));

    const handleSubmit = async (values: CardInfoForm) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateCardInfo(values)
        } else {
            res = await createCardInfo(values)
        }
        setLoading(false)
        if (res) {
            router.push(`/${locale}/admin/card_info`)
        }
    }

    const handleSaveAsNew = async () => {
        const res = await createCardInfo(form.values)
        setLoading(false)
        if (res) {
            router.push(`/${locale}/admin/card_info`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router.push(`/${locale}/admin/card_info`)
    }

    const getFormComponent = () => {
        switch (formStage) {
            case 1:
                return <CardInfoMainForm form={form} />
            case 2:
                return <CardInfoShortBiographyForm form={form} />
            case 3:
                return <CardInfoAwardsForm form={form} />
            case 4:
                return <CardInfoLaborActivityForm<CardInfoForm>
                    laborActivities={form.values.laborActivities}
                    form={form} />
            default:
                return <CardInfoMainForm form={form} />
        }
    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex justify="end" gap={16}>
                <AppButton
                    variant={formStage === 1 ? "submit" : "clear"}
                    onClick={() => setFormStage(1)}>
                    1
                </AppButton>
                <AppButton
                    variant={formStage === 2 ? "submit" : "clear"}
                    onClick={() => setFormStage(2)}>
                    2
                </AppButton>
                <AppButton
                    variant={formStage === 3 ? "submit" : "clear"}
                    onClick={() => setFormStage(3)}>
                    2
                </AppButton>
                <AppButton
                    variant={formStage === 4 ? "submit" : "clear"}
                    onClick={() => setFormStage(4)}>
                    4
                </AppButton>
            </Flex>
            <Grid gutter={24}>
                {getFormComponent()}
                <Grid.Col>
                    <Center>
                        <AppButtonGroup
                            loading={loading}
                            leftLabel={t("button.cancel")}
                            rightLabel={t("button.save")}
                            leftOnClick={handleCancel}
                            rightOnClick={form.onSubmit(handleSubmit)}
                            rightType="submit"
                            centerLabel={data && t("button.save-as-new")}
                            centerOnClick={data && handleSaveAsNew}
                            saveAsNew={!!data}
                        />
                    </Center>
                </Grid.Col>
            </Grid>
        </form>
    )
}
