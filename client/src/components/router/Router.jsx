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

// import userService from "../../utils/user-service"
// import { parseCookies } from "../../utils/helpers"

function Router() {
    // const [loggedIn, updateLoggedIn] = useState(false)

    // const loggedIn = cookies.userToken

    return (<Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/create" exact component={Create} />
        <Route path="/bug/:id" exact component={Details} />
        <Route path="/bug/edit/:id" exact component={Edit} />
        <Route path="/logout" component={Logout} />
    </Switch>)
}

export default Router