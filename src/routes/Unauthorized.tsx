import React, {FC} from 'react';
import {IRoute} from "./IRoute";
import {Navigate} from "react-router-dom";
import account from "../store/account/account";

const Unauthorized: FC<IRoute> = ({component}) => {
    return (
        !account.isAuth ? (() => component)() : <Navigate to='/dashboard'/>
    );
};

export default Unauthorized;