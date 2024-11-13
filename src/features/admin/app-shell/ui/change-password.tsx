import { AppButton, AppInput } from "@/shared/ui";
import { Box, Flex, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

type Props = {
    handleSubmit: () => void;
    handleCancel: () => void;
    loading: boolean;
    oldPasswordProps: GetInputPropsReturnType;
    newPasswordProps: GetInputPropsReturnType;
    repeatNewPasswordProps?: GetInputPropsReturnType;
}

export const ChangePasswordFeature = ({
    handleCancel,
    handleSubmit,
    newPasswordProps,
    oldPasswordProps,
    repeatNewPasswordProps,
    loading
}: Props) => {
    const t = useTranslations()

    return (
        <Box>
            <Title c="white" fz={{ base: 18, sm: 24 }} ta="center">
                {t("button.changePassword")}
            </Title>
            <Box my={30}>
                <AppInput
                    type="password"
                    label={t("form.label.currentPassword")}
                    {...oldPasswordProps}
                />
            </Box>
            <Box my={30}>
                <AppInput
                    type="password"
                    label={t("form.label.newPassword")}
                    {...newPasswordProps}
                />
            </Box>
            {repeatNewPasswordProps && <Box mb={30}>
                <AppInput
                    type="password"
                    label={t("form.label.repeatNewPassword")}
                    {...repeatNewPasswordProps}
                />
            </Box>}
            <Flex w="100%" justify="space-evenly">
                <AppButton loading={loading} onClick={handleCancel} variant="default">
                    {t("button.cancel")}
                </AppButton>
                <AppButton loading={loading} onClick={handleSubmit} variant="default">
                    {t("button.submit")}
                </AppButton>
            </Flex>
        </Box>
    )
}
