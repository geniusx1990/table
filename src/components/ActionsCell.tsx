import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { RecordType } from '../types/types.ts';

interface Props {
    record: RecordType;
    onEdit: (record: RecordType) => void;
    onDelete: (key: string) => void;
}

export default function ActionsCell({ record, onEdit, onDelete }: Props) {
    return (
        <Space>
            <Tooltip title="Редактировать">
                <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
                />
            </Tooltip>

            <Tooltip title="Удалить">
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(record.key)}
                />
            </Tooltip>
        </Space>
    );
}
