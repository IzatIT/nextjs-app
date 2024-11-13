'use client'
import { CardInfo, CardInfoPath, deleteCardInfo, HeadCell } from "@/entities";
import {
    AdminAppShell, AppTableFeature,
    CardInfoFilterFeature, DataDeleteFeature,
    DataSortingFeature
} from "@/features";
import { AppActions, Content } from "@/shared";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconCheck, IconChevronDown, IconEye,
    IconPencil, IconTrash, IconX
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CardInfoTableWidget = () => {
    const [openedFilter, { toggle: filterToggle }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const [deleteOpened, { toggle: deleteToggle }] = useDisclosure()
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const router = useRouter()
    const t = useTranslations()

    const handleDelete = () => {
        if (selectedId) {
            deleteCardInfo(selectedId)
            deleteToggle()
        }
    }


    const actions = (data: CardInfo) => {
        return [
            {
                icon: <IconPencil />,
                title: t("button.edit"),
                onClick: () => router.push(`card_info/${data.id}/edit`),
            },
            {
                icon: <IconEye />,
                title: t("button.view"),
                onClick: () => router.push(`card_info/${data.id}`),
            },
            {
                icon: <IconTrash />,
                title: t("button.delete"),
                onClick: () => {
                    deleteToggle()
                    if (data?.id) setSelectedId(data?.id)
                }
            },
        ]
    };

    const headCells: HeadCell<CardInfo>[] = [
        {
            label: t("table.id"),
            render: (n) => n.id,
        },
        {
            label: t("table.fullname"),
            render: (n) => n.fullName,
        },
        {
            label: t("table.active"),
            render: (n) => n.active ? <IconCheck color="green" /> : <IconX color="orange" />,
        },
        {
            label: t("table.order"),
            render: (n) => n.order,
        },
        {
            label: t("table.email"),
            render: (n) => n.email,
        },
        {
            label: t("table.cardType"),
            render: (n) => Content.GetTitleByLanguage(n.type),
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
                createRouterPath="card_info/create"
                pageTitle={t("table.titles.card_info")}>
                <AppTableFeature<CardInfo>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router.push(`card_info/${row.id}`)}
                    searchApi={CardInfoPath.search}
                />
            </AdminAppShell>
            <CardInfoFilterFeature
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
