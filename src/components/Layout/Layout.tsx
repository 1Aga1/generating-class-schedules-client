import {Content, Header} from 'antd/es/layout/layout';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {Menu, Layout as AntLayout} from "antd";
import {IMenu} from "../../constants/menu";
import {useLocation} from "react-router-dom";
import style from './Layout.module.scss';

interface ILayoutProps {
    menu: IMenu[],
    children?: ReactNode
}

const Layout: FC<ILayoutProps> = ({menu, children}) => {
    const location = useLocation()
    const [selectedMenu, setSelectedMenu] = useState<string>('')

    useEffect(() => {
        const rootPath = location.pathname.split('/')[1]
        const item = menu.filter(item => item.locations?.includes(rootPath))[0]
        setSelectedMenu(item ? item.key : '')
    }, [location, menu])

    return (
        <AntLayout className={style.layout}>
            <Header className={style.header}>
                <Menu
                    theme='light'
                    mode="horizontal"
                    items={menu}
                    selectedKeys={[selectedMenu]}
                />
            </Header>
            <Content className={style.content}>
                {children}
            </Content>
        </AntLayout>
    );
};

export default Layout;