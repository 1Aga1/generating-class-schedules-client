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
        key: '/Schedules',
        locations: ['schedules', 'schedule'],
        label: <Link to='/schedules'>Расписания</Link>
    },
    {
        key: '/Groups',
        locations: ['groups', 'group'],
        label: <Link to='/groups'>Классы</Link>,
    },
    {
        key: '/subjects',
        locations: ['subjects'],
        label: <Link to='/subjects'>Предметы</Link>,
    },
    {
        key: '/levels',
        locations: ['levels'],
        label: <Link to='/levels'>Уровень подготовки</Link>,
    }
]