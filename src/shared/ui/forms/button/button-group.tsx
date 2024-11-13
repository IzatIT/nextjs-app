"use client"
import { Box, Flex, Group, Popover } from "@mantine/core";
import { AppButton } from "./button";

type Props = {
    leftLabel: string;
    centerLabel?: string;
    rightLabel?: string;
    leftOnClick?: () => void;
    centerOnClick?: () => void;
    rightOnClick?: () => void;
    rightVariant?: ButtonVariants;
    centerVariant?: ButtonVariants;
    leftVariant?: ButtonVariants;
    rightType?: "submit" | "reset";
    centerType?: "submit" | "reset";
    leftType?: "submit" | "reset";
    saveAsNew?: boolean;
    loading?: boolean;
    children?: React.ReactNode
}

export const AppButtonGroup = ({
    leftLabel,
    leftOnClick,
    rightLabel,
    rightOnClick,
    leftVariant = "clear",
    rightVariant = "submit",
    centerVariant = "reset",
    centerLabel,
    centerOnClick,
    centerType,
    leftType,
    rightType,
    saveAsNew = false,
    loading,
    children
}: Props) => {
    return (
        <Group>
            <AppButton loading={loading} type={leftType} onClick={leftOnClick} variant={leftVariant}>
                {leftLabel}
            </AppButton>
            {!saveAsNew && centerLabel &&
                <AppButton loading={loading} type={centerType} onClick={centerOnClick} variant={centerVariant}>
                    {centerLabel}
                </AppButton>}
            {!saveAsNew && rightLabel &&
                <AppButton loading={loading} type={rightType} onClick={rightOnClick} variant={rightVariant}>
                    {rightLabel}
                </AppButton>}
            {saveAsNew && centerLabel &&
                <Popover position="top-end">
                    <Popover.Target>
                        <Box>
                            <AppButton loading={loading} variant={rightVariant}>
                                {rightLabel}
                            </AppButton>
                        </Box>
                    </Popover.Target>
                    <Popover.Dropdown p={0}>
                        <Flex direction="column">
                            <AppButton loading={loading} type={rightType} onClick={rightOnClick} variant={rightVariant}>
                                {rightLabel}
                            </AppButton>
                            <AppButton loading={loading} type={centerType} onClick={centerOnClick} variant="sorting">
                                {centerLabel}
                            </AppButton>
                        </Flex>
                    </Popover.Dropdown>
                </Popover>
            }
            {children}
        </Group>
    )
}