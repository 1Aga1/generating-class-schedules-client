import {Button, Form, Input, message, Modal, Select} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {IGroupModalProps} from "./IGroupModalProps";
import SubjectApi from "../../api/subject-api";
import GroupApi from "../../api/group-api";

const requiredFormItem = {
    required: true,
    message: ''
}

interface IOptions {
    value: number
    label: string,
}

const courseOptions: IOptions[] = [
    {
        value: 1,
        label: '1 Курс'
    },
    {
        value: 2,
        label: '2 Курс'
    },
    {
        value: 3,
        label: '3 Курс'
    },
    {
        value: 4,
        label: '4 Курс'
    },
]


const GroupModal: FC<IGroupModalProps> = ({open, onClose, initialValues, onSubmit, submitText, titleText, loading}) => {
    const [options, setOptions] = useState<IOptions[]>([]);
    const [loadingField, setLoadingField] = useState<boolean>(false);
    const [disabledField, setDisabledField] = useState<boolean>(false);


    const fetchSubjects = () => {
        SubjectApi.getSubjects().then(res => {
            setOptions(res.data.map(subject => {
                return {
                    value: subject.id,
                    label: subject.name + ' - ' + subject.teacher.fullname
                }
            }));
        }).catch((e) => {
            message.error('Ошибка загрузки предметов!');
        });
    };

    const addSubject = (value: number) => {
        setDisabledField(true);
        setLoadingField(true);
        GroupApi.addSubject(initialValues?.id!, value).then(
            message.success('Предмет добавлен')
        ).catch((e) => {
            message.error('Ошибка добавления!');
        });
        setLoadingField(false);
        setDisabledField(false);
    }

    const removeSubject = (value: number) => {
        setDisabledField(true);
        setLoadingField(true);
        GroupApi.removeSubject(initialValues?.id!, value).then(
            message.success('Предмет удален')
        ).catch((e) => {
            message.error('Ошибка удаления!');
        });
        setLoadingField(false);
        setDisabledField(false);
    }

    useEffect(() => {
        if (initialValues) fetchSubjects();
    }, [initialValues])

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
                <Form.Item name='course' label='Курс' rules={[requiredFormItem]}>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Выберите курс"
                        options={courseOptions}
                    />
                </Form.Item>
                {
                    initialValues &&
                    <Form.Item name='subjects' label='Предметы'>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Выберите предмет"
                            onSelect={addSubject}
                            onDeselect={removeSubject}
                            options={options}
                            loading={loadingField}
                            disabled={disabledField}
                            filterOption={(input, option) =>
                                option!.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        />
                    </Form.Item>
                }
                <Form.Item style={{display: 'flex', justifyContent: 'right'}}>
                    <Button htmlType='submit' type='primary' loading={loading}>{submitText}</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GroupModal;