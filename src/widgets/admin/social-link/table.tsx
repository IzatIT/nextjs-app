'use client'
import { deleteSocialLink, HeadCell, SocialLink, SocialLinkPath } from "@/entities";
import {
    AdminAppShell,
    AppTableFeature, DataDeleteFeature,
    DataSortingFeature, SocialLinkFilterFeature
} from "@/features";
import { AppActions, Content } from "@/shared";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SocialLinkTableWidget = () => {
    const [openedFilter, { toggle: filterToggle }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const [deleteOpened, { toggle: deleteToggle }] = useDisclosure()
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const router = useRouter()
    const t = useTranslations()

    const handleDelete = () => {
        if (selectedId) {
            deleteSocialLink(selectedId)
            deleteToggle()
        }
    }

    const actions = (data: SocialLink) => {
        return [
            {
                icon: <IconPencil />,
                title: t("button.edit"),
                onClick: () => router.push(`social_link/${data.id}/edit`),
            },
            {
                icon: <IconEye />,
                title: t("button.view"),
                onClick: () => router.push(`social_link/${data.id}`),
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

    const headCells: HeadCell<SocialLink>[] = [
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
            label: t("table.links"),
            render: (n) => n.link
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
                createRouterPath="social_link/create"
                pageTitle={t("table.titles.social_link")}>
                <AppTableFeature<SocialLink>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router.push(`social_link/${row.id}`)}
                    searchApi={SocialLinkPath.search}
                />
            </AdminAppShell>
            <SocialLinkFilterFeature
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
