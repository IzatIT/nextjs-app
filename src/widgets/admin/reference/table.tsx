'use client'
import { createReference, defaultReferenceItemsForCreate, HeadCell, Reference, ReferencePath } from "@/entities";
import { AdminAppShell, AppTableFeature, DataSortingFeature, ReferenceFilterFeature } from "@/features";
import { AppActions, AppButton, Content, handleAxiosError, Notify } from "@/shared";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconChevronDown, IconEye, IconPencil, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";


export const ReferenceTableWidget = () => {
    const [openedFilter, { toggle: filterToggle }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const router = useRouter()
    const t = useTranslations()


    const actions = (reference: Reference) => {
        return [
            {
                icon: <IconPencil />,
                title: t("button.edit"),
                onClick: () => router.push(`reference/${reference.id}/edit`),
            },
            {
                icon: <IconEye />,
                title: t("button.view"),
                onClick: () => router.push(`reference/${reference.id}`),
            },
        ]
    };

    const headCells: HeadCell<Reference>[] = [
        {
            label: t("table.id"),
            render: (n) => n.id,
        },
        {
            label: t("table.title"),
            render: (n) => Content.GetTitleByLanguage(n),
        },
        {
            label: t("table.enabled"),
            render: (n) => n.enabled ? <IconCheck color="green" size={24} /> : <IconX size={24} color="orange" />,
        },

        {
            label: t("table.parent"),
            render: (n) => Content.GetTitleByLanguage(n.parent),
        },
        {
            label: t("button.actions"),
            render: (n) => (
                <AppActions
                    target={
                        <Flex gap={5}>
                            {t("button.actions")}
                            <IconChevronDown />
                        </Flex>}
                    actions={actions(n)} />
            ),
        },
    ];

    const sortByMethods = [
        { label: t("form.label.sortby.id"), value: "ID" },
    ]

    return (
        <>
            <AdminAppShell
                filterToggle={filterToggle}
                sortingToggle={sortingToggle}
                withButtons
                createRouterPath="reference/create"
                pageTitle={t("table.titles.reference")}>
                <AppTableFeature<Reference>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router.push(`reference/${row.id}`)}
                    searchApi={ReferencePath.search}
                />
            </AdminAppShell>
            <ReferenceFilterFeature
                opened={openedFilter} toggle={filterToggle}
            />

            <DataSortingFeature
                sortByMethods={sortByMethods}
                opened={openedSorting}
                close={closeSorting}
            />
        </>
    )
}
