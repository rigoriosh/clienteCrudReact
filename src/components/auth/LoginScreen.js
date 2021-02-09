import React from 'react'
import { Link } from 'react-router-dom';


export const LoginScreen = ({history}) => {    


    

    return (
        <div className="container mt-5 login">
            <h3>LoginScreen</h3>
            <hr/>
            <h1>Quede en esta vista</h1>
            <button className="btn btn-primary" >
                Login
            </button>
            <br/>
            <Link to="/register" className="link">Create new account</Link>
        </div>
    )
}
