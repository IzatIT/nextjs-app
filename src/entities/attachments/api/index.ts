import { createApi } from "@/constants";

export class AttachmentPath {
    static get = (id: number, uuid: string) => createApi(`attachments/${id}/${uuid}`);
    static preview = (id: number | string, uuid: string | number) => createApi(`attachments/${id}/${uuid}/preview`);

    static GetAttachmentUrl = (id?: number, uuid?: string) => {
        if (id && uuid) {
            return this.get(id, uuid);
        };
        return "";
    };
};


