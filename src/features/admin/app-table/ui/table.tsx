"use client"
import { HeadCell } from '@/entities';
import { AppLoader, AppScrollArea } from '@/shared';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { searchData } from '../api';
import { PaginationFeature } from './pagination';
import { Box, Grid, Skeleton, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import styles from "./styles.module.scss";

type Props<E> = {
    headCells: HeadCell<E>[];
    doubleClickAction: (row: E) => void;
    searchApi: string;
    withPagination?: boolean;
}

const getInitialValues: <T>() => SearchResponse<T> = () => ({
    content: Array.from({ length: 8 }),
    numberOfElements: 0,
    page: 0,
    totalElements: 0,
    totalPages: 0,
})


export const AppTableFeature = <T extends Object>({
    headCells,
    doubleClickAction,
    searchApi,
    withPagination = false,
}: Props<T>) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState<SearchResponse<T>>(getInitialValues<T>());
    const searchParams = useSearchParams();
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const sortBy = searchParams.get('sortBy');
    const sortDirection = searchParams.get('sortDirection');
    const smallScreen = useMediaQuery("(max-width: 768px)")
    const verifyToShow = (index: number) => (smallScreen ? (index < 3 || index === (headCells?.length || 1) - 1) : true)


    const pagination = withPagination ? (
        <PaginationFeature totalPages={content?.totalPages} />
    ) : undefined;

    const fetchData = async () => {
        setIsLoading(true);
        const minimumLoadingTime = new Promise<void>((resolve) =>
            setTimeout(resolve, 600)
        );

        const filter: Record<string, string> = {};

        searchParams.forEach((value, key) => {
            if (key !== 'page' && key !== 'limit' && key !== "sortBy" && key !== "sortDirection") {
                filter[key] = value;
            }
        });

        const fetchDataPromise = searchData<T>({
            searchUrl: searchApi,
            filter: filter,
            pageRequest: {
                limit: parseInt(limit || '10'),
                page: parseInt(page || '1') - 1,
            },
            sorting: {
                sortBy: sortBy as SortBy || 'ID',
                sortDirection: sortDirection as SortDirection || 'ASC',
            },
        });

        const res = await Promise.all([fetchDataPromise, minimumLoadingTime]).then(
            ([data]) => data
        );

        if (res) {
            setContent(res);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [searchParams]);

    const body = content?.content?.map((row, index) => (
        <Table.Tr
            className={styles.tr} style={{ border: isLoading ? "none" : undefined }}
            key={index}
            onDoubleClick={() => !isLoading && doubleClickAction(row)}
        >
            {
                headCells?.map((cell, index) => verifyToShow(index) && (
                    <Table.Td
                        className={styles.td} style={{ border: isLoading ? "none" : undefined }}
                        key={cell.label}>
                        {isLoading && <Skeleton animate h={40} opacity={0.3} visible={true} />}
                        {row && !isLoading && cell.render?.(row)}
                    </Table.Td>
                ))}
        </Table.Tr>
    ))

    const header = (
        <Table.Tr p={10}>
            {headCells?.map((item, index) => verifyToShow(index) && (
                <Table.Th
                    key={item.label} className={styles.th}>
                    {item.label}
                </Table.Th>
            ))}
        </Table.Tr>
    );



    return (
        <>
            <AppScrollArea
                withPagination={withPagination}>
                <Table
                    className={styles.table}
                    captionSide="bottom"
                    withColumnBorders
                    borderColor='rgba(245, 245, 220, 0.3)'
                    highlightOnHover
                    verticalSpacing="sm"
                    withTableBorder
                >
                    <Table.Thead>{header}</Table.Thead>
                    <Table.Tbody>{body}</Table.Tbody>
                </Table>
            </AppScrollArea>
            {withPagination ? pagination : null}
        </>
    );
};
