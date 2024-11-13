"use client"
import { COLORS, LANG_SELECT_DATA, LANGUAGES } from "@/constants";
import { Actions } from "@/shared/helpers";
import { Box, Flex, Menu, Text, UnstyledButton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from './language.module.scss';

export const ChangeLanguage = ({ onlyText = false }) => {
    const location = usePathname()
    const locale = useLocale()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [opened, setOpened] = useState(false);
    const smallScreen = useMediaQuery("(max-width:768px)")

    const handleChangeLanguage = (value: string | null) => () => {
        if (value) {
            let newPath = Actions.GetNewPath(location, value);
            const params = new URLSearchParams(searchParams);
            if (params.toString()) {
                newPath += `?${params.toString()}`;
            }
            router.push(newPath);
        }
    }

    if (onlyText) {
        return (
            <Flex gap={16}>
                {
                    LANG_SELECT_DATA.map((item, index) => (
                        <Text pr={16}
                            td={item.value === locale ? 'underline' : 'none'}
                            c="#101828" key={item.value} onClick={handleChangeLanguage(item.value)}
                            style={{
                                cursor: 'pointer',
                                borderRight: LANG_SELECT_DATA.length - 1 === index ? 'none' : '2px solid #101828',
                            }}>
                            {item.label}
                        </Text>
                    ))
                }
            </Flex>
        )
    }
    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            width="target"
            withinPortal
            position={smallScreen ? "top" : "bottom"}
            withArrow
        >
            <Menu.Target>
                <UnstyledButton
                    bg="#F2F2F2"
                    className={styles.control}
                    p={14} miw={150}
                    data-expanded={opened || undefined}>
                    <Flex gap={8} align="center">
                        <Image width={20} height={20} style={{ objectFit: "contain" }}
                            src={`/img/flag_${locale}.webp`} alt="" />
                        <span className={styles.label}>
                            {LANGUAGES[locale as LocaleType]}
                        </span>
                    </Flex>
                    <IconChevronDown size="1rem" className={styles.icon} color="black" stroke={2} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown
                bg="#F2F2F2"
                style={{ border: "none", zIndex: 2000 }}>
                {
                    LANG_SELECT_DATA.map((item) => (
                        <Menu.Item key={item.value}>
                            <Flex onClick={handleChangeLanguage(item.value)} gap={8}>
                                <Box w={24}>
                                    <Image
                                        style={{ objectFit: "contain" }}
                                        width={24} height={24}
                                        src={`/img/flag_${item.value}.webp`} alt="" />
                                </Box>
                                <Text fw="600" fz={{ base: 16, sm: 14 }}>
                                    {item.label}
                                </Text>
                            </Flex>
                        </Menu.Item>
                    ))
                }
            </Menu.Dropdown>
        </Menu>
    )
}
