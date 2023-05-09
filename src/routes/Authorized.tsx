import React, {FC} from 'react';
import {IRoute} from "./IRoute";
import {Navigate} from "react-router-dom";
import account from "../store/account/account";

const Authorized: FC<IRoute> = ({component}) => {
    return (
        account.isAuth ? (() => component)() : <Navigate to='/'/>
    );
};

export default Authorized;