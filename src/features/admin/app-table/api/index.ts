import { SearchResponse } from "@/entities";
import { api, handleAxiosError } from "@/shared/config";


type Args = {
    searchUrl: string;
    filter?: Object,
    pageRequest?: PageRequest
    sorting?: SortRequest
}
export const searchData = async <T>({
    searchUrl,
    sorting,
    filter,
    pageRequest
}: Args, notifyOnError = true) => {
    try {
        const response = await api.post<T>(searchUrl, {
            filter: filter,
            pageRequest: pageRequest,
            sorting: sorting
        })
        return response.data as SearchResponse<T>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}