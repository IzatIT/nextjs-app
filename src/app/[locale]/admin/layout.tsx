import generateMetaData from '@/shared/config/seo/meta-data';
import TechWork from '@/shared/ui/tech-work';
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ReactNode, Suspense } from "react";
import techWork from "/public/TECH-WORK.json";

export async function generateMetadata({ params }: { params: LocaleTypeParams }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale });
  const metaData = generateMetaData(t("main"))
  return metaData
}

type Props = {
  children: ReactNode,
  params: {
    locale: string;
  }
}
export default function Layout({ children }: Readonly<Props>) {
  const component = techWork.ADMIN_TECH_WORK ? <TechWork /> : children

  return (
    <Suspense fallback={<>Loading...</>}>
      {component}
    </Suspense>
  );
}