'use client'
import { deleteInfoBlock, HeadCell, InfoBlock, InfoBlockPath } from "@/entities";
import {
    AdminAppShell, AppTableFeature, DataDeleteFeature,
    DataSortingFeature, InfoBlockFilterFeature
} from "@/features";
import { Content } from "@/shared";
import { AppActions } from "@/shared/ui";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const InfoBlockTableWidget = () => {
    const [openedFilter, { toggle: filterToggle, close: filterClose }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const [deleteOpened, { toggle: deleteToggle }] = useDisclosure()
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const router = useRouter()
    const t = useTranslations()
    const locale = useLocale()
    const handleDelete = () => {
        if (selectedId) {
            deleteInfoBlock(selectedId)
            deleteToggle()
        }
    }

    const actions = (data: InfoBlock) => {
        return [
            {
                icon: <IconPencil />,
                title: t("button.edit"),
                onClick: () => router.push(`info_block/${data.id}/edit`),
            },
            {
                icon: <IconEye />,
                title: t("button.view"),
                onClick: () => router.push(`info_block/${data.id}`),
            },
            {
                icon: <IconTrash />,
                title: t("button.delete"),
                onClick: () => {
                    deleteToggle()
                    if (data.id) setSelectedId(data.id)
                },
            },
        ]
    };

    const headCells: HeadCell<InfoBlock>[] = [
        {
            label: t("table.id"),
            render: (n) => n.id,
        },
        {
            label: t("table.order"),
            render: (n) => n.order,
        },
        {
            label: t("table.title"),
            render: (n) => Content.GetTitleByLanguage(n),
        },
        {
            label: t("table.type"),
            render: (n) => Content.GetTitleByLanguage(n.type),
        },
        {
            label: t("table.content"),
            render: (n) => Content.HtmlRenderFromLocale({ titleKg: n.contentKg, titleRu: n.contentRu, titleEn: n.contentEn }, locale)
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
                createRouterPath="info_block/create"
                pageTitle={t("table.titles.info_block")}>
                <AppTableFeature<InfoBlock>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router.push(`info_block/${row.id}`)}
                    searchApi={InfoBlockPath.search}
                />
            </AdminAppShell>
            <InfoBlockFilterFeature
                opened={openedFilter} close={filterClose}
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
