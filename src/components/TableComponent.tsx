import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import type {RecordType} from '../types/types.ts';
import ActionsCell from './ActionsCell';
import dayjs from 'dayjs';

interface TableProps {
    data: RecordType[];
    onEdit: (record: RecordType) => void;
    onDelete: (key: string) => void;
}

export default function TableComponent({data, onEdit, onDelete}: TableProps) {

    const columns: ColumnsType<RecordType> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            render: (value: string) => dayjs(value).format('DD.MM.YYYY'),
        },
        {
            title: 'Значение',
            dataIndex: 'value',
            key: 'value',
            sorter: (a, b) => a.value - b.value,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <ActionsCell record={record} onEdit={onEdit} onDelete={onDelete}/>
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={false}/>;
}

