"use client"
import { Attachment } from '@/entities';
import { Box, Group, rem, Text } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { IconFileText, IconPhoto, IconUpload, IconVideo, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { AudioDropzone } from './audio-dropzone';
import { FilesPreview } from './files-preview';
import { ExpectedType, getMimeTypes, getTypes } from './modules';
import { Notify } from '@/shared/helpers';
import { COLORS } from '@/constants';

type Props = {
    value?: File[];
    attachments?: Attachment[];
    label: string;
    fileType?: ExpectedType
    onChange: (fiels: File[]) => void;
    handleDeleteFile?: (args: HandleDeleteFileArgs) => void
    handleSaveCroped?: (args: HandleSaveCropedArgs) => void;
    handleReOrder?: ({ from, to }: HandleReOrderArgs) => void
    aspectRatio?: number;
    children?: React.ReactNode
}

export const AppDropzone = ({
    fileType = "image",
    label,
    value,
    attachments,
    handleDeleteFile,
    handleSaveCroped,
    aspectRatio,
    handleReOrder,
    ...props
}: Props & Partial<DropzoneProps>) => {
    const t = useTranslations()
    const localLabel = label || t("button.drag-images")

    return (
        <>
            {fileType === "audio" ?
                <AudioDropzone onChange={props.onChange} />
                :
                <Dropzone
                    mb={24}
                    bg="none"
                    onDrop={(files) => props?.onChange && props?.onChange([...(value || []), ...files])}
                    onReject={(files) => Notify.ShowError(files?.map(el => el.errors.map(el => el.message)).flat().join(' '), t("notify.rejected_files"))}
                    accept={getMimeTypes(fileType)}
                    {...props}
                >
                    <Group justify="center" gap="xl" mih={80} style={{ pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                            <IconUpload
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            {fileType === "image" ?
                                <IconPhoto
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                    stroke={1.5}
                                /> :
                                fileType === "document" ?
                                    <IconFileText style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                        stroke={1.5} /> :
                                    <IconVideo style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                        stroke={1.5} />
                            }
                        </Dropzone.Idle>

                        <div>
                            <Text c={COLORS.PRIMARY_COLOR} fz={{ base: 16, sm: 18 }} inline>
                                {localLabel}
                            </Text>
                            <Box fz={{ base: 14, sm: 16 }} c="gray" mt={7}>
                                {t("button.expected-extentions")}: <br />
                                {getTypes(fileType)?.map(el => `${el}  `)}
                            </Box>
                        </div>
                    </Group>
                </Dropzone>}
            <FilesPreview
                fileType={fileType}
                handleDeleteFile={handleDeleteFile}
                handleSaveCroped={handleSaveCroped}
                attachments={attachments}
                handleReOrder={handleReOrder}
                files={value}
                aspectRatio={aspectRatio}
            />
        </>
    )
}
