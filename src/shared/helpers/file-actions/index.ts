import uniqid from "uniqid";

export class FileActions {
    static ConvertToBase64FromFile = async (imageFile: File | null): Promise<string | undefined> => {
        if (imageFile) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader?.readAsDataURL(imageFile);
                reader.onload = () => {
                    const result = reader.result as string;
                    const base64String = result.split(',')[1];
                    resolve(base64String);
                };
                reader.onerror = error => reject(error);
            });
        }
        return;
    }

    static ConvertToFileFromBase64 = (base64: string, mimeType = 'image/png', filename?: string) => {
        const byteString = atob(base64.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        const actualFileName = filename || uniqid(mimeType?.split("/")?.[1] || "png")
        const blob = new Blob([intArray], { type: mimeType });
        return new File([blob], actualFileName, { type: mimeType });
    }

    static async CreateFileFromPath(path: string, name: string, type: string): Promise<File> {
        let response = await fetch(path);
        let data = await response.blob();
        let metadata = {
            type: type
        };
        return new File([data], name, metadata);
    }
}