import {Button, DatePicker, Form, Input, Modal, Select} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {IGroupModalProps} from "./IGroupModalProps";
import LevelApi from "../../api/level-api";
import {Simulate} from "react-dom/test-utils";

const requiredFormItem = {
    required: true,
    message: ''
}

interface IOptions {
    label: string,
    value: number
}

const GroupModal: FC<IGroupModalProps> = ({open, onClose, initialValues, onSubmit, submitText, titleText, loading}) => {
    const [options, setOptions] = useState<IOptions[]>()

    const fetchLevels = async () => {
        const res = await LevelApi.getLevels();
        setOptions(res.data.map(level => {
            return {
                label: level.text,
                value: level.id
            }
        }));
    }

    useEffect(() => {
        fetchLevels().then();
    }, [])

    return (
        <Modal
            destroyOnClose
            open={open}
            onCancel={onClose}
            bodyStyle={{paddingTop: 30}}
            title={titleText}
            width={800}
            footer={null}
        >
            <Form labelCol={{span: 8}} wrapperCol={{span: 16}} labelAlign='left' onFinish={onSubmit} initialValues={initialValues}>
                <Form.Item name='levelId' label='Уровень подготовки' rules={[requiredFormItem]}>
                    <Select
                        options={options}
                    />
                </Form.Item>
                <Form.Item name='name' label='Название' rules={[requiredFormItem]}>
                    <Input/>
                </Form.Item>
                <Form.Item style={{display: 'flex', justifyContent: 'right'}}>
                    <Button htmlType='submit' type='primary' loading={loading}>{submitText}</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GroupModal;