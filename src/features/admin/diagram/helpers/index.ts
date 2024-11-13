import { Diagram, DIAGRAM_QUARTER, DiagramFilter, DiagramForm } from '@/entities';
import { DateTime } from '@/shared';
import { getFormType } from '@/types';


export const getDiagramFilterForm: getFormType<DiagramFilter, DiagramFilter> =
    (params?: DiagramFilter) => {
        const initialValues: DiagramFilter = {
            title: params?.title,
            typeId: params?.typeId,
            categoryId: params?.categoryId
        }
        return { initialValues }
    }


export const getDiagramForm: getFormType<DiagramForm, Diagram> = (values, t) => {
    const initialValues: DiagramForm = {
        id: values?.id,
        order: values?.order || 50,
        contentEn: values?.contentEn || "",
        contentKg: values?.contentKg || "",
        contentRu: values?.contentRu || "",
        descriptionEn: values?.descriptionEn || "",
        descriptionRu: values?.descriptionRu || "",
        descriptionKg: values?.descriptionKg || "",
        titleEn: values?.titleEn || "",
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        typeId: values?.type?.id,
        categoryId: values?.category?.id,
        dateFrom: DateTime.GetDateFromString(values?.dateFrom),
        dateTo: DateTime.GetDateFromString(values?.dateTo),
        quarter: values?.quarter,
        year: values?.year || DateTime.GetNow().getFullYear(),
        fields: values?.fields?.map(field => ({
            ...field,
            typeId: field?.type?.id,
            values: field.values?.map(value => ({
                ...value,
                dateFrom: DateTime.GetDateFromString(value?.dateFrom),
                dateTo: DateTime.GetDateFromString(value?.dateTo),
            }))
        })) || []
    }

    return {
        initialValues,
        validate: {
            titleKg: (value) => !value && t && t("form.error.required"),
            titleRu: (value) => !value && t && t("form.error.required"),
            year: (value) => !value && t && t("form.error.required"),
            order: (value) => !value && t && t("form.error.required"),
        }
    }
}