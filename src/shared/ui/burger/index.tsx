"use client"
import { Burger } from "@mantine/core";
import styles from "./style.module.scss";
import { COLORS } from "@/constants";
type Props = {
    opened: boolean;
    toggle: () => void;
    variant?: "header-menu" | "default"
}

export const AppBurger = ({ opened, toggle, variant = "default" }: Props) => {
    return (
        <Burger className={styles.burger}
            data-variant={variant}
            opened={opened}
            onClick={toggle}
            color={variant === "default" ? COLORS.PRIMARY_COLOR : 'black'}
        />
    )
}
