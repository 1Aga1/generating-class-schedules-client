import {Button, Form, Input, message, Modal, Select} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {ILevelModalProps} from "./ILevelModalProps";
import SubjectApi from "../../api/subject-api";
import Levels from "../../pages/Levels/Levels";
import LevelApi from "../../api/level-api";

const requiredFormItem = {
    required: true,
    message: ''
}

interface IOptions {
    value: number
    label: string,
}

const LevelModal: FC<ILevelModalProps> = ({open, onClose, initialValues, onSubmit, submitText, titleText, loading}) => {
    const [options, setOptions] = useState<IOptions[]>();
    const [loadingField, setLoadingField] = useState<boolean>(false);
    const [disabledField, setDisabledField] = useState<boolean>(false);

    const fetchSubjects = () => {
        SubjectApi.getSubjects().then(res => {
            setOptions(res.data.map(subject => {
                return {
                    value: subject.id,
                    label: subject.name + ' - ' + subject.office
                }
            }));
        }).catch((e) => {
            message.error('Ошибка загрузки предметов!');
        });
    };

    const addSubject = (value: number) => {
        setDisabledField(true);
        setLoadingField(true);
        LevelApi.addSubject(initialValues?.id!, value).then(
        ).catch((e) => {
            message.error('Ошибка добавления!');
        });
        setLoadingField(false);
        setDisabledField(false);
    }

    const removeSubject = (value: number) => {
        setDisabledField(true);
        setLoadingField(true);
        LevelApi.removeSubject(initialValues?.id!, value).then().catch((e) => {
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
                <Form.Item name='text' label='Название' rules={[requiredFormItem]}>
                    <Input/>
                </Form.Item>
                {
                    initialValues &&
                    <Form.Item name='subjects' label='Предметы'>
                        <Select
                            mode="multiple"
                            showSearch={false}
                            style={{ width: '100%' }}
                            placeholder="Выберите предмет"
                            onSelect={addSubject}
                            onDeselect={removeSubject}
                            options={options}
                            loading={loadingField}
                            disabled={disabledField}
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

export default LevelModal;