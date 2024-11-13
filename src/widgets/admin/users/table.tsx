'use client'
import { HeadCell, User, UserPath } from "@/entities";
import { AdminAppShell, AppTableFeature, DataSortingFeature, UserChangePassword, UserFilterFeature } from "@/features";
import { AppActions } from "@/shared/ui";
import { Flex, List } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconEye, IconLockSquareRounded, IconPencil } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const UserTableWidget = () => {
    const [openedFilter, { toggle: filterToggle }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const [changePasswordOpened, { toggle: changePasswordToggle }] = useDisclosure()
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const router = useRouter()
    const t = useTranslations()

    const actions = (data: User) => {
        return [
            {
                icon: <IconPencil />,
                title: t("button.edit"),
                onClick: () => router.push(`user/${data.id}/edit`),
            },
            {
                icon: <IconEye />,
                title: t("button.view"),
                onClick: () => router.push(`user/${data.id}`),
            },
            {
                icon: <IconLockSquareRounded />,
                title: t("button.change-password"),
                onClick: () => {
                    changePasswordToggle()
                    setSelectedUserId(data.id)
                }
            },
        ]
    };

    const headCells: HeadCell<User>[] = [
        {
            label: t("table.id"),
            render: (n) => n.id,
        },
        {
            label: t("table.inn"),
            render: (n) => n.inn,
        },
        {
            label: t("table.login"),
            render: (n) => n.login,
        },
        {
            label: t("table.fullname"),
            render: (n) => `${n.surname} ${n.name} ${n.patronymic}`,
        },
        {
            label: t("table.roles"),
            render: (n) => <List>
                {n.roles ?
                    n.roles?.map(el => (
                        <List.Item key={el.id}>
                            {el?.title}
                        </List.Item>
                    )) :
                    <List.Item>
                        {n?.role?.title}
                    </List.Item>}
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
        { label: t("form.label.sortby.inn"), value: "INN" },
        { label: t("form.label.sortby.name"), value: "NAME" },
        { label: t("form.label.sortby.surname"), value: "SURNAME" },
        { label: t("form.label.sortby.patronymic"), value: "PATRONYMIC" },
        { label: t("form.label.sortby.role-code"), value: "ROLE_CODE" },
    ]

    return (
        <>
            <AdminAppShell
                filterToggle={filterToggle}
                sortingToggle={sortingToggle}
                withButtons
                createRouterPath="user/create"
                pageTitle={t("table.titles.users")}>
                <AppTableFeature<User>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router.push(`user/${row.id}`)}
                    searchApi={UserPath.search}
                />
            </AdminAppShell>
            <UserFilterFeature
                opened={openedFilter} toggle={filterToggle}
            />
            <DataSortingFeature
                sortByMethods={sortByMethods}
                opened={openedSorting}
                close={closeSorting}
            />
            <UserChangePassword
                opened={changePasswordOpened}
                toggle={changePasswordToggle}
                userId={selectedUserId}
            />
        </>
    )
}
