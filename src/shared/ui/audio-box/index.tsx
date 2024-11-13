"use client"
import { COLORS } from '@/constants'
import { AttachmentPath } from '@/entities'
import { Box, Flex, Text } from '@mantine/core'
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

type Props = {
    id?: number
    uuid?: string
    title: string
    audioUrl?: string;
    color: "dark" | "light"
}

export const AudioBox = ({ id, uuid, title, audioUrl, color }: Props) => {
    const t = useTranslations()
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);


    const handlePlayAudio = () => {
        if (id && uuid) {
            if (!audioPlayerRef.current) {
                audioPlayerRef.current =
                    new Audio(AttachmentPath.GetAttachmentUrl(id, uuid));
            }
            if (!isAudioPlaying) {
                audioPlayerRef.current.play();
                setIsAudioPlaying(true);
                audioPlayerRef.current.onended = () => setIsAudioPlaying(false);
            } else {
                audioPlayerRef.current.pause();
                setIsAudioPlaying(false);
            }
        } else if (audioUrl) {
            if (!audioPlayerRef.current) {
                audioPlayerRef.current =
                    new Audio(audioUrl);
            }
            if (!isAudioPlaying) {
                audioPlayerRef.current.play();
                setIsAudioPlaying(true);
                audioPlayerRef.current.onended = () => setIsAudioPlaying(false);
            } else {
                audioPlayerRef.current.pause();
                setIsAudioPlaying(false);
            }
        }
    };
    const colorTheme = color === "dark" ? COLORS.SECONDARY_COLOR : COLORS.PRIMARY_COLOR
    return (
        <Flex
            onClick={handlePlayAudio}
            style={{
                border: `1px solid ${colorTheme}`,
                borderRadius: "12px",
                cursor: "pointer",
            }}
            w="fit-content"
            align="center"
            px={30}
            py={15}
            gap={16}
        >
            <Box>
                {isAudioPlaying ? (
                    <IconPlayerPauseFilled size={24} color={colorTheme} />
                ) : (
                    <IconPlayerPlayFilled size={24} color={colorTheme} />
                )}
            </Box>
            <Text fz={{ base: 14, sm: 16 }} fw={600} c={colorTheme}>
                {title}
            </Text>
        </Flex>
    )
}
