import { Box, Flex, rem, Text } from "@mantine/core";
import { IconVinyl } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import styles from "./audio-dropzone.module.scss";
import { COLORS } from "@/constants";
type Props = {
    onChange: (files: File[]) => void;
}

export const AudioDropzone = ({
    onChange
}: Props) => {
    const t = useTranslations()

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList | null = event.target.files
        if (fileList) {
            const files: File[] = []
            for (let i = 0; i < (fileList?.length || 0); i++) {
                files.push(fileList?.[i])
            }
            onChange(files)
        }
    }

    return (
        <Flex mb={10} justify="center" align="center" className={styles.dropzone_container}>
            <input multiple={true}
                onChange={handleChange}
                className={styles.input}
                accept=".mp3,audio/*"
                type="file" name="file" />
            <Flex gap={30}>
                <Box>
                    <IconVinyl style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                        stroke={1.5} />
                </Box>
                <div>
                    <Text c={COLORS.PRIMARY_COLOR} fz={{ base: 16, sm: 18 }} inline>
                        {t("form.label.audioAttachments")}
                    </Text>
                    <Box fz={{ base: 14, sm: 16 }} c="gray" mt={7}>
                        {t("button.expected-extentions")}: <br />
                        MP3
                    </Box>
                </div>
            </Flex>
        </Flex>
    )
}
