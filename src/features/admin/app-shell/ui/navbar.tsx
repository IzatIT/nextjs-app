import { AdminPageList, Profile } from "@/entities";
import { AppCookie } from "@/shared/config";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { getAccessiblePages } from "../helpers";
import { Box, Flex, Tooltip } from "@mantine/core";
import { Content } from "@/shared";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import { Text } from "@mantine/core";
import Link from "next/link";

type Props = {
    opened: boolean;
}

export const AppShellNavbarFeature = ({ opened }: Props) => {
    const [profile, setProfile] = useState<Profile | null>()
    const pageList: AdminPageList[] = getAccessiblePages(profile?.permissions)
    const locale = useLocale();
    const pathname = usePathname()
    const smallScreen = useMediaQuery("(max-width: 768px)")

    useEffect(() => {
        const res = AppCookie.GetCookie<Profile>("profile")
        setProfile(res)
    }, [locale])

    if (!pageList)
        return null
    return (
        <Flex mt={10}
            align="center"
            justify="center"
            direction={{ base: "row", sm: "column" }}>
            {pageList?.map((el) => {
                const title = Content.GetTitleByLanguage(el.title, locale)
                return (
                    <Flex
                        className={styles.page_list_item}
                        justify={opened && !smallScreen ? "start" : "center"}
                        component={Link}
                        data-active={pathname.includes(el.link)}
                        href={`/${locale}/${el.link}`} key={el.link}
                    >
                        {opened || smallScreen ?
                            <Box fz={30}>
                                {el.icon}
                            </Box> :
                            <Tooltip
                                transitionProps={{ transition: 'slide-up', duration: 200 }}
                                color="violet" label={title}>
                                <Box fz={30}>
                                    {el.icon}
                                </Box>
                            </Tooltip>}
                        {opened && !smallScreen &&
                            <Text fz={18} fw="500" >
                                {title}
                            </Text>}
                    </Flex>
                )
            })}
        </Flex>
    )

}
