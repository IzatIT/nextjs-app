import { Checkbox } from "@mantine/core";
import { CSSProperties, ReactNode } from "react";
import styles from "./input.module.scss";

type Props = {
    checked?: boolean;
    onChange?: (value: boolean) => void;
    label?: string | null;
    required?: boolean;
    error?: ReactNode;
    disabled?: boolean;
    variant?: Color;
    style?: {
        checkbox?: CSSProperties
    }
};

export const AppCheckBox = ({
    onChange,
    disabled,
    error,
    label,
    required,
    checked,
    variant = "default",
    style,
}: Props) => {
    return (
        <>
            <Checkbox
                variant={variant}
                checked={checked}
                label={label}
                required={required}
                error={error}
                disabled={disabled}
                style={style?.checkbox}
                onChange={(event) => onChange && onChange(event.target.checked)}
                className={styles.checkbox}
            />
        </>
    )
}
