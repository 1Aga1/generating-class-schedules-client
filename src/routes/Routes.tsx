import React from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import Unauthorized from "./Unauthorized";
import Authorized from "./Authorized";
import Schedule from "../pages/Schedule/Schedule";
import Schedules from "../pages/Schedules/Schedules";
import Groups from "../pages/Groups/Groups";
import Authorization from "../pages/Authorization/Authorization";
import Subjects from "../pages/Subjects/Subjects";

const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Unauthorized component={<Authorization/>}/>
        },
        {
            path: '/schedules',
            element: <Authorized component={<Schedules/>}/>,
        },
        {
            path: '/schedule/:number',
            element: <Authorized component={<Schedule/>}/>,
        },
        {
            path: '/groups',
            element: <Authorized component={<Groups/>}/>
        },
        {
            path: '/subjects',
            element: <Authorized component={<Subjects/>}/>
        },
        {
            path: '/*',
            element: <Navigate to='/' />
        },
    ])
};

export default Routes;