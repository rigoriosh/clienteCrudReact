import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import PublicRout from './PublicRout';
import { LoginScreen } from '../components/auth/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import PrivateRoute from './PrivateRoute';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AppRouter = () => {
    const {user:{logged}} = useContext(AuthContext)
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRout isAuthenticated={logged} path="/login" component={LoginScreen}/>
                    <PublicRout isAuthenticated={logged} path="/register" component={RegisterScreen}/>
                    <PrivateRoute isAuthenticated={logged} path="/" component={DashboardRoutes}/>       
                </Switch>
            </div>
        </Router>
    )
}
