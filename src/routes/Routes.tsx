import React from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import Unauthorized from "./Unauthorized";
import Authorized from "./Authorized";
import Schedule from "../pages/schedule/schedule";
import Schedules from "../pages/schedules/schedules";
import Groups from "../pages/groups/Groups";
import Authorization from "../pages/authorization/Authorization";

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
            path: '/*',
            element: <Navigate to='/' />
        },
    ])
};

export default Routes;