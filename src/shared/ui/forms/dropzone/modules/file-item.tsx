"use client"
import { AppAudioPlayer } from "@/shared/ui/audio-player"
import { AppIframe } from "@/shared/ui/iframe"
import { AppModal } from "@/shared/ui/modal"
import { Box, Flex, Text, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCheck, IconCrop, IconEye, IconFileArrowLeft, IconTrash } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"
import { ExpectedType } from "."
import { AppButton } from "../../button"
import { AppInput } from "../../input"
import { FilePreviewContainer } from "./container"
import { AppImageCropper } from "./crop-image"
import { COLORS } from "@/constants"

type Props = {
    fileType: ExpectedType
    file: File;
    index: number
    handleDeleteFile?: () => void;
    handleSaveCroped?: (file: File) => void;
    handleReOrder?: (args: HandleReOrderArgs) => void
    aspectRatio?: number;
}

export const FilePreviewItem = ({
    file,
    handleDeleteFile,
    aspectRatio,
    handleSaveCroped,
    handleReOrder,
    fileType,
    index
}: Props) => {
    const t = useTranslations()
    const [order, setOrder] = useState(index)
    const [openedImageView, { toggle: toggleImageView, close: closeImageView }] = useDisclosure()
    const [openedCropImage, { toggle: toggleCropImage, close: closeImageCrop }] = useDisclosure()
    const fileUrl = URL.createObjectURL(file)
    const withCroper = !!handleSaveCroped
    const withDelete = !!handleDeleteFile
    const withReOrder = !!handleReOrder

    const openInNewTab = () => {
        window.open(fileUrl, "_blank")
    }

    const handleToggleCropImage = () => {
        toggleCropImage()
        closeImageView()
    }

    const getMiniComponent = () => {
        switch (fileType) {
            case "video":
                return <video
                    style={{ cursor: "pointer" }}
                    onClick={toggleImageView}
                    width={240}
                    height={130}
                    src={fileUrl} />

            case "document":
                if (file.type.includes("pdf")) {
                    return <AppIframe aspectRatio={16 / 9}
                        style={{ cursor: "pointer" }}
                        width={240} src={fileUrl} />
                } else {
                    return <Image
                        style={{ cursor: "pointer", objectFit: "contain" }}
                        onClick={toggleImageView}
                        width={240}
                        height={130}
                        src="/img/document.jpg" alt="" />
                }
            case "document":
                return
            case "audio":
                return (
                    <Box w="100%" my={16}>
                        <AppAudioPlayer src={fileUrl} />
                    </Box>
                )

            default:
                return <Image
                    style={{ cursor: "pointer", objectFit: "contain" }}
                    onClick={toggleImageView}
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
                    style={{ cursor: "pointer", maxHeight: "70vh" }}
                    width="100%"
                    height="auto"
                    src={fileUrl} />
            case "document":
                if (file.type.includes("pdf")) {
                    return <AppIframe
                        aspectRatio={3 / 4}
                        style={{ cursor: "pointer" }}
                        width="80%" src={fileUrl} />
                } else {
                    return <Image
                        style={{ cursor: "pointer", objectFit: "contain" }}
                        onClick={toggleImageView}
                        width={400}
                        height={600}
                        src="/img/document.jpg" alt="" />
                }
            case "audio":
                return (
                    <Box w="100%" my={16}>
                        <AppAudioPlayer src={fileUrl} />
                    </Box>
                )
            default:
                return <img
                    width="100%"
                    height="auto" style={{ objectFit: "contain", maxHeight: "70vh" }}
                    src={fileUrl} alt="" />
        }
    }

    return (
        <>
            <FilePreviewContainer>
                <Flex mb={10} gap={10}>
                    {fileType !== "audio" &&
                        <AppButton onClick={toggleImageView} variant="submit">
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
                <Flex justify="center">
                    <Box >
                        <Text c={COLORS.PRIMARY_COLOR}>
                            {file.name.slice(0, 25)}
                        </Text>
                        {getMiniComponent()}
                    </Box>
                </Flex>
                {withReOrder &&
                    <Flex mt={10} w="100%" align="center" gap={10}>
                        <AppInput style={{ input: { width: "140px" } }}
                            value={order}
                            onChange={(value) => setOrder(parseInt(value.target.value))}
                        />
                        <AppButton
                            onClick={() => handleReOrder({ from: index, to: order, group: "file" })}
                            variant="sorting">
                            <IconCheck />
                        </AppButton>
                    </Flex>
                }
            </FilePreviewContainer>
            {fileType !== "audio" &&
                <AppModal size="60vw" opened={openedImageView} toggle={toggleImageView} closeOnClickOutside>
                    <Flex justify="center">
                        {getBiggerComponent()}
                    </Flex>
                    <Flex justify="center" mt={10} gap={10}>
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
                </AppModal>}
            {withCroper &&
                <AppModal opened={openedCropImage} toggle={toggleCropImage}>
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
