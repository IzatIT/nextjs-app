'use client'
import { deletePage, HeadCell, Page, PagePath } from "@/entities";
import { AdminAppShell, AppTableFeature, DataDeleteFeature, DataSortingFeature, PageFilterFeature } from "@/features";
import { Content } from "@/shared";
import { AppActions } from "@/shared/ui";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const PageTableWidget = () => {
    const [openedFilter, { toggle: filterToggle }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const [deleteOpened, { toggle: deleteToggle }] = useDisclosure()
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const router = useRouter()
    const t = useTranslations()

    const handleDelete = () => {
        if (selectedId) {
            deletePage(selectedId)
            deleteToggle()
        }
    }

    const actions = (data: Page) => {
        return [
            {
                icon: <IconPencil />,
                title: t("button.edit"),
                onClick: () => router.push(`page/${data.id}/edit`),
            },
            {
                icon: <IconEye />,
                title: t("button.view"),
                onClick: () => router.push(`page/${data.id}`),
            },
            {
                icon: <IconTrash />,
                title: t("button.delete"),
                onClick: () => {
                    deleteToggle()
                    setSelectedId(data.id)
                },
            },
        ]
    };

    const headCells: HeadCell<Page>[] = [
        {
            label: t("table.id"),
            render: (n) => n.id,
        },
        {
            label: t("table.order"),
            render: (n) => n.order,
        },
        {
            label: t("table.type"),
            render: (n) => Content.GetTitleByLanguage(n.type),
        },
        {
            label: t("table.title"),
            render: (n) => Content.GetTitleByLanguage(n),
        },
        {
            label: t("table.path"),
            render: (n) => n.path,
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
        { label: t("form.label.sortby.order"), value: "ORDER" },
    ]

    return (
        <>
            <AdminAppShell
                filterToggle={filterToggle}
                sortingToggle={sortingToggle}
                withButtons
                createRouterPath="page/create"
                pageTitle={t("table.titles.page")}>
                <AppTableFeature<Page>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router.push(`page/${row.id}`)}
                    searchApi={PagePath.search}
                />
            </AdminAppShell>
            <PageFilterFeature
                opened={openedFilter} toggle={filterToggle}
            />
            <DataSortingFeature
                sortByMethods={sortByMethods}
                opened={openedSorting}
                close={closeSorting}
            />
            <DataDeleteFeature
                onDelete={handleDelete}
                opened={deleteOpened}
                toggle={deleteToggle} />
        </>
    )
}
