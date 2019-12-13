import React from "react"
import { Route, Switch } from "react-router-dom"

import Home from "../pages/home/Home"
import Register from "../pages/user/register/Register"
import Login from "../pages/user/login/Login"
import Create from "../pages/bug/create/Create"
import Details from "../pages/bug/details/Details"
import Edit from "../pages/bug/edit/Edit"

function Router() {
    return (<Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/create" exact component={Create} />
        <Route path="/bug/:id" exact component={Details} />
        <Route path="/bug/edit/:id" exact component={Edit} /> 
    </Switch>)
}

export default Router