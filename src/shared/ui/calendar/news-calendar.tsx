"use client";

import { Button, Flex, Paper } from "@mantine/core";
import { DateValue } from "@mantine/dates";
import { useLocale, useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { AppCalendar } from ".";

interface Props {
    date: DateValue;
    setDate: Dispatch<SetStateAction<DateValue>>;
}
export const NewsCalendar = ({ date, setDate }: Props) => {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <Paper shadow="xl"
            style={{ borderRadius: "12px" }}
            miw={310}
            maw={350}
            px={{ base: 28, lg: 24 }}
            py={{ base: 19, lg: 24 }}
        >
            <Flex align="center" justify="center" direction="column">
                <AppCalendar date={date} setDate={setDate} />
                <a href={`/${locale}/news`} style={{ alignSelf: "end" }}>
                    <Button
                        style={{
                            height: "33px",
                            borderRadius: "12px",
                            border: "1px solid #1A2085",
                            color: "#1A2085",
                        }}
                        size={"compact-xs"}
                        variant={"outline"}
                    >
                        {t("button.news-archive")}
                    </Button>
                </a>
            </Flex>
        </Paper>
    );
};
