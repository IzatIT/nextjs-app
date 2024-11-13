import { LogsFilter } from '@/entities';
import { getFormType } from '@/types';


export const getLogsFilterForm: getFormType<LogsFilter, LogsFilter> =
    (params?: LogsFilter) => {
        const initialValues: LogsFilter = {
            clientId: params?.clientId,
            clientIp: params?.clientIp,
            uri: params?.uri,
        }
        return { initialValues }
    }

