import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import {Crud} from '../components/Crud'
import { CourseList } from '../components/CourseList'
import { Materias } from '../components/Materias'
import { Profesors } from '../components/Profesors'
import { Roles } from '../components/Roles'
import { Clase } from '../components/Clase'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-2">
                <Switch>                    
                    <Route component={CourseList} exact path="/courselist"></Route>
                    <Route component={Materias} exact path="/materias"></Route>
                    <Route component={Profesors} exact path="/profesors"></Route>
                    <Route component={Roles} exact path="/roles"></Route>
                    <Route component={Clase} exact path="/selectSemestre"></Route>
                    
                    <Redirect to='/courselist'/>
                </Switch>
            </div>
        </>
    )
}
