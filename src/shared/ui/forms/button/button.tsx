"use client"
import { Button, Loader } from "@mantine/core";
import { CSSProperties, ReactNode } from "react";
import styles from "./button.module.scss";

type Props = {
    onClick?: () => void;
    rightSection?: ReactNode;
    leftSection?: ReactNode;
    children?: ReactNode
    disabled?: boolean;
    type?: "submit" | "reset"
    variant?: ButtonVariants;
    loading?: boolean;
    style?: {
        button?: CSSProperties
    }
};

export const AppButton = ({
    disabled,
    leftSection,
    onClick,
    rightSection,
    style,
    variant,
    children,
    type,
    loading
}: Props) => {

    return (
        <Button
            className={styles.button}
            variant={variant}
            disabled={loading || disabled}
            leftSection={leftSection}
            rightSection={rightSection}
            onClick={onClick}
            style={style?.button}
            type={type}
        >
            {loading ? <Loader size={30} type="dots" /> : children}
        </Button>
    )
}
