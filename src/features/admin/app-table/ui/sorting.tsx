"use client"
import { NewsFilter } from "@/entities";
import { Actions, AppButtonGroup, AppModal, AppSelect } from "@/shared";
import { Center, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
    opened: boolean;
    close: () => void;
    sortByMethods?: {
        label: string;
        value: string;
    }[]
}

const sortByDefaultDto = [
    { label: "ID", value: "ID" },
]

export const DataSortingFeature = ({
    opened,
    close,
    sortByMethods = sortByDefaultDto
}: Props) => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const oldParams: NewsFilter = Object.fromEntries(searchParams);

    const form = useForm<SortRequest>({
        initialValues: {
            sortBy: "ID",
            sortDirection: "DESC"
        }
    })

    const router = useRouter()
    const pathname = usePathname()

    const handleSubmit = () => {
        const resUrl = Actions.HandleFilterFormSubmit<SortRequest>(form.values, oldParams, pathname)
        router.push(resUrl);
        close()
    };

    const sortDirectionSelectDto = [
        { label: t("form.label.asc"), value: "ASC" },
        { label: t("form.label.desc"), value: "DESC" },
    ]

    useEffect(() => {
        handleSubmit()
    }, [])
    return (
        <AppModal closeOnClickOutside opened={opened} toggle={close}>
            <Flex p={24} direction="column" gap={20}>
                <AppSelect
                    label={t("form.label.sortBy")}
                    data={sortByMethods}
                    {...form.getInputProps("sortBy")}
                />
                <AppSelect
                    label={t("form.label.sortDirection")}
                    data={sortDirectionSelectDto}
                    {...form.getInputProps("sortDirection")}
                />
                <Center>
                    <AppButtonGroup
                        leftLabel={t("button.clear")}
                        leftOnClick={() => form.reset()}
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
