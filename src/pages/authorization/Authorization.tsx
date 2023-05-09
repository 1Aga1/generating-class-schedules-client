import React, {useState} from 'react';
import {Button, Form, Input, message} from "antd";
import {IdcardFilled, LockFilled} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import {AxiosError} from "axios";
import user from "../../store/user/user";
import {observer} from "mobx-react-lite";
import {IAuthForm} from "../../types/forms";
import style from './Authorization.module.scss'

const requiredFormItem = {
    required: true,
    message: ''
}

const Authorization = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const onFinish = async ({username, password}: IAuthForm) => {
        setLoading(true)

        try {
            await user.login(username, password)
            navigate('/schedules')
        } catch (error) {
            const e = error as AxiosError
            if (e.response?.data === 'Wrong username or password') {
                message.error('Неверный логин или пароль')
            }
        }

        setLoading(false)
    }

    return (
        <div className={style.authFormContainer}>
            <Form
                size='large'
                onFinish={onFinish}
                className={style.form}
            >
                <Form.Item name='username' rules={[requiredFormItem]}>
                    <Input placeholder='Логин' prefix={<IdcardFilled className={style.inputIcon} />}/>
                </Form.Item>
                <Form.Item name='password' rules={[requiredFormItem]}>
                    <Input.Password placeholder='Пароль' prefix={<LockFilled className={style.inputIcon} />}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary' block loading={loading}>Войти</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(Authorization);