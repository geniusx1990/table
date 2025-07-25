import type {RecordType} from '../types/types.ts';

export const filterRecords = (records: RecordType[], search: string): RecordType[] => {
    const lower = search.toLowerCase();
    return records.filter((r) =>
        Object.values(r).some((val) =>
            String(val).toLowerCase().includes(lower)
        )
    );
};
