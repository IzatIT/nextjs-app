import { useLocale } from "next-intl";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'; // Import cookies

export default function Page() {
    const locale = useLocale()
    const nextCookies = cookies();
    const access_token = nextCookies.get("access_token")
    if (access_token?.value) {
        redirect(`/${locale}/admin/news`)
    } else {
        redirect(`/${locale}/admin/login`)
    }
}