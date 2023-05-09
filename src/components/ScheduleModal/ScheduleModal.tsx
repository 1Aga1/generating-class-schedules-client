import {Button, DatePicker, Form, Modal} from 'antd';
import React, {FC} from 'react';
import {IScheduleModalProps} from "./IScheduleModalProps";

const requiredFormItem = {
    required: true,
    message: ''
}

const ScheduleModal: FC<IScheduleModalProps> = ({open, onClose, initialValues, onSubmit, submitText, titleText, loading}) => {
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
                <Form.Item name='date' label='Дата' rules={[requiredFormItem]}>
                    <DatePicker format='DD.MM.YYYY' style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item style={{display: 'flex', justifyContent: 'right'}}>
                    <Button htmlType='submit' type='primary' loading={loading}>{submitText}</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ScheduleModal;