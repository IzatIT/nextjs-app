import { AdminPageList, Pages } from "@/entities"
import {
    IconChartHistogram, IconGitFork, IconInfoHexagon, IconMail,
    IconNews, IconQuestionMark, IconSitemap, IconSocial,
    IconStack3Filled, IconUserPentagon, IconUsersGroup
} from "@tabler/icons-react"
import { ReactNode } from "react"

type iconsObjType = {
    [key: string]: ReactNode
}

const icons: iconsObjType = {
    news: <IconNews />,
    page: <IconSitemap />,
    card_info: <IconUsersGroup />,
    info_block: <IconInfoHexagon />,
    reference: <IconStack3Filled />,
    diagram: <IconChartHistogram />,
    social_link: <IconSocial />,
    news_sub_to_email: <IconMail />,
    users: <IconUserPentagon />,
    logs: <IconGitFork />,
    default: <IconQuestionMark />
}


export const getIcon = (page: string) => {
    const result = icons?.[page]
    if (result) {
        return result
    }
    return icons.default
}

const pages: Pages = {
    news: {
        id: 2,
        title: { titleKg: "Жаңылыктар", titleRu: "Новости", titleEn: "News" },
        icon: getIcon("news"),
        link: "admin/news",
    },
    card_info: {
        id: 1,
        title: { titleKg: "Башкармалык", titleRu: "Руководство", titleEn: "Management" },
        icon: getIcon("card_info"),
        link: "admin/card_info",
    },
    info_block: {
        id: 3,
        title: { titleKg: "Маалымат блогу", titleRu: "Инфо блок", titleEn: "Info Block" },
        icon: getIcon("info_block"),
        link: "admin/info_block",
    },
    reference: {
        id: 4,
        title: { titleKg: "Маалымдама", titleRu: "Справочник", titleEn: "Reference" },
        icon: getIcon("reference"),
        link: "admin/reference",
    },
    social_link: {
        id: 5,
        title: { titleKg: "Социалдык ссылка", titleRu: "Социальные ссылка", titleEn: "Social Link" },
        icon: getIcon("social_link"),
        link: "admin/social_link",
    },
    // diagram: {
    //     id: 6,
    //     title: { titleKg: "Диаграмма", titleRu: "Диаграмма", titleEn: "Diagram" },
    //     icon: getIcon("diagram"),
    //     link: "admin/diagram",
    // },
    page: {
        id: 6,
        title: { titleKg: "Баракча", titleRu: "Страница", titleEn: "Page" },
        icon: getIcon("page"),
        link: "admin/page",
    },
    users: {
        id: 7,
        title: { titleKg: "Админдер", titleRu: "Админы", titleEn: "Users" },
        icon: getIcon("users"),
        link: "admin/user",
    },
    logs: {
        id: 7,
        title: { titleKg: "Өзгөрүүлөр тарыхы", titleRu: "История изменений", titleEn: "History of changes" },
        icon: getIcon("logs"),
        link: "admin/logs",
    },
}

const pageKeys = Object.keys(pages)

export const getAccessiblePages = (permissions?: string[]): AdminPageList[] => {
    const result: AdminPageList[] = [];
    if (permissions) {
        pageKeys.map((key) => {
            if (permissions.includes(key)) {
                result.push(pages[key])
            }
        }, {});
    } else {
        pageKeys?.map(key => {
            result.push(pages[key])
        })
    }
    return result
}