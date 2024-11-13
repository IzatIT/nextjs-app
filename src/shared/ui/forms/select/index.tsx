import { ComboboxData, ComboboxItem, CSSProperties, Select } from "@mantine/core";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import styles from "./input.module.scss";
import { COLORS } from "@/constants";

type Props = {
    value?: string | null;
    onChange?: ((value: string | null, option: ComboboxItem) => void);
    type?: HTMLInputTypeAttribute
    label?: string | null;
    required?: boolean;
    error?: ReactNode;
    rightSection?: ReactNode;
    leftSection?: ReactNode;
    maxLength?: number;
    minLength?: number;
    maxNumber?: number;
    minNumber?: number;
    disabled?: boolean;
    variant?: "default" | "primary" | "secondary" | "tertiary" | "outlined";
    placeholder?: string;
    style?: {
        input?: CSSProperties
        label?: CSSProperties
    };
    searchable?: boolean;
    data?: ComboboxData;
};

export const AppSelect = ({
    onChange,
    type,
    disabled,
    error,
    label,
    required,
    rightSection,
    value,
    variant = "default",
    placeholder,
    style,
    maxLength,
    maxNumber,
    minLength,
    minNumber,
    leftSection,
    data,
    searchable = false,
}: Props) => {

    return (
        <Select
            data={data}
            label={label}
            max={maxNumber}
            min={minNumber}
            maxLength={maxLength}
            minLength={minLength}
            placeholder={placeholder}
            //@ts-ignore
            value={value}
            className={styles.select}
            style={style?.input}
            //@ts-ignore
            onChange={onChange}
            required={required}
            leftSection={leftSection}
            error={error}
            searchable={searchable}
            type={type}
            rightSection={rightSection}
            disabled={disabled}
            variant={variant}
            styles={{
                wrapper: {
                    width: "100%"
                },
                root: {
                    width: "100%"
                },
                label: variant === "default" ? {
                    color: COLORS.PRIMARY_COLOR,
                    fontSize: "16px",
                    fontWeight: 400,
                    marginBottom: "5px"
                } : {},
                input: variant === "default" ? {
                    color: COLORS.PRIMARY_COLOR,
                    fontWeight: "500",
                    fontSize: 18,
                    width: "100%"
                } : undefined,
                option: variant === "default" ? {
                    color: COLORS.PRIMARY_COLOR,
                    fontWeight: "400",
                    fontSize: 15,
                } : undefined,
                dropdown: variant === "default" ? {
                    background: COLORS.SECONDARY_COLOR,

                } : undefined
            }}
        />
    )
}
