import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {LoadingOutlined} from "@ant-design/icons";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import user from "./store/user/user";
import Layout from "./components/Layout/Layout";
import {IMenu, menu} from "./constants/menu";


function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [newMenu, setNewMenu] = useState<IMenu[]>([]);

    const checkAuth = async () => {
        setLoading(true)

        try {
            await user.checkout()
        } catch (e) {}

        setLoading(false)
    }

    useEffect(() => {
        checkAuth().then();
    }, [])

    return (
        loading ? <>
            <div className="loading-container">
                <LoadingOutlined className='loading'/>
            </div>
        </> : <>
            <BrowserRouter>
                {
                    user.isAuth
                    ? <Layout menu={menu}><Routes/></Layout>
                    : <Routes/>
                }
            </BrowserRouter>
        </>
    );
}

export default observer(App);
