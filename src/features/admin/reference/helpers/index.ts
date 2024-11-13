import { Reference, ReferenceFilter, ReferenceRequest } from '@/entities';
import { getFormType } from '@/types';


export const getReferenceFilterForm: getFormType<ReferenceFilter, ReferenceFilter> =
    (params?: ReferenceFilter) => {
        const initialValues: ReferenceFilter = {
            enabled: params?.enabled,
            title: params?.title,
            typeCode: params?.typeCode,
            typeId: params?.typeId
        }
        return { initialValues }
    }


export const getReferenceForm: getFormType<ReferenceRequest, Reference> = (values, t) => {
    const initialValues: ReferenceRequest = {
        id: values?.id,
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        titleEn: values?.titleEn || "",
        parentId: values?.parent?.id,
        type: values?.type
    }

    return {
        initialValues, validate: {
            type: (value) => !value && t && t("form.error.required"),
            titleKg: (value) => !value && t && t("form.error.required"),
            titleRu: (value) => !value && t && t("form.error.required"),
            titleEn: (value) => !value && t && t("form.error.required"),
        }
    }
}



