import { Metadata } from "next";

type GenerateMetaDataType = (title: string, description?: string, link?: string) => Metadata;

const generateMetaData: GenerateMetaDataType = (title, description, link) => {
    const slicedTitle = title.slice(0, 50);
    const slicedDesc = description?.slice(0, 150);
    if (description) {
        return {
            title: slicedTitle,
            description: slicedDesc,

            twitter: {
                card: "summary_large_image",
                images: "/logo.svg",
                description: slicedDesc,
                title: slicedTitle
            },
            openGraph: {
                url: link,
                type: "website",
                title: slicedTitle,
                description: slicedDesc,
                images: "/logo.svg"
            },
            // manifest: "/manifest.json",
            icons: "/logo.svg",
            keywords: "keywords",
            alternates: {
                canonical: link,
                languages: {
                    ru: `${link}/ru`,
                    kg: `${link}/kg`,
                },
            }
        };
    } else {
        return {
            title: slicedTitle,
            icons: "/logo.svg",
        }
    }

};

export default generateMetaData;