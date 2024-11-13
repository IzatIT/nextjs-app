"use client"
import { AppMantineProvider } from '@/shared/config';
import Cookies from 'js-cookie';
import { NextIntlClientProvider, useLocale } from "next-intl";
import Script from 'next/script';
import { useEffect } from 'react';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import "./variables.scss";
import "./layout.scss"

declare global {
    interface Window {
        isvek: any;
    }
}

type Props = {
    children: React.ReactNode,
    messages: any
}

export default function Providers({ children, messages }: Props) {
    const locale = useLocale()

    useEffect(() => {
        Cookies.set('locale', locale, { expires: 7 });
    }, [locale])

    const handleBviLoad = () => {
        if (window.isvek && window.isvek.Bvi) {
            new window.isvek.Bvi({
                target: '.bvi-class',
                fontSize: 18,
                theme: 'blue',
                reload: false
            });
        } else {
            console.error('Bvi class is not defined on the isvek object.');
        }
    };

    return (
        <>
            <Script src="/bvi/js/bvi.js" onLoad={handleBviLoad} />
            <AppMantineProvider>
                <NextIntlClientProvider
                    timeZone="Asia/Bishkek"
                    locale={locale}
                    messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </AppMantineProvider>
        </>
    )
}
