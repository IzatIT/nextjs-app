"use client"
import { createDiagram, Diagram, DiagramForm, updateDiagram } from "@/entities"
import { Actions, AppButton, AppButtonGroup } from "@/shared"
import { Center, Flex, Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { getDiagramForm } from "../helpers"
import { DiagramFieldsForm, DiagramMainForm } from "./form-sections"

type Props = {
    data?: Diagram
}

enum FORM_STAGES {
    MAIN = "0",
    FIELDS = "1"
}

export const DiagramFormFeature = ({ data }: Props) => {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations()
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const searchParamsObj = Object.fromEntries(searchParams);
    const oldParams = {
        page: searchParamsObj.page || FORM_STAGES.MAIN,
        ...searchParamsObj
    };
    const pathname = usePathname()

    const handleChangeFormSection = (page: FORM_STAGES.MAIN | FORM_STAGES.FIELDS) => () => {
        const newUrl = Actions.HandleFilterFormSubmit({
            page: page,
        }, oldParams, pathname)
        router.push(newUrl)
    }

    const form = useForm(getDiagramForm(data, t));

    const handleSubmit = async (values: DiagramForm) => {
        setLoading(true)
        let res
        if (data) {
            res = await updateDiagram(values)
        } else {
            res = await createDiagram(values)
        }
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/diagram`)
        }
    }

    const handleSaveAsNew = async () => {
        const res = await createDiagram(form.values)
        setLoading(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/diagram`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router.push(`/${locale}/admin/diagram`)
    }

    const component = () => {
        if (oldParams.page === FORM_STAGES.MAIN) return <DiagramMainForm form={form} />
        return <DiagramFieldsForm form={form} />
    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex justify="end" gap={16}>
                <AppButton
                    variant={oldParams.page === FORM_STAGES.MAIN ? "submit" : "clear"}
                    onClick={handleChangeFormSection(FORM_STAGES.MAIN)}>
                    1
                </AppButton>
                <AppButton
                    variant={oldParams.page === FORM_STAGES.FIELDS ? "submit" : "clear"}
                    onClick={handleChangeFormSection(FORM_STAGES.FIELDS)}>
                    2
                </AppButton>
            </Flex>
            <Grid gutter={24}>
                {component()}
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
