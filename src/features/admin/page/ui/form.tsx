"use client"
import {
    createPage,
    Page, PageForm, searchPages,
    updatePage
} from "@/entities"
import {
    Actions,
    AppButton,
    AppButtonGroup
} from "@/shared"
import { Center, Flex, Grid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState} from "react"
import { getPageForm } from "../helpers"
import { PAGE_COMPONENTS, PageComponentsType } from "./configuration"
import { PageContentForm, PageMainForm } from "./form-sections"

type Props = {
    data?: Page
}
type PageCreateQueryParams = {
    page: string;
    section: PageComponentsType | "";
    [k: string]: string
}
const defaultPageValue = "0"
const defaultSectionValue = PAGE_COMPONENTS.BANNER

export const PageFormFeature = ({ data }: Props) => {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations()
    const [loadingSaving, setLoadingSaving] = useState(false)
    const searchParams = useSearchParams()
    const searchParamsObj = Object.fromEntries(searchParams);
    const oldParams: PageCreateQueryParams = {
        page: searchParamsObj.page || defaultPageValue,
        section: searchParamsObj.section as PageComponentsType || defaultSectionValue,
        ...searchParamsObj
    };
    const [activeFormPage, setActiveFormPage] = useState(parseInt(oldParams?.page))
    const [activeFormSection, setActiveFormSection] = useState(oldParams?.section)
    const form = useForm(getPageForm(data, t));
    const pathname = usePathname()


    const handleChangeFormSection = (contentType: PageComponentsType) => () => {
        setActiveFormSection(contentType)
        setActiveFormPage(1)
        const newUrl = Actions.HandleFilterFormSubmit<PageCreateQueryParams>({
            page: `1`,
            section: contentType
        }, oldParams, pathname)
        router.push(newUrl)
    }

    const handleSubmit = async (values: PageForm) => {
        setLoadingSaving(true)
        let res
        if (data) {
            res = await updatePage(values)
        } else {
            res = await createPage(values)
        }
        setLoadingSaving(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/page`)
        }
    }

    const handleSaveAsNew = async () => {
        const res = await createPage(form.values)
        setLoadingSaving(false)
        if (res?.status === 200) {
            router.push(`/${locale}/admin/page`)
        }
    }

    const handleCancel = () => {
        form.reset()
        router.push(`/${locale}/admin/page`)
    }

    const handleChangeFormPage = (index: number) => () => {
        setActiveFormPage(index)
        const newUrl = Actions.HandleFilterFormSubmit<PageCreateQueryParams>({
            page: `${index}`,
            section: index === 0 ? "" : activeFormSection
        }, oldParams, pathname)
        router.push(newUrl)
    }

    console.log(form.values.cardContent)

    const getComponent = () => {
        switch (activeFormPage) {
            case 1:
                return <PageContentForm form={form} />
            default:
                return <PageMainForm form={form} />
        }
    }


    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Flex justify="start">
                    <Flex p={15} wrap="wrap" gap={10}>
                        <AppButton variant="sorting" onClick={handleChangeFormPage(0)}>
                            {t('button.configure')}
                        </AppButton>
                    </Flex>
                    <Flex p={15} style={{ zIndex: 100 }} left={70} wrap="wrap" gap={10}>
                        <AppButton variant={oldParams.section === PAGE_COMPONENTS.BANNER ? "filter" : "sorting"}
                            onClick={handleChangeFormSection(PAGE_COMPONENTS.BANNER)}>
                            {t('button.banner')}
                        </AppButton>
                        <AppButton variant={oldParams.section === PAGE_COMPONENTS.LINK ? "filter" : "sorting"}
                            onClick={handleChangeFormSection(PAGE_COMPONENTS.LINK)}>
                            {t('button.link_card')}
                        </AppButton>
                        <AppButton variant={oldParams.section === PAGE_COMPONENTS.DOCUMENT ? "filter" : "sorting"}
                            onClick={handleChangeFormSection(PAGE_COMPONENTS.DOCUMENT)}>
                            {t('button.document')}
                        </AppButton>
                        <AppButton variant={oldParams.section === PAGE_COMPONENTS.CARD_INFO ? "filter" : "sorting"}
                            onClick={handleChangeFormSection(PAGE_COMPONENTS.CARD_INFO)}>
                            {t('button.card_info')}
                        </AppButton>
                        <AppButton variant={oldParams.section === PAGE_COMPONENTS.ACCORDION ? "filter" : "sorting"}
                            onClick={handleChangeFormSection(PAGE_COMPONENTS.ACCORDION)}>
                            {t('button.list')}
                        </AppButton>
                    </Flex>

                </Flex>
                <Grid mt={100} gutter={24}>
                    {getComponent()}
                    <Grid.Col>
                        <Center>
                            <AppButtonGroup
                                loading={loadingSaving}
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
            {/* <ContentSidebarFeature
                handleChangeFormSection={handleChangeFormSection}
                form={form} /> */}
        </>
    )
}
