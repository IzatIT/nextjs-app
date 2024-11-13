import { PageForm } from "@/entities";
import { AppButton } from "@/shared";
import { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PAGE_COMPONENTS, PageComponentsType } from "../configuration";
import {
    PageBannerFormFeature,
    PageCardFormFeature,
    PageDocumentFormFeature, PageLinkFormFeature
} from "./components";
import { PageAccordionFormFeature } from "./components/accordion";
import { Box, Flex } from "@mantine/core";
import { IconEye, IconPlus } from "@tabler/icons-react";
import { handleAddItem } from "../../helpers";

type Props = {
    form: UseFormReturnType<PageForm, (values: PageForm) => PageForm>
}

export const PageContentForm = ({
    form,
}: Props) => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const activeSection = Object.fromEntries(searchParams).section as PageComponentsType

    const formComponentsByActiveSection = useMemo(() => {
        switch (activeSection) {
            case PAGE_COMPONENTS.BANNER: {
                return form.values.bannerContent?.toCreate.map((item, index) => (
                    <PageBannerFormFeature key={item.order} form={form} parentIndex={index} />
                ))
            }
            case PAGE_COMPONENTS.CARD_INFO: {
                return form.values.cardContent?.toCreate.map((item, index) => (
                    <PageCardFormFeature key={item.order} form={form} parentIndex={index} />
                ))
            }
            case PAGE_COMPONENTS.DOCUMENT: {
                return form.values.documentContent?.toCreate.map((item, index) => (
                    <PageDocumentFormFeature key={item.order} form={form} parentIndex={index} />
                ))
            }
            case PAGE_COMPONENTS.LINK: {
                return form.values.linkContent?.toCreate.map((item, index) => (
                    <PageLinkFormFeature key={item.order} form={form} parentIndex={index} />
                ))
            }
            case PAGE_COMPONENTS.ACCORDION: {
                return form.values.accordionContent?.toCreate.map((item, index) => (
                    <PageAccordionFormFeature key={item.order} form={form} parentIndex={index} />
                ))
            }
        }
    }, [activeSection, form])

    return (
        <>
            <Flex direction="column" gap={24} w="100%" mb={20}>
                {formComponentsByActiveSection}
            </Flex>
            <AppButton variant="filter" onClick={() => {
                handleAddItem({ form, t, type: activeSection })
            }}>
                <IconPlus />
            </AppButton>
        </>
    )
}
