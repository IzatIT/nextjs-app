import { useLocale } from "next-intl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default function authorized(Component: any) {
    return function IsAuth(props: any) {
        const locale = useLocale()
        const cookieStore = cookies();
        const profile = cookieStore.get("profile");
        if (profile) {
            return redirect(`/${locale}/admin`);
        }
        return <Component {...props} />
    };
}