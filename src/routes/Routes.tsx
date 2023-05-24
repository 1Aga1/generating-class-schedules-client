import React from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import Unauthorized from "./Unauthorized";
import Authorized from "./Authorized";
import Schedule from "../pages/Schedule/Schedule";
import Schedules from "../pages/Schedules/Schedules";
import Groups from "../pages/Groups/Groups";
import Authorization from "../pages/Authorization/Authorization";
import Subjects from "../pages/Subjects/Subjects";
import Levels from "../pages/Levels/Levels";
import Teachers from "../pages/Teachers/Teachers";

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
            path: '/levels',
            element: <Authorized component={<Levels/>}/>

        },
        {
            path: '/teachers',
            element: <Authorized component={<Teachers/>}/>

        },
        {
            path: '/*',
            element: <Navigate to='/' />
        },
    ])
};

export default Routes;