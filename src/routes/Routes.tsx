import React from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import Unauthorized from "./Unauthorized";
import Authorized from "./Authorized";
import Schedule from "../pages/Schedule/Schedule";
import Schedules from "../pages/Schedules/Schedules";
import Groups from "../pages/Groups/Groups";
import Authorization from "../pages/Authorization/Authorization";

const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Unauthorized component={<Authorization/>}/>
        },
        {
            path: '/Schedules',
            element: <Authorized component={<Schedules/>}/>,
        },
        {
            path: '/Schedule/:number',
            element: <Authorized component={<Schedule/>}/>,
        },
        {
            path: '/Groups',
            element: <Authorized component={<Groups/>}/>
        },
        {
            path: '/*',
            element: <Navigate to='/' />
        },
    ])
};

export default Routes;