import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import {Crud} from '../components/Crud'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-2">
                <Switch>                    
                    <Route component={Crud} exact path="/crud"></Route>
                    
                    <Redirect to='/crud'/>
                </Switch>
            </div>
        </>
    )
}
