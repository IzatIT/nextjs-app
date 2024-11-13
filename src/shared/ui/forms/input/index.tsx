"use client"
import { CSSProperties, Input, PasswordInput, Text } from "@mantine/core";
import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";
import styles from "./input.module.scss";

type Props = {
    value?: string | number | readonly string[];
    onChange?: ChangeEventHandler<HTMLInputElement>;
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
    onFocus?: () => void;
    onBlur?: () => void;
    variant?: "default" | "primary" | "secondary" | "tertiary" | "outlined" | "card_input";
    placeholder?: string;
    style?: {
        input?: CSSProperties
        label?: CSSProperties
    }
};

export const AppInput = ({
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
    onFocus,
    onBlur
}: Props) => {
    return (
        <div>
            {label && (
                <Text
                    variant={variant}
                    className={styles.text}
                    style={style?.label}
                >
                    {label}
                </Text>
            )}
            {type === "password" ?
                <PasswordInput
                    max={maxNumber}
                    min={minNumber}
                    maxLength={maxLength}
                    minLength={minLength}
                    placeholder={placeholder}
                    value={value}
                    className={styles.password_input}
                    style={style?.input}
                    onChange={onChange}
                    required={required}
                    leftSection={leftSection}
                    error={error}
                    type={type}
                    rightSection={rightSection}
                    disabled={disabled}
                    variant={variant}
                />
                : <>
                    <Input
                        onFocus={onFocus}
                        onBlur={onBlur}
                        max={maxNumber}
                        min={minNumber}
                        maxLength={maxLength}
                        minLength={minLength}
                        leftSection={leftSection}
                        placeholder={placeholder}
                        value={value}
                        className={styles.input}
                        style={style?.input}
                        onChange={onChange}
                        required={required}
                        error={error}
                        type={type}
                        rightSection={rightSection}
                        disabled={disabled}
                        variant={variant}
                    />
                    {error ? <Text fz={12} c="red">
                        {error}
                    </Text> : null}
                </>}
        </div>
    )
}
