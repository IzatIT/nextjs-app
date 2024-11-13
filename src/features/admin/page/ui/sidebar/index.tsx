"use client"
import { PageForm } from "@/entities";
import { getCardInfoForm, getInfoBlockForm, handleAddItem } from "@/features";
import { AppButton, AppDrawer, Content } from "@/shared";
import { Box, Divider, Flex, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconEye, IconPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import React from "react";
import { PAGE_COMPONENTS, PageComponentsType, sidebarComponents } from "../configuration";
import { COLORS } from "@/constants";
import { useDisclosure } from "@mantine/hooks";
type Props = {
    form: UseFormReturnType<PageForm, (values: PageForm) => PageForm>
    handleChangeFormSection: (contentType: PageComponentsType) => () => void
}

export const ContentSidebarFeature = ({
    form, handleChangeFormSection
}: Props) => {
    const t = useTranslations()
    const [opened, { toggle }] = useDisclosure()

    return (
        <>
            <Box pos="absolute" right={20} bottom={10}>
                <AppButton variant={opened ? "filter" : "sorting"} onClick={toggle}>
                    <IconEye />
                </AppButton>
            </Box>
            <AppDrawer closeOnClickOutside={true} opened={opened} toggle={toggle}>
                {sidebarComponents?.map(el => (
                    <React.Fragment key={el.id}>
                        <Flex gap={15} direction="column" my={10}>
                            <Flex align="center" justify="space-between">
                                <Title c={COLORS.PRIMARY_COLOR} fz={{ base: 18, sm: 24 }} ta="center">
                                    {Content.GetTitleByLanguage(el)}
                                </Title>
                                <AppButton onClick={() => {
                                    handleAddItem({
                                        form, handleChangeFormSection, t, type: el.type
                                    })
                                    toggle()
                                }} variant="sorting">
                                    <IconPlus />
                                </AppButton>
                            </Flex>
                            <Divider opacity={0.1} />
                            {el.component}
                        </Flex>
                        <Divider />
                    </React.Fragment>
                ))}
            </AppDrawer>
        </>
    )
}
