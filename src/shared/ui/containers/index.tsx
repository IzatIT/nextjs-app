"use client"
import { COLORS } from "@/constants";
import { Box } from "@mantine/core";

type Props = {
    children?: React.ReactNode;
    centered?: boolean;
    bg?: "primary" | "secondary";
}
export const RootContainer = ({ children, centered = false, bg = "primary" }: Props) => {
    return (
        <Box
            m={0}
            p={0}
            bg={bg === "secondary" ? COLORS.SECONDARY_COLOR : COLORS.SECONDARY_BG}
            h="100vh"
            w="100vw"
            style={{
                overflow: "hidden",
                display: centered ? "flex" : "block",
                alignItems: 'center',
                justifyConten: "center",
            }}>
            {children}
        </Box>
    )
}
