import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (
        <Input
            placeholder="Поиск по таблице..."
            prefix={<SearchOutlined />}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            allowClear
        />
    );
}
