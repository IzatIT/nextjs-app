import { useLocale } from "next-intl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function withAuth(Component: any) {
    return function IsAuth(props: any) {
        const locale = useLocale()
        const cookieStore = cookies();
        const profile = cookieStore.get("profile");
        if (!profile) {
            return redirect(`/${locale}/admin/login`);
        }
        return <Component {...props} />
    };
}