import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import type { RecordType } from '../types/types.ts';

interface Props {
    open: boolean;
    onCancel: () => void;
    onSubmit: (record: RecordType) => void;
    editingRecord: RecordType | null;
}

export default function RecordModal({ open, onCancel, onSubmit, editingRecord }: Props) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editingRecord) {
                form.setFieldsValue({
                    name: editingRecord.name,
                    date: dayjs(editingRecord.date),
                    value: editingRecord.value,
                });
            } else {
                form.resetFields();
            }
        }
    }, [editingRecord, open, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const newRecord: RecordType = {
                key: editingRecord?.key ?? Date.now().toString(),
                name: values.name,
                date: values.date.toISOString(),
                value: values.value,
            };

            onSubmit(newRecord);
            form.resetFields();
        } catch (err) {
            console.error('Validation Failed:', err);
        }
    };

    return (
        <Modal
            open={open}
            title={editingRecord ? 'Редактировать запись' : 'Добавить запись'}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={handleOk}
            okText="Сохранить"
            cancelText="Отмена"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[{ required: true, message: 'Введите имя' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Дата"
                    rules={[{ required: true, message: 'Выберите дату' }]}
                >
                    <DatePicker format="DD.MM.YYYY" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="value"
                    label="Числовое значение"
                    rules={[{ required: true, message: 'Введите значение' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
