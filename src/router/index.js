import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import loading from '../views/loading/index'
import proxyHistory from './hook'

const routerConfig = [
    // 根路径一定要采取严格匹配 不然其他路径没办法匹配 会一直匹配到根路径
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: lazy(() => import('../views/login/index'))
    },
    {
        path: '/menu',
        component: lazy(() => import('../views/menus/index')),
        children: []
    },
]


const setRouter = (config) => {
    return (
        <Router>
            <Suspense fallback={loading()}>
                {
                    config.map((item) => {
                        if (item.redirect) {
                            return (<Route path={item.path} key={item.path} strict={true} exact={true}>
                                <Redirect to={item.redirect} key={item.path} />
                            </Route>)
                        } else {
                            if (item.children) {
                                return (<Route path={item.path} key={item.path}
                                    render={routeProps => (
                                        <item.component {...proxyHistory(routeProps)} routes={setChildRouter(item.children)} />
                                    )}>
                                </Route >)
                            } else {
                                return (<Route path={item.path} render={routeProps => (
                                    <item.component {...proxyHistory(routeProps)} />
                                )} key={item.path}>
                                </Route>)
                            }
                        }
                    })
                }
            </Suspense>
        </Router >
    )
}

const setChildRouter = (config) => {
    return (
        config.map(item => {
            if (item.children) {
                return setChildRouter(item.children)
            } else {
                return (
                    <Route path={item.path} render={routeProps => (
                        <item.component {...proxyHistory(routeProps)} />
                    )} key={item.path}>
                    </Route>
                )
            }
        })
    )
}


function router () {
    return setRouter(routerConfig)

}
export default router