import { LoginRequest } from '@/entities';
import { UseFormInput } from '@mantine/form';

type Args = {
    minTitle: string;
    requiredTitle: string;
}

type getFormType = (body: Args) => UseFormInput<LoginRequest, (values: LoginRequest) => LoginRequest>

export const getLoginForm: getFormType = ({
    minTitle,
    requiredTitle,
}) => {
    const validate = {
        login: (value: string) => !value && requiredTitle || value.length < 5 && `${minTitle} ${14}`,
        password: (value: string) => !value && requiredTitle || value.length < 6 && `${minTitle} ${6}`
    }

    const initialValues: LoginRequest = {
        login: "admin",
        password: "123456",
    }
    return {
        initialValues, validate: validate
    }
}