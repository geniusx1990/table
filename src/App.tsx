import { useState, useMemo } from 'react';
import { Button, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RecordType } from './types/types.ts';
import { filterRecords } from './utils/filterRecords';

import TableComponent from './components/TableComponent';
import RecordModal from './components/RecordModal';
import SearchBar from './components/SearchBar';
import { useRecordContext } from './context/RecordContext';

export default function App() {
    const { records, setRecords } = useRecordContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<RecordType | null>(null);
    const [search, setSearch] = useState('');

    const handleAddClick = () => {
        setEditingRecord(null);
        setIsModalOpen(true);
    };

    const handleEdit = (record: RecordType) => {
        setEditingRecord(record);
        setIsModalOpen(true);
    };

    const handleDelete = (key: string) => {
        setRecords(records.filter((r) => r.key !== key));
    };

    const handleSubmit = (record: RecordType) => {
        const updated = records.some((r) => r.key === record.key)
            ? records.map((r) => (r.key === record.key ? record : r))
            : [...records, record];

        setRecords(updated);
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    const filteredRecords = useMemo(() => {
        return filterRecords(records, search);
    }, [records, search]);

    return (
        <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
            <Typography.Title level={2}>Управление данными</Typography.Title>

            <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <SearchBar value={search} onChange={setSearch} />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
                    Добавить
                </Button>
            </Space>

            <TableComponent data={filteredRecords} onEdit={handleEdit} onDelete={handleDelete} />

            <RecordModal
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingRecord(null);
                }}
                onSubmit={handleSubmit}
                editingRecord={editingRecord}
            />
        </div>
    );
}
