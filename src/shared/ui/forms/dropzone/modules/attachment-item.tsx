"use client"
import { Attachment, AttachmentPath } from "@/entities"
import { AppAudioPlayer } from "@/shared/ui/audio-player"
import { AppModal } from "@/shared/ui/modal"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { Box, Flex, Image, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCheck, IconCrop, IconEye, IconFileArrowLeft, IconTrash } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { ExpectedType } from "."
import { AppButton } from "../../button"
import { AppInput } from "../../input"
import { FilePreviewContainer } from "./container"
import { AppImageCropper } from "./crop-image"

interface Props {
    fileType: ExpectedType
    file: Attachment;
    handleDeleteFile?: () => void;
    handleSaveCroped?: (file: File) => void;
    handleReOrder?: (args: HandleReOrderArgs) => void
    aspectRatio?: number;
    index: number
}

export const AttachmentItem = ({
    file,
    handleDeleteFile,
    aspectRatio,
    handleSaveCroped,
    handleReOrder,
    fileType,
    index
}: Props) => {
    const t = useTranslations()
    const [openedBiggerView, { toggle: toggleBiggerView, close: closeBiggerView }]
        = useDisclosure()
    const [openedCropImage, { toggle: toggleCropImage, close: closeImageCrop }]
        = useDisclosure()
    const [order, setOrder] = useState(index)
    const fileUrl = AttachmentPath.GetAttachmentUrl(file.id, file.uuid)
    const withCroper = !!handleSaveCroped
    const withDelete = !!handleDeleteFile
    const withReOrder = !!handleReOrder

    const openInNewTab = () => {
        window.open(fileUrl, "_blank")
    }

    const handleToggleCropImage = () => {
        toggleCropImage()
        closeBiggerView()
    }
    const getMiniComponent = () => {
        switch (fileType) {
            case "video":
                return <video
                    style={{ cursor: "pointer" }}
                    onClick={toggleBiggerView}
                    width={240}
                    height={130}
                    src={fileUrl} />
            case "document":
                if (file.type.includes("pdf")) {
                    return <Box
                        onClick={toggleBiggerView}
                        style={{ overflow: "hidden", cursor: "pointer" }} w={240} h={130} >
                        <DocViewer
                            documents={[{ uri: fileUrl, fileType: file.type, fileName: file.name }]}
                            pluginRenderers={DocViewerRenderers}
                        />
                    </Box>
                } else {
                    return <Image
                        style={{ cursor: "pointer", objectFit: "contain" }}
                        onClick={toggleBiggerView}
                        width={240}
                        height={130}
                        src="/img/document.jpg" alt="" />
                }
            case "audio":
                return <AppAudioPlayer src={fileUrl} />
            default:
                return <Image
                    style={{ cursor: "pointer", objectFit: "contain" }}
                    onClick={toggleBiggerView}
                    width={240}
                    height={130}
                    src={fileUrl} alt="" />
        }
    }

    const getBiggerComponent = () => {
        switch (fileType) {
            case "video":
                return <video
                    controls
                    style={{ cursor: "pointer" }}
                    width="100%"
                    height="auto"
                    src={fileUrl} />
            case "document":
                if (file.type.includes("pdf")) {
                    return <Box w="100%" style={{ overflow: "scroll" }} h={800} >
                        <DocViewer
                            documents={[{ uri: fileUrl, fileType: file.type, fileName: file.name }]}
                            pluginRenderers={DocViewerRenderers}
                        />
                    </Box>
                } else {
                    return <Image
                        style={{ cursor: "pointer", objectFit: "contain" }}
                        onClick={toggleBiggerView}
                        width={350}
                        height={400}
                        src="/img/document.jpg" alt="" />
                }
            default:
                return <Image
                    width="100%"
                    height="auto" style={{ objectFit: "contain" }}
                    src={fileUrl} alt="" />
        }
    }



    return (
        <>
            <FilePreviewContainer>
                <Flex mb={10} gap={10}>
                    {fileType !== "audio" &&
                        <AppButton onClick={toggleBiggerView} variant="submit">
                            <IconEye />
                        </AppButton>}
                    {withCroper &&
                        <AppButton onClick={handleToggleCropImage} variant="filter">
                            <IconCrop />
                        </AppButton>}
                    {withDelete &&
                        <AppButton onClick={handleDeleteFile} variant="reset">
                            <IconTrash />
                        </AppButton>}
                </Flex>
                {getMiniComponent()}
                {withReOrder &&
                    <Flex mt={10} w="100%" align="center" gap={10}>
                        <AppInput style={{ input: { width: "140px" } }}
                            value={order}
                            onChange={(value) => setOrder(parseInt(value.target.value))}
                        />
                        <AppButton
                            onClick={() => handleReOrder({ from: index, to: order, group: "attachment" })}
                            variant="sorting">
                            <IconCheck />
                        </AppButton>
                    </Flex>
                }
            </FilePreviewContainer>
            <AppModal size="60vw" opened={openedBiggerView} toggle={toggleBiggerView} closeOnClickOutside>
                {getBiggerComponent()}
                <Flex justify="center" mb={10} gap={10}>
                    <Tooltip label={t("button.open-in-new-tab")}>
                        <div>
                            <AppButton
                                onClick={openInNewTab}
                                variant="submit">
                                <IconFileArrowLeft />
                            </AppButton>
                        </div>
                    </Tooltip>
                    {withCroper &&
                        <Tooltip label={t("button.crop-image")}>
                            <div>
                                <AppButton onClick={handleToggleCropImage} variant="filter">
                                    <IconCrop />
                                </AppButton>
                            </div>
                        </Tooltip>}
                    {withDelete &&
                        <Tooltip label={t("button.delete")}>
                            <div>
                                <AppButton onClick={handleDeleteFile} variant="reset">
                                    <IconTrash />
                                </AppButton>
                            </div>
                        </Tooltip>}
                </Flex>
            </AppModal>
            {withCroper &&
                <AppModal closeOnClickOutside opened={openedCropImage} toggle={toggleCropImage}>
                    <AppImageCropper
                        fileName={file.name}
                        handleSaveCroped={handleSaveCroped}
                        aspectRatio={aspectRatio}
                        fileUrl={fileUrl}
                        closeModal={closeImageCrop} />
                </AppModal>}
        </>
    )
}
