import React from "react"
import { Route, Switch} from "react-router-dom"

//auth
import Register from "../pages/user/register/Register"
import Login from "../pages/user/login/Login"
import Logout from "../pages/user/logout/Logout"

//app
import Home from "../pages/home/Home"
import Create from "../pages/bug/create/Create"
import Details from "../pages/bug/details/Details"
import Edit from "../pages/bug/edit/Edit"
import My from "../pages/bug/my/My"

function Router() {
    return (<Switch>
        <Route path="/" exact component={Home} />
        <Route path="/my" exat component={My} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/create" exact component={Create} />
        <Route path="/bug/edit/:id" exact component={Edit} />
        <Route path="/bug/delete/:id" exact />
        <Route path="/bug/:id/:load" component={Details} />
        <Route path="/bug/:id" component={Details} />
        <Route path="/logout" component={Logout} />
    </Switch>)
}

export default Router