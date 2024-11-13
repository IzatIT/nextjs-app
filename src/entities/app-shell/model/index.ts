export type AdminPageList = {
    id: number;
    title: ILocaledTitles;
    icon: React.ReactNode;
    link: string;
}


export type Pages = {
    [key: string]: AdminPageList;
}