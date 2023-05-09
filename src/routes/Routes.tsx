import React from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import Unauthorized from "./Unauthorized";
import Authorized from "./Authorized";
import Schedule from "../pages/schedule/schedule";
import Schedules from "../pages/schedules/schedules";

const Routes = () => {
    return useRoutes([
        {
            path: '/schedules',
            element: <Unauthorized component={<Schedules/>}/>,
        },
        {
            path: '/schedule/:number',
            element: <Authorized component={<Schedule/>}/>,
        },
        {
            path: '/*',
            element: <Navigate to='schedules' />
        },
    ])
};

export default Routes;