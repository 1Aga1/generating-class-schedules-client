import {Button, Form, Input, Modal} from 'antd';
import React, {FC} from 'react';
import {ISubjectModalProps} from "./ISubjectModalProps";

const requiredFormItem = {
    required: true,
    message: ''
}

const SubjectModal: FC<ISubjectModalProps> = ({open, onClose, initialValues, onSubmit, submitText, titleText, loading}) => {
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
                <Form.Item name='name' label='Предмет' rules={[requiredFormItem]}>
                    <Input/>
                </Form.Item>
                <Form.Item name='office' label='Кабинет' rules={[requiredFormItem]}>
                    <Input/>
                </Form.Item>
                <Form.Item style={{display: 'flex', justifyContent: 'right'}}>
                    <Button htmlType='submit' type='primary' loading={loading}>{submitText}</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SubjectModal;