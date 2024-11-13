"use client";
import { Attachment, AttachmentPath, getInfoBlock, InfoBlock } from "@/entities";
import { AdminAppShell } from "@/features";
import { AppButton, AppIframe, AppModal, Content, ContentInfo } from "@/shared";
import { Flex, Image, List, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const InfoBlockDetailWidget = () => {
    const t = useTranslations();
    const { id } = useParams<{ id: string }>();
    const [openedFileView, { toggle: toggleFileView }] = useDisclosure();
    const [data, setData] = useState<InfoBlock>();
    const [activeFileData, setActiveFileData] = useState<Attachment>();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getInfoBlock(id);
            setData(res);
        };
        fetchData();
    }, [id]);

    const handleClickEdit = () => router.push(`${id}/edit`);
    const handleClickFileView = (file: Attachment) => () => {
        setActiveFileData(file);
        toggleFileView();
    };

    const content = [
        { label: t("table.id"), value: `${data?.id}` },
        { label: t("table.order"), value: data?.order },
        { label: t("table.titleKg"), value: data?.titleKg },
        { label: t("table.titleRu"), value: data?.titleRu },
        { label: t("table.titleEn"), value: data?.titleEn },
        { label: t("table.contentKg"), value: data?.contentKg },
        { label: t("table.contentRu"), value: data?.contentRu },
        { label: t("table.contentEn"), value: data?.contentEn },
        { label: t("table.textKg"), value: Content.HtmlRender(data?.textKg) },
        { label: t("table.textRu"), value: Content.HtmlRender(data?.textRu) },
        { label: t("table.textEn"), value: Content.HtmlRender(data?.textEn) },
        { label: t("table.type"), value: Content.GetTitleByLanguage(data?.type) },
        {
            label: t("table.links"),
            value: (
                <List>
                    {data?.links?.map((el) => (
                        <List.Item key={el.id}>
                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>{t("table.order")}</Table.Th>
                                        <Table.Th>{t("table.titleKg")}</Table.Th>
                                        <Table.Th>{t("table.titleRu")}</Table.Th>
                                        <Table.Th>{t("table.titleEn")}</Table.Th>
                                        <Table.Th>{t("table.link")}</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr>
                                        <Table.Td>{el.order}</Table.Td>
                                        <Table.Td>{el.titleKg}</Table.Td>
                                        <Table.Td>{el.titleRu}</Table.Td>
                                        <Table.Td>{el.titleEn}</Table.Td>
                                        <Table.Td>{el.link}</Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </List.Item>
                    ))}
                </List>
            ),
        },
        {
            label: t("table.photoAttachments"),
            value: (
                <Flex wrap="wrap" gap={10}>
                    {data?.photoAttachments?.map((el) => (
                        <Image
                            key={el.id}
                            onClick={handleClickFileView(el)}
                            width={110}
                            height={150}
                            style={{ objectFit: "contain", cursor: "pointer" }}
                            src={AttachmentPath.GetAttachmentUrl(el?.id, el?.uuid)}
                            alt=""
                        />
                    ))}
                </Flex>
            ),
        },
        {
            label: t("table.fileAttachments"),
            value: (
                <Flex wrap="wrap" gap={10}>
                    {data?.fileAttachments?.map((el) => (
                        <Flex justify="center" direction="column" gap={10} key={el.id}>
                            <AppIframe aspectRatio={3 / 4} width={150} src={AttachmentPath.GetAttachmentUrl(el.id, el.uuid)} />
                            <AppButton variant="sorting" onClick={handleClickFileView(el)}>
                                <IconEye />
                            </AppButton>
                        </Flex>
                    ))}
                </Flex>
            ),
        },
    ];

    const fileUrl = AttachmentPath.GetAttachmentUrl(activeFileData?.id, activeFileData?.uuid);

    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-info_block")}>
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
