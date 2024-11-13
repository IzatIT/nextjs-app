
export class Actions {
    static HandleFilterFormSubmit = <T>(
        values: T,
        oldParams: Record<string, any>,
        pathname: string,
    ) => {
        const updatedParams: Record<string, string> = {};

        Object.entries({
            ...oldParams,
            ...values,
        }).forEach(([key, value]) => {
            if (value !== undefined && value !== "" && value !== "null") {
                updatedParams[key] = Array.isArray(value) ? value.join(',') : value?.toString();
            }
        });
        const urlParams = new URLSearchParams(updatedParams).toString();
        return `${pathname}?${urlParams}`
    };
    static GetNewPath = (location: string, locale: string) => {
        return location.split("/").map(el =>
            el === "ru" ||
                el === "kg" ||
                el === "en" ? locale : el).join("/")
    }
    static GenerateArrayFrom = (str: string, arrayLength = 10) => {
        return Array(arrayLength).fill(str) as stringArrayLength10
    }
}