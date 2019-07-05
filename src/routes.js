import { Route, Switch, Redirect } from 'react-router-dom'
import LoginBox from './pages/LoginBox'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import React from 'react'
import { isAuthenticated } from './services/auth'


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route  {...rest} render={ props => isAuthenticated() 
                                        ? ( <Component {...props} />) 
                                        : ( <Redirect to={{ pathname: "/", state: { from: props.location } }} />)
                             }/>
)

const Routes = () => (
        <Switch>
            <Route path="/" exact component={LoginBox}/>
            <Route path="/register" component={Register}/> 
            <Route path="/forgotPassword" component={ForgotPassword}/> 
            <Route path="/reset" component={ResetPassword}/> 
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <Route path="*" component={() => <h1>Error 404: Page not found</h1>} />
        </Switch>

)

export default Routes