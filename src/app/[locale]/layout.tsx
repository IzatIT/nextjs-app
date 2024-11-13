import { Metadata } from "next";
import { useLocale, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Providers from "./provider";
import techWork from "/public/TECH-WORK.json";
import generateMetaData from "@/shared/config/seo/meta-data";
import TechWork from "@/shared/ui/tech-work";
import { LoadingOverlay } from "@mantine/core";

interface Props {
    children: React.ReactNode;
    params: { locale: string };
}

export async function generateMetadata({ params }: { params: LocaleTypeParams }): Promise<Metadata> {
    const t = await getTranslations({ locale: params.locale });
    return generateMetaData("Main", "Main", "/")
}

export default function RootLayout({
    children,
    params
}: Props) {
    const messages = useMessages();
    const locale = useLocale()
    if (params.locale !== locale) {
        notFound()
    }

    const component = () => {
        if (techWork.TECH_WORK)  return <TechWork />
        return children
    }

    return (
        <html lang={params.locale}>
            <body suppressHydrationWarning={true}>
                <Providers messages={messages}>
                    <Suspense fallback={<LoadingOverlay top={100} visible />}>
                        {component()}
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
}