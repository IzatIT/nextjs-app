import { ComboboxData, CSSProperties, MultiSelect } from "@mantine/core";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import styles from "./input.module.scss";
import { COLORS } from "@/constants";

type Props = {
    value?: string[];
    onChange?: (value: string[]) => void;
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

export const AppMultySelect = ({
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
        <MultiSelect
            data={data}
            label={label}
            max={maxNumber}
            min={minNumber}
            maxLength={maxLength}
            minLength={minLength}
            placeholder={placeholder}
            value={value}
            className={styles.select}
            style={style?.input}
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
                    width: "100%",
                    background: COLORS.SECONDARY_COLOR
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
                    background: COLORS.SECONDARY_COLOR,
                    fontWeight: "500",
                    fontSize: 18,
                    width: "100%"
                } : undefined,
                option: variant === "default" ? {
                    color: COLORS.PRIMARY_COLOR,
                    background: "none",
                    fontWeight: "400",
                    fontSize: 15,
                } : undefined,
                pill: variant === "default" ? {
                    borderRadius: "2px",
                    color: COLORS.PRIMARY_COLOR,
                    background: "black",
                    padding: "3px 10px",
                    height: "auto",
                    fontSize: 18,
                } : undefined,
                options: {
                    background: COLORS.SECONDARY_COLOR,
                },
                dropdown: variant === "default" ? {
                    background: COLORS.SECONDARY_COLOR,
                } : undefined
            }}
        />
    )
}
