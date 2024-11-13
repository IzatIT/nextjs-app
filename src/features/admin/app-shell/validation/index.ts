import { ChangePasswordRequest } from '@/entities';
import { UseFormInput } from '@mantine/form';

type Args = {
    minTitle: string;
    requiredTitle: string;
}

type getFormType = (body: Args) => UseFormInput<ChangePasswordRequest, (values: ChangePasswordRequest) => ChangePasswordRequest>

export const getChangePasswordForm: getFormType = ({
    minTitle,
    requiredTitle,
}) => {
    const validate = {
        newPassword: (value: string) => !value && requiredTitle || value.length < 6 && `${minTitle} ${6}`,
        oldPassword: (value: string) => !value && requiredTitle || value.length < 6 && `${minTitle} ${6}`
    }

    const initialValues: ChangePasswordRequest = {
        newPassword: "",
        oldPassword: "",
        repeatNewPassword: ""
    }
    return {
        initialValues, validate: validate
    }
}