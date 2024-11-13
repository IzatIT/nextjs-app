import { Modal } from "@mantine/core";

type Props = {
    opened: boolean;
    toggle: () => void;
    children: React.ReactNode;
    closeOnClickOutside?: boolean;
    withCloseButton?: boolean;
    size?: string;
    variant?: "document" | "modal"
}

export const AppModal = ({
    opened,
    toggle,
    children,
    closeOnClickOutside = false,
    withCloseButton = false,
    size = "lg",
    variant = "modal"
}: Props) => {
    return (
        <Modal
            size={size} closeOnClickOutside={closeOnClickOutside}
            styles={{

                content: {
                    background: "rgba(28,28,80, 0.3)",
                    backdropFilter: "blur(10px)"
                },
                header: {
                    background: "rgba(28,28,80, 0.3)",
                    backdropFilter: "blur(10px)"
                },
                root: {
                    zIndex: 100
                }
            }}
            withCloseButton={withCloseButton}
            opened={opened}
            onClose={toggle}>
            {children}
        </Modal>
    )
}
