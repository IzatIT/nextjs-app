"use client"
import { AppCookie } from "@/shared/config";
import { AppBurger, AppButtonGroup, ChangeLanguage } from "@/shared/ui";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShellNavbarFeature } from "./navbar";
import { ProfileActionsFeature } from "./profile-actions";
import { AppShell, Flex, Paper, ScrollArea, Title } from "@mantine/core";
import styles from "./styles.module.scss"
import { COLORS } from "@/constants";

type Props = {
    children: React.ReactNode;
    pageTitle?: string;
    withButtons?: boolean;
    withCreateButton?: boolean;
    createRouterPath?: string;
    filterToggle?: () => void
    sortingToggle?: () => void
}

const navbarMaxWidth = 280
const navbarMinWidth = 90


export const AdminAppShell = ({
    children,
    pageTitle,
    withButtons = true,
    withCreateButton = true,
    createRouterPath,
    filterToggle,
    sortingToggle
}: Props) => {
    const [opened, { toggle, close, open }] = useDisclosure(true);
    const router = useRouter()
    const t = useTranslations()

    const handleToggle = () => {
        AppCookie.SetCookie("navbar-open", opened ? "true" : "false")
        toggle()
    }

    useEffect(() => {
        const res = AppCookie.GetCookie<boolean>("navbar-open")
        if (res) {
            close()
        } else {
            open()
        }
    }, [])

    const header = (
        <Flex className={styles.header_box}>
            <Flex align="center" gap={32}>
                <AppBurger
                    opened={opened}
                    toggle={handleToggle}
                />
            </Flex>
            <Flex align="center" gap={16}>
                <ChangeLanguage />
                <ProfileActionsFeature />
            </Flex>
        </Flex>
    )
    const navbar = (
        <AppShellNavbarFeature opened={opened} />
    )

    const top = withButtons && filterToggle ? (
        <AppButtonGroup
            leftLabel={t("button.filter")}
            centerLabel={t("button.sorting")}
            rightLabel={withCreateButton ? t("button.create") : undefined}
            leftVariant="filter"
            centerVariant="sorting"
            leftOnClick={filterToggle}
            centerOnClick={sortingToggle}
            rightOnClick={withCreateButton ? () => createRouterPath && router.push(createRouterPath) : undefined}
        />
    ) : null
    return (
        <AppShell
            header={{ height: 60 }}
            styles={{ navbar: { overflow: "hidden" } }}
            navbar={{
                width: opened ? navbarMaxWidth : navbarMinWidth,
                breakpoint: 'sm',
                collapsed: { desktop: false, mobile: false },
            }}
            padding="lg"
        >
            <AppShell.Header className={styles.header}>
                {header}
            </AppShell.Header>

            <AppShell.Navbar display={{ base: "none", sm: "block" }} className={styles.navbar}>
                {navbar}
            </AppShell.Navbar>

            <AppShell.Main>
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    mb={15} align="center"
                    justify={{ base: "start", sm: pageTitle ? "space-between" : "end" }}>
                    {pageTitle &&
                        <Title tt="uppercase" fz={26} fw={900} c={COLORS.PRIMARY_COLOR}>
                            {pageTitle}
                        </Title>}
                    {top}
                </Flex>
                <ScrollArea h="80vh" scrollbars="y">
                    <Paper
                        w="100%"
                        p="lg"
                        bg={COLORS.PRIMARY_BG}>
                        {children}
                    </Paper>
                </ScrollArea>
            </AppShell.Main>
            <AppShell.Footer className={styles.footer} display={{ base: "block", sm: "none" }}>
                {navbar}
            </AppShell.Footer>
        </AppShell>
    )
}
