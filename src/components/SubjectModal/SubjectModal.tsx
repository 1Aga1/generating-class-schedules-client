import {Button, Form, Input, message, Modal, Select} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {ISubjectModalProps} from "./ISubjectModalProps";
import TeacherApi from "../../api/teacher-api";

const requiredFormItem = {
    required: true,
    message: ''
}

interface IOptions {
    value: number
    label: string,
}

const SubjectModal: FC<ISubjectModalProps> = ({open, onClose, initialValues, onSubmit, submitText, titleText, loading}) => {
    const [options, setOptions] = useState<IOptions[]>();

    const fetchTeachers = () => {
        TeacherApi.getTeachers().then(res => {
            setOptions(res.data.map(teacher => {
                return {
                    value: teacher.id,
                    label: teacher.fullname
                }
            }));
        }).catch((e) => {
            message.error('Ошибка загрузки учителей!');
        });
    };

    useEffect(() => {
        fetchTeachers();
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
                <Form.Item name='name' label='Название' rules={[requiredFormItem]}>
                    <Input/>
                </Form.Item>
                <Form.Item name='teacherId' label='Учитель' rules={[requiredFormItem]}>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Выберите учителя"
                        options={options}
                        filterOption={(input, option) =>
                            option!.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    />
                </Form.Item>
                <Form.Item style={{display: 'flex', justifyContent: 'right'}}>
                    <Button htmlType='submit' type='primary' loading={loading}>{submitText}</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SubjectModal;