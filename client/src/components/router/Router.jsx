import React from "react"
import { Route, Switch } from "react-router-dom"

import Home from "../pages/home/Home"
import Register from "../pages/user/register/Register"
import Login from "../pages/user/login/Login"

function Router() {
    return (<Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </Switch>)
}

export default Router