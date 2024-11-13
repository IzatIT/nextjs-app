import { CardInfo, CardInfoFilter, CardInfoForm } from '@/entities';
import { getFormType } from '@/types';



export const getCardInfoFilterForm: getFormType<CardInfoFilter, CardInfoFilter> = (params?: CardInfoFilter) => {
    const initialValues: CardInfoFilter = {
        fullName: params?.fullName,
        phone: params?.phone,
        email: params?.email,
        typeId: params?.typeId,
        active: params?.active,
        position: params?.position,
    }
    return {
        initialValues
    }
}


export const getCardInfoForm: getFormType<CardInfoForm, CardInfo> = (values, t) => {
    const requiredTitle = t && t("form.error.required")
    const initialValues: CardInfoForm = {
        id: values?.id,
        order: values?.order || 50,
        active: values?.active || true,
        fullName: values?.fullName || "",
        phone: values?.phone || "",
        email: values?.email || "",
        awardsRu: values?.awardsRu || "",
        awardsKg: values?.awardsKg || "",
        awardsEn: values?.awardsEn || "",
        positionRu: values?.positionRu || "",
        positionEn: values?.positionEn || "",
        positionKg: values?.positionKg || "",
        shortBiographyRu: values?.shortBiographyRu || "",
        shortBiographyKg: values?.shortBiographyKg || "",
        shortBiographyEn: values?.shortBiographyEn || "",
        typeId: values?.type?.id,
        file: [],
        attachment: values?.attachment,
        laborActivities: values?.laborActivities || [{
            order: 0,
            titleEn: "",
            titleKg: "",
            titleRu: "",
            year: 2020
        }],
    }
    return {
        initialValues,
        validate: {
            fullName: (value) => !value && requiredTitle,
            order: (value) => !value && requiredTitle,
            positionKg: (value) => !value && requiredTitle,
            positionRu: (value) => !value && requiredTitle
        }
    }
}