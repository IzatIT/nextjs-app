"use client"
import { ScrollArea } from '@mantine/core';

type Props<E> = {
    withPagination?: boolean;
    children: React.ReactNode
}

export const AppScrollArea = <T extends Object>({
    withPagination = true,
    children
}: Props<T>) => {
    return (
        <>
            <ScrollArea
                styles={{
                    thumb: { background: 'white' },
                    scrollbar: { background: 'rgba(255,255,255, 0.3)' },
                }}
                scrollbarSize={5}
                mb={24}
                pos="relative"
                scrollbars="y"
                h={withPagination ? '65vh' : '72vh'}
            >
                {children}
            </ScrollArea>
        </>
    );
};
