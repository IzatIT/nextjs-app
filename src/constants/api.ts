export const BASE_URL = process.env.NEXT_PUBLIC_TEST_API
export const createApi = (url: string) => `${BASE_URL}/api/v1/${url}`;