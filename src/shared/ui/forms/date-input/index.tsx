import { DateInput, DateValue } from '@mantine/dates';
import { CSSProperties, ReactNode } from "react";
import styles from "./input.module.scss";
import { COLORS } from '@/constants';

type Props = {
    value?: DateValue;
    onChange?: (value?: DateValue) => void;
    label?: string | null;
    required?: boolean;
    error?: ReactNode;
    disabled?: boolean;
    maxDate?: Date;
    minDate?: Date;
    valueFormat?: string;
    variant?: Color;
    style?: {
        checkbox?: CSSProperties
    }
};

const generateStylesByVariant = (variant: Color) => {
    switch (variant) {
        case "default":
            return {
                popoverStyles: {
                    dropdown: {
                        background: "rgb(28, 28, 80)",
                        color: COLORS.PRIMARY_COLOR
                    }
                },
                styles: {
                    label: {
                        color: COLORS.PRIMARY_COLOR
                    },
                    calendarHeaderControlIcon: {
                        color: COLORS.PRIMARY_COLOR,
                    },
                    calendarHeaderLevel: {
                        background: "none"
                    },
                    calendarHeaderControl: {
                        color: COLORS.PRIMARY_COLOR,
                        background: "none"
                    },
                    weekday: {
                        color: "lightgreen",
                    },
                    day: {
                        color: COLORS.PRIMARY_COLOR,
                        background: "none"
                    },
                    monthsListControl: {
                        background: "none",
                        color: COLORS.PRIMARY_COLOR
                    },
                    yearsListControl: {
                        background: "none",
                        color: COLORS.PRIMARY_COLOR
                    }
                }
            }
        default:
            return {}
    }

}

export const AppDateInput = ({
    onChange,
    disabled,
    error,
    label,
    required,
    value,
    variant = "default",
    style,
    maxDate,
    minDate,
    valueFormat = 'DD/MM/YYYY'
}: Props) => {
    const stylesByVariant = generateStylesByVariant(variant)
    return (
        <DateInput
            styles={stylesByVariant.styles}
            valueFormat={valueFormat}
            value={value}
            maxDate={maxDate}
            minDate={minDate}
            defaultValue={value}
            onReset={() => onChange && onChange(undefined)}
            popoverProps={{
                styles: stylesByVariant.popoverStyles
            }}
            variant={variant}
            clearable
            clearButtonProps={{
                style: { color: COLORS.PRIMARY_COLOR }
            }}
            label={label}
            required={required}
            error={error}
            disabled={disabled}
            style={style?.checkbox}
            onChange={onChange}
            className={styles.date_input}
        />
    )
}
