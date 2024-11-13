"use client"
import { Box, ComboboxData, Flex, Pagination } from "@mantine/core";
import { AppSelect } from "../forms";
import "./styles.scss";

type Props = {
    onChange: (a: Pagination) => void
    pagination: Pagination;
    data?: ComboboxData;
    variant?: "client-part" | "admin-part";
}

export const AppPagination = ({
    onChange,
    pagination,
    data,
    variant = "admin-part"
}: Props) => {

    return (
        <Flex className="app_pagination_root" justify={variant === "client-part" ? "start" : "end"}>
            {variant === "admin-part" &&
                <Box w={100}>
                    <AppSelect
                        value={pagination.limit}
                        onChange={(value) => value && onChange({ limit: value })}
                        data={data}
                    />
                </Box>}
            <Pagination
                className="app_pagination_pagination"
                data-variant={variant}
                onChange={(value) => onChange({ page: value })}
                value={pagination.page}
                total={pagination.total || 0} />
        </Flex>
    )
}
