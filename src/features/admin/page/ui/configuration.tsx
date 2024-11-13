import { PageAccordionCard, PageAccordionCardProps, PageBannerCard, PageBannerCardProps, PageCardInfoCard, PageCardInfoCardProps, PageDocumentCard, PageDocumentCardProps, PageLinkCard, PageLinkCardProps } from "@/shared";

export enum PAGE_COMPONENTS {
    BANNER = "BANNER",
    LINK = "LINK",
    CARD_INFO = "CARD_INFO",
    DOCUMENT = "DOCUMENT",
    ACCORDION = "ACCORDION"
}
export type PageComponentsType = PAGE_COMPONENTS.BANNER | PAGE_COMPONENTS.CARD_INFO | PAGE_COMPONENTS.DOCUMENT | PAGE_COMPONENTS.LINK | PAGE_COMPONENTS.ACCORDION

const pageBannerShowData: PageBannerCardProps = {
    titleKg: "Баннердин темасы",
    titleRu: "Название банера",
    titleEn: "Title of the banner",
    contentKg: "Баннер тууралуу кыскача маалымат",
    contentRu: "Короткое описание баннера",
    contentEn: "Short description about the banner",
    imageUrl: "/img/test-banner.png",
    fileUrl: ["/document/test-document.pdf"],
    links: [
        {
            link: "https://prokuror.kg/",
            order: 0,
            titleKg: "Тиркеме 1",
            titleRu: "Ссылка 1",
            titleEn: "Link 1",
        },
    ]
}

const pageDocumentShowData: PageDocumentCardProps = {
    titleKg: "Документтин темасы",
    titleRu: "Название документа",
    titleEn: "Title of the document",
    contentKg: "Документ карточкасы тууралуу кыскача маалымат",
    contentRu: "Короткое описание документе",
    contentEn: "Short description about the document",
    fileUrl: "/document/early_cranes.pdf",
    imageUrl: "/img/test-document.jpg"
}

const pageLinkShowData: PageLinkCardProps = {
    titleKg: "Кыргыз Республикасынын Министрлер кабинети",
    titleRu: "Кабинет Министров Кыргызской Республики",
    titleEn: "Title of the link",
    contentKg: "Тиркеме карточкасы тууралуу кыскача маалымат",
    contentRu: "Короткое описание о ссылке",
    contentEn: "Short description about the link",
    imageUrl: "/img/test-linkimage.svg",
    links: [
        {
            link: "https://www.gov.kg/ru",
            order: 0,
            titleKg: "Тиркеме 1",
            titleRu: "Ссылка 1",
            titleEn: "Link 1",
        },
        {
            link: "https://www.youtube.com/",
            order: 1,
            titleKg: "Тиркеме 2",
            titleRu: "Ссылка 2",
            titleEn: "Link 2",
        },
    ]
}

const pageCardInfoShowData: PageCardInfoCardProps = {
    fullName: "Асанов Асан Асанович",
    awardsEn: "Awards will be here",
    awardsKg: "Бул жерде сыйлыктары жазылат",
    awardsRu: "Здесь будут награды",
    positionEn: "Position or short description about human",
    positionKg: "Адамдын позициясы же кыскача адам тууралуу маалымат",
    positionRu: "Позиция или короткое описание человека",
    shortBiographyEn: "Short biography about human",
    shortBiographyKg: "Кыскача өмүр баяны",
    shortBiographyRu: "Короткая биография о человеке",
    imageUrl: "/img/human.jpg",
    laborActivities: [
        {
            order: 0,
            titleEn: "Labor Activity 1",
            titleKg: "Эмгек жолундагы эмгеги 1",
            titleRu: "Первая трудовая деятельность",
            year: 2020,
        },
        {
            order: 1,
            titleEn: "Labor Activity 2",
            titleKg: "Эмгек жолундагы эмгеги 2",
            titleRu: "Вторая трудовая деятельность",
            year: 2022,
        },
        {
            order: 2,
            titleEn: "Labor Activity 3",
            titleKg: "Эмгек жолундагы эмгеги 3",
            titleRu: "Третья трудовая деятельность",
            year: 2024,
        },
    ]
}

const accordionShowData: PageAccordionCardProps[] = [
    {
        titleKg: "Аккаордион 1",
        titleRu: "Аккаордион 1",
        titleEn: "Аккаордион 1",
        contentKg: "Аккаордион 1",
        contentRu: "Аккаордион 1",
        contentEn: "Аккаордион 1",
    },
    {
        titleKg: "Аккаордион 2",
        titleRu: "Аккаордион 2",
        titleEn: "Аккаордион 2",
        contentKg: "Аккаордион 2",
        contentRu: "Аккаордион 2",
        contentEn: "Аккаордион 2",
    },
    {
        titleKg: "Аккаордион 3",
        titleRu: "Аккаордион 3",
        titleEn: "Аккаордион 3",
        contentKg: "Аккаордион 3",
        contentRu: "Аккаордион 3",
        contentEn: "Аккаордион 3",
    },
]

export const sidebarComponents = [
    {
        id: 1,
        titleKg: "Баннер",
        titleEn: "Banner",
        titleRu: "Баннер",
        type: PAGE_COMPONENTS.BANNER,
        component: <PageBannerCard {...pageBannerShowData} />
    },
    {
        id: 2,
        titleKg: "Документ карточкасы",
        titleEn: "Document card",
        titleRu: "Карточка документа",
        type: PAGE_COMPONENTS.DOCUMENT,
        component: <PageDocumentCard {...pageDocumentShowData} />
    },
    {
        id: 3,
        titleKg: "Тиркеме карточкасы",
        titleEn: "Link card",
        titleRu: "Ссылочные карточки",
        type: PAGE_COMPONENTS.LINK,
        component: <PageLinkCard {...pageLinkShowData} />
    },
    {
        id: 4,
        titleKg: "Адам тууралуу карточка",
        titleEn: "Card About Person",
        titleRu: "Карточка о данных человека",
        type: PAGE_COMPONENTS.CARD_INFO,
        component: <PageCardInfoCard {...pageCardInfoShowData} />
    },
    {
        id: 4,
        titleKg: "Аккардион",
        titleEn: "Accordion",
        titleRu: "Аккардион",
        type: PAGE_COMPONENTS.ACCORDION,
        component: <PageAccordionCard data={accordionShowData} />
    },
]