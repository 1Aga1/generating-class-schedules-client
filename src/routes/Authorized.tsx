import React, {FC} from 'react';
import {IRoute} from "./IRoute";
import {Navigate} from "react-router-dom";
import user from "../store/user/user";

const Authorized: FC<IRoute> = ({component}) => {
    return (
        user.isAuth ? (() => component)() : <Navigate to='/'/>
    );
};

export default Authorized;