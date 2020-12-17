import { Route } from "react-router-dom";
import React, { lazy } from 'react';

function generateRoutes (routes) {
    return (
        <div key={'generateRoutes'}>
            {
                routes.map(item => {
                    return (
                        <Route path={'/menu' + item.path} key={'/menu' + item.path} strict={true} exact={true} component={lazy(() => import(`../views${item.componentFilePath}/index`))}></Route>
                    )
                })
            }
        </div>
    )
}

export default generateRoutes