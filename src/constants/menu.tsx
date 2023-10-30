import {Link} from "react-router-dom";
import React from "react";
import {Button} from "antd";
import user from "../store/user/user";

export interface IMenu {
    key: string,
    label: React.ReactNode,
    isAuth?: boolean,
    locations?: string[]
}

export const menu: IMenu[] = [
    {
        key: '/schedules',
        locations: ['schedules', 'schedule'],
        label: <Link to='/schedules'>Расписания</Link>
    },
    {
        key: '/groups',
        locations: ['groups', 'group'],
        label: <Link to='/groups'>Классы</Link>,
    },
    {
        key: '/subjects',
        locations: ['subjects'],
        label: <Link to='/subjects'>Предметы</Link>,
    },
    {
        key: '/teachers',
        locations: ['teachers'],
        label: <Link to='/teachers'>Учителя</Link>,
    },
    {
        key: '',
        label: <Button danger onClick={() => user.logout()}>Выйти</Button>,
    }
]