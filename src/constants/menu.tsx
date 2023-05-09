import {Link} from "react-router-dom";
import React from "react";

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
        isAuth: true
    },
    {
        key: '/subjects',
        locations: ['subjects'],
        label: <Link to='/subjects'>Предметы</Link>,
        isAuth: true
    },
    {
        key: '/levels',
        locations: ['levels'],
        label: <Link to='/levels'>Уровень подготовки</Link>,
        isAuth: true
    }
]