import Menu from '../../components/menu'
import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import store from '../../store/index'
import generateRoutes from '../../utils/generateRoute'
import { setMenusAndPermission } from '../../utils/setMenuAndPermission'

const { Sider, Content } = Layout;

function Menus (props) {
    const [childRoutes, setChildRoutes] = useState()
    const { history, location: { pathname } } = props

    useEffect(() => {
        setMenusAndPermission()
        const type = 'setRoute'
        store.subscribeMutation(type, (routes) => {
            setChildRoutes(generateRoutes(routes))
        })
        pathname === '/menu' && history.replace('/menu/user/index')
        return () => store.unSubscribeMutation(type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Layout style={{ height: '100vh' }}>
                <Sider><Menu {...props} /></Sider>
                <Layout style={{ padding: '20px' }}>
                    <Content>{childRoutes}</Content>
                </Layout>
            </Layout>
        </div >

    );
}

export default Menus


