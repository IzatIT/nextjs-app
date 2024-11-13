"use client";
import { Attachment, AttachmentPath, getPage, Page } from "@/entities";
import { AdminAppShell } from "@/features";
import { AppButton, AppIframe, AppModal, Content, ContentInfo } from "@/shared";
import { Flex, Image, List, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PageDetailWidget = () => {
    const t = useTranslations();
    const { id } = useParams<{ id: string }>();
    const [openedFileView, { toggle: toggleFileView }] = useDisclosure();
    const [data, setData] = useState<Page>();
    const [activeFileData, setActiveFileData] = useState<Attachment>();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getPage(id);
            setData(res);
        };
        fetchData();
    }, [id]);

    const handleClickEdit = () => router.push(`${id}/edit`);
    const handleClickFileView = (file?: Attachment) => () => {
        if (file) {
            setActiveFileData(file);
            toggleFileView();
        }
    };

    const content = [
        { label: t("table.id"), value: `${data?.id}` },
        { label: t("table.order"), value: data?.order },
        { label: t("table.titleKg"), value: data?.titleKg },
        { label: t("table.titleRu"), value: data?.titleRu },
        { label: t("table.titleEn"), value: data?.titleEn },
        { label: t("table.descriptionKg"), value: data?.descriptionKg },
        { label: t("table.descriptionRu"), value: data?.descriptionRu },
        { label: t("table.descriptionEn"), value: data?.descriptionEn },
        {
            label: t("table.bannerContent"),
            value: data?.bannerContent?.map((block) => (
                <div key={block.id}>
                    <h4>{block.titleKg || block.titleRu || block.titleEn}</h4>
                    <p>{block.contentKg || block.contentRu || block.contentEn}</p>
                    {block.photoAttachments?.length && (
                        <Flex wrap="wrap" gap={10}>
                            {block.photoAttachments.map((photo) => (
                                <Image
                                    key={photo.id}
                                    width={110}
                                    height={150}
                                    style={{ objectFit: "contain", cursor: "pointer" }}
                                    src={AttachmentPath.GetAttachmentUrl(photo.id, photo.uuid)}
                                    alt=""
                                    onClick={handleClickFileView(photo)}
                                />
                            ))}
                        </Flex>
                    )}
                </div>
            )),
        },
        {
            label: t("table.documentContent"),
            value: data?.documentContent?.map((doc) => (
                <Flex key={doc.id} direction="column" align="start" mb={10}>
                    <AppIframe aspectRatio={3 / 4} width={150}
                        src={AttachmentPath.GetAttachmentUrl(doc.fileAttachments?.[0]?.id, doc.fileAttachments?.[0]?.uuid)} />
                    <AppButton variant="sorting" onClick={handleClickFileView(doc.fileAttachments?.[0])}>
                        <IconEye />
                    </AppButton>
                </Flex>
            )),
        },
        {
            label: t("table.linkContent"),
            value: (
                <List>
                    {data?.linkContent?.map((link) => (
                        <List.Item key={link.id}>
                            {link.links?.map(el => (
                                <Link key={el.id} href={el.link} target="_blank" rel="noopener noreferrer">
                                    <Text c="white">
                                        {link.titleKg || link.titleRu || link.titleEn}
                                    </Text>
                                </Link>
                            ))}

                        </List.Item>
                    ))}
                </List>
            ),
        },
    ];

    const fileUrl = AttachmentPath.GetAttachmentUrl(activeFileData?.id, activeFileData?.uuid);

    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-page")}>
                <Flex justify="end">
                    <AppButton onClick={handleClickEdit} variant="sorting">
                        {t("button.edit")}
                    </AppButton>
                </Flex>
                {content && <ContentInfo data={content} />}
            </AdminAppShell>
            <AppModal opened={openedFileView} toggle={toggleFileView} closeOnClickOutside>
                {activeFileData?.type.includes("image") ? (
                    <Image width="100%" height="auto" style={{ objectFit: "contain" }} src={fileUrl} alt="" />
                ) : (
                    <AppIframe aspectRatio={3 / 4} width="100%" src={fileUrl} />
                )}
            </AppModal>
        </>
    );
};
