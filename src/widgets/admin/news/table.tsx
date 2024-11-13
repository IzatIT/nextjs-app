'use client'
import { deleteNews, HeadCell, News, NewsPath } from "@/entities";
import {
    AdminAppShell, AppTableFeature, DataDeleteFeature,
    DataSortingFeature, NewsFilterFeature
} from "@/features";
import { Content, DateTime } from "@/shared";
import { AppActions } from "@/shared/ui";
import { Flex, List } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconEye, IconMessage, IconPencil, IconTrash } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const NewsTableWidget = () => {
    const [openedFilter, { toggle: filterToggle }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const [deleteOpened, { toggle: deleteToggle }] = useDisclosure()
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const router = useRouter()
    const t = useTranslations()

    const handleDelete = () => {
        if (selectedId) {
            deleteNews(selectedId)
            deleteToggle()
        }
    }

    const actions = (news: News) => {
        if (news.includedInMailing) {
            return [
                {
                    icon: <IconPencil />,
                    title: t("button.edit"),
                    onClick: () => router.push(`news/${news.id}/edit`),
                },
                {
                    icon: <IconEye />,
                    title: t("button.view"),
                    onClick: () => router.push(`news/${news.id}`),
                },
                {
                    icon: <IconMessage />,
                    title: t("button.sendToSubscriptions"),
                    onClick: () => () => { }
                },
                {
                    icon: <IconTrash />,
                    title: t("button.delete"),
                    onClick: () => {
                        deleteToggle()
                        setSelectedId(news.id)
                    }
                },
            ]
        } else {
            return [
                {
                    icon: <IconPencil />,
                    title: t("button.edit"),
                    onClick: () => router.push(`news/${news.id}/edit`),
                },
                {
                    icon: <IconEye />,
                    title: t("button.view"),
                    onClick: () => router.push(`news/${news.id}`),
                },
                {
                    icon: <IconTrash />,
                    title: t("button.delete"),
                    onClick: () => {
                        deleteToggle()
                        setSelectedId(news.id)
                    },
                },
            ]
        }
    };

    const headCells: HeadCell<News>[] = [
        {
            label: t("table.id"),
            render: (n) => n.id,
        },
        {
            label: t("table.title"),
            render: (n) => Content.GetTitleByLanguage(n),
        },
        {
            label: t("table.dateFrom"),
            render: (n) => DateTime.Format(n?.publishedAt, "HH:mm DD.MM.YYYY"),
        },
        {
            label: t("table.plannedTo"),
            render: (n) => n?.plannedTo ? DateTime.Format(n?.plannedTo, "HH:mm DD.MM.YYYY") : "",
        },
        {
            label: t("table.category"),
            render: (n) => <List>
                {n?.categories?.map(el => (
                    <List.Item key={el.id}>
                        {Content.GetTitleByLanguage(el)}
                    </List.Item>
                ))}
            </List>
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
        { label: t("form.label.sortby.publishedAt"), value: "PUBLISHED_AT" },
    ]

    return (
        <>
            <AdminAppShell
                filterToggle={filterToggle}
                sortingToggle={sortingToggle}
                withButtons
                createRouterPath="news/create"
                pageTitle={t("table.titles.news")}>
                <AppTableFeature<News>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router.push(`news/${row.id}`)}
                    searchApi={NewsPath.search}
                />
            </AdminAppShell>
            <NewsFilterFeature
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
