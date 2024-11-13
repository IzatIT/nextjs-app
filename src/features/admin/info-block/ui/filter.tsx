"use client"
import { getReferenceByTypeCode, InfoBlockFilter, Reference, ReferenceTypeCodesEnum } from "@/entities";
import { Actions, Content } from "@/shared";
import { AppButtonGroup, AppInput, AppModal, AppSelect } from "@/shared/ui";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getInfoBlockFilterForm } from "../helpers";

type Props = {
    opened: boolean;
    close: () => void;
}

export const InfoBlockFilterFeature = ({ opened, close }: Props) => {
    const t = useTranslations()
    const locale = useLocale()
    const searchParams = useSearchParams()
    const oldParams: InfoBlockFilter = Object.fromEntries(searchParams);
    const router = useRouter()
    const pathname = usePathname()
    const [reference, setReference] = useState<SearchResponse<Reference>>()
    const form = useForm(getInfoBlockFilterForm(oldParams))

    const fetchReference = async () => {
        const res = await getReferenceByTypeCode({ typeCode: ReferenceTypeCodesEnum.REF_INFO_BLOCK_TYPE })
        setReference(res)
    }

    const referenceSelectDto = useMemo(() => {
        return reference?.content?.map(el => ({
            label: Content.GetTitleByLanguage(el, locale),
            value: `${el.id}`
        }))
    }, [reference?.content])

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<InfoBlockFilter>(form.values, oldParams, pathname)
        router.push(resUrl);
        close()
    };
    const handleClearValues = () => {
        form.setInitialValues({
            title: "",
            typeId: undefined
        })
        form.reset()
    }

    useEffect(() => {
        fetchReference()
    }, [])


    return (
        <AppModal closeOnClickOutside opened={opened} toggle={close}>
            <Flex p={24} direction="column" gap={20}>
                <AppSelect
                    label={t("form.label.type")}
                    value={form.values.typeId}
                    data={referenceSelectDto}
                    {...form.getInputProps("typeId")}
                />
                <AppInput
                    label={t("form.label.title")}
                    {...form.getInputProps("title")} />
                <Center>
                    <AppButtonGroup
                        leftLabel={t("button.clear")}
                        leftOnClick={handleClearValues}
                        leftVariant="clear"
                        centerLabel={t("button.cancel")}
                        centerOnClick={close}
                        rightOnClick={handleSubmit}
                        rightLabel={t("button.submit")}
                    />
                </Center>
            </Flex>
        </AppModal>
    )
}
