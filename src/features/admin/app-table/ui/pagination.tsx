"use client"
import { AppPagination } from "@/shared/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
    totalPages?: number;
    variant?: "client-part" | "admin-part";
}
const limitsPerPage = ["10", "20"]

export const PaginationFeature = ({ totalPages, variant }: Props) => {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    const router = useRouter()
    const pathname = usePathname()

    const handleChangePagination = (values: Pagination) => {
        const oldParams = Object.fromEntries(searchParams);
        const updatedParams = {
            ...oldParams,
            page: `${values.page || page || 1}`,
            limit: `${values.limit || limit || variant === "client-part" ? 4 : 10}`,
        };

        const urlParams = new URLSearchParams(updatedParams).toString();
        router.push(`${pathname}?${urlParams}`);
    };

    useEffect(() => {
        handleChangePagination({ total: totalPages })
    }, [totalPages])

    return (
        <AppPagination
            variant={variant}
            data={limitsPerPage}
            pagination={{
                limit: limit || "10",
                page: parseInt(`${page || 1}`),
                total: totalPages || 1
            }}
            onChange={handleChangePagination}
        />
    )
}
