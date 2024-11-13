"use client"
import "dayjs/locale/ru";
import { DatePicker, DateValue } from "@mantine/dates";
import { Dispatch, SetStateAction } from 'react';
import { DATE_NOW } from '@/constants';
import { useMediaQuery } from "@mantine/hooks";

interface Props {
    date: DateValue;
    setDate: Dispatch<SetStateAction<DateValue>>;
}

export const AppCalendar = ({ date, setDate }: Props) => {
    const largeScreen = useMediaQuery("(max-width: 1200px)")
    const middleScreen = useMediaQuery("(min-width: 992px)")
    const handleSelectDate = (value: DateValue) => {
        if (date?.getDate() === value?.getDate()) {
            setDate(null);
        } else {
            setDate(value);
        }
    };

    return (
        <DatePicker
            mb={24}
            size={middleScreen && largeScreen ? "xs" : "sm"}
            onChange={handleSelectDate}
            value={date}
            locale="ru"
            maxDate={DATE_NOW}
            renderDay={(date) => {
                const day = date.getDate();
                return (
                    <div>{day}</div>
                );
            }}
        />
    );
}
