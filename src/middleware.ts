import createMiddleware from 'next-intl/middleware';
import { LANGUAGES } from './constants';

export default createMiddleware({
    locales: [LANGUAGES.RU, LANGUAGES.KG, LANGUAGES.EN],
    defaultLocale: LANGUAGES.RU,
    localeDetection: false
});

export const config = {
    matcher: ['/', `/(ru|kg|en)/:path*`],
};