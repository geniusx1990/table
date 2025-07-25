import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { RecordType } from '../types/types.ts';

interface RecordContextType {
    records: RecordType[];
    setRecords: (records: RecordType[]) => void;
}

const RecordContext = createContext<RecordContextType | null>(null);

export default function RecordProvider({ children }: { children: React.ReactNode }) {
    const [records, setRecordsState] = useState<RecordType[]>([]);
    const isFirstLoad = useRef(true);

    useEffect(() => {
        const stored = localStorage.getItem('records');
        if (stored) {
            try {
                setRecordsState(JSON.parse(stored));
            } catch (e) {
                console.warn('Failed to parse localStorage records:', e);
            }
        }
    }, []);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }

        localStorage.setItem('records', JSON.stringify(records));
    }, [records]);

    const setRecords = (newRecords: RecordType[]) => {
        setRecordsState(newRecords);
    };

    return (
        <RecordContext.Provider value={{ records, setRecords }}>
            {children}
        </RecordContext.Provider>
    );
}

export function useRecordContext() {
    const context = useContext(RecordContext);
    if (!context) throw new Error('useRecordContext must be used within RecordProvider');
    return context;
}
