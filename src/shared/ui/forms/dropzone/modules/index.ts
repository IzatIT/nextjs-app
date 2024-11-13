import { IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone"

export * from "./attachment-item"
export * from "./file-item"

export type ExpectedType = "video" | "image" | "audio" | "document"

export const getTypes = (fileType?: ExpectedType) => {
    switch (fileType) {
        case "audio":
            return ["MP3"];
        case "document":
            return ["PDF", "XLSX", "DOCX", "PPTX"];
        case "image":
            return ["WEBP", "PNG", "JPG", "SVG", "GIF", "JPEG", "PJP", "AVIF"];
        case "video":
            return ["MP4"]
        default:
            return ["PDF", "XLXS", "DOCX", "PPTX", "WEBP", "PNG", "JPG", "SVG", "GIF", "JPEG", "PJP", "AVIF", "MP4", "MP3"]
    }
}

export const getMimeTypes = (fileType?: ExpectedType) => {
    switch (fileType) {
        case "video":
            return [MIME_TYPES.mp4];
        case "document":
            return [MIME_TYPES.doc, MIME_TYPES.docx, MIME_TYPES.pdf, MIME_TYPES.csv, MIME_TYPES.xls, MIME_TYPES.xlsx, MIME_TYPES.ppt, MIME_TYPES.pptx]
        case "image":
            return IMAGE_MIME_TYPE
        default:
            return IMAGE_MIME_TYPE

    }
}