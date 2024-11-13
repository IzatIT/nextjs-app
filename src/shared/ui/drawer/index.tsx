"use client"

import { Drawer } from "@mantine/core";

type Props = {
    opened: boolean;
    toggle: () => void;
    children?: React.ReactNode;
    closeOnClickOutside?: boolean
}

export const AppDrawer = ({
    children,
    opened,
    toggle,
    closeOnClickOutside
}: Props) => {
    return (
        <Drawer
            closeOnClickOutside={closeOnClickOutside}
            size="lg"
            styles={{
                root: {
                    background: "none"
                },
                content: {
                    background: "rgba(50,50,97, 0.3)",
                    backdropFilter: "blur(10px)"
                },
                header: {
                    background: "rgba(50,50,97, 0.5)",
                    backdropFilter: "blur(10px)"
                },
                close: {
                    color: "orange"
                }
            }}
            position="right" withOverlay={false} opened={opened} onClose={toggle}>
            {children}
        </Drawer>
    )
}
