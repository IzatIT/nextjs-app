'use client'
import { HeadCell, LogsPath, LogsSearchResponse } from "@/entities";
import {
    AdminAppShell, AppTableFeature,
    DataSortingFeature,
    LogsFilterFeature
} from "@/features";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const LogsTableWidget = () => {
    const [openedFilter, { toggle: filterToggle }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const router = useRouter()
    const t = useTranslations()

    const headCells: HeadCell<LogsSearchResponse>[] = [
        {
            label: t("table.id"),
            render: (n) => n.id,
        },
        {
            label: t("table.client"),
            render: (n) => n.client,
        },
        {
            label: t("table.clientIp"),
            render: (n) => n.clientIp,
        },
        {
            label: t("table.date"),
            render: (n) => n.date,
        },
        {
            label: t("table.method"),
            render: (n) => n.method,
        },
        {
            label: t("table.url"),
            render: (n) => n.url,
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
                withCreateButton={false}
                pageTitle={t("table.titles.logs")}>
                <AppTableFeature<LogsSearchResponse>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router.push(`logs/${row.id}`)}
                    searchApi={LogsPath.search}
                />
            </AdminAppShell>
            <LogsFilterFeature
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
