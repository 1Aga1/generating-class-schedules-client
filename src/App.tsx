import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {LoadingOutlined} from "@ant-design/icons";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import account from "./store/account/account";
import Layout from "./components/Layout/Layout";
import {IMenu, menu} from "./constants/menu";


function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [newMenu, setNewMenu] = useState<IMenu[]>([]);

    const checkAuth = async () => {
        setLoading(true)

        try {
            await account.check()
        } catch (e) {}

        setLoading(false)
    }

    const filterMenu = () => {}

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
                <Layout menu={menu}><Routes/></Layout>
            </BrowserRouter>
        </>
    );
}

export default observer(App);
