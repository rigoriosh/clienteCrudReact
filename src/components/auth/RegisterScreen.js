import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { urls } from '../../urls/urls';
import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';

export const RegisterScreen = ({history}) => {
    
    const {user, dispatch} = useContext(AuthContext);        
    const [fields, handledInputChange, resetFields] = useForm({nombre: '',password: '', confirPassword:'', email: ''});
    const {nombre, password, confirPassword, email} = fields;
        
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(nombre, email, password, confirPassword)
        if(nombre && email && password && confirPassword && password === confirPassword){           
            console.log('handleLogin', `${urls.server}register`);
            
            Axios.post(`${urls.server}register`, {username: nombre, password, email})
            .then((resp) => {
                console.log("register ok", resp);
                const lastPath = localStorage.getItem('lastPath') || '/'
                dispatch({
                    type: types.login,
                    payload: {name: nombre, email}
                })
                history.replace(lastPath);
                resetFields();
            })            
        }
    }  
    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username..." 
                    name="nombre" value={nombre} onChange={handledInputChange}/>
                

                <input type="email" placeholder="email" className="auth__input"
                    name="email" value={email} onChange={handledInputChange}/>

                <input type="password" placeholder="password..." 
                    name="password" value={password} onChange={handledInputChange}/>

                <input type="password" placeholder="confirm Password" className="auth__input"
                    name="confirPassword" value={confirPassword} onChange={handledInputChange}/>

                <button type="submit" className="btn btn-primary btn-block mb-5"
                    disabled={false} >Register</button>
                
                
                <Link to="/auth/login" className="link">Already Register?</Link>
            </form>
        </>
    )
}
