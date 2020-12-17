import { Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import store from '../store/index'
const { SubMenu } = Menu;

function renderMenu (item) {
    return (
        <SubMenu key={item.path} title={item.menuName}>
            {
                item.children.map(child => {
                    if (child.children) {
                        return renderMenu(child)
                    } else {
                        return (
                            <Menu.Item key={child.path}>{child.menuName}</Menu.Item>
                        )
                    }

                })
            }
        </SubMenu>
    )
}

function MenuComponent ({ history }) {
    const clickMenu = ({ key }) => {
        history.push('/menu' + key)
    }

    const [menus, setMenus] = useState([])

    useEffect(() => {
        const type = 'setMenus'
        store.subscribeMutation(type, (menus) => {
            setMenus(menus)
        })
        return () => store.unSubscribeMutation(type)
    }, [menus])

    const style = {
        width: 200, height: '100vh', 'overflowX': 'hidden'
    }
    return (
        <Menu
            style={style}
            mode="inline"
            onClick={clickMenu}
        >
            {
                menus.map(item => {
                    if (item.children) {
                        return renderMenu(item)
                    } else {
                        return (
                            <Menu.Item key={item.path}>{item.menuName}</Menu.Item>
                        )
                    }
                })
            }
        </Menu>
    )
}



export default MenuComponent;
