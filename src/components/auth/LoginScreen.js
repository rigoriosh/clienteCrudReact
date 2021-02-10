import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { urls } from '../../urls/urls';
import Axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';


export const LoginScreen = ({history}) => {  
    
    const [fields, handledInputChange, resetFields] = useForm({username: '', password: ''});
    const {username, password} = fields;
    const {user, dispatch} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(username, password)
        if(username && password){           
            console.log('handleLogin', `${urls.server}login`);
            
            Axios.post(`${urls.server}login`, {username, password})
            .then((resp) => {
                console.log("register ok", resp);
                if (resp.data.message) {
                    alert(resp.data.message);
                } else {
                    const lastPath = localStorage.getItem('lastPath') || '/'
                    dispatch({
                        type: types.login,
                        payload: {name: username}
                    })
                    history.replace(lastPath);
                    resetFields();
                }
            });            
        }
    } 

    return (
        <div className="container mt-5 login">
            <h3>LoginScreen</h3>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username..." 
                    name="username" value={username} onChange={handledInputChange}/>

                <input type="password" placeholder="password..." 
                    name="password" value={password} onChange={handledInputChange}/>

                <button type="submit" className="btn btn-primary" >
                    Login
                </button>
            </form>            
            <br/>
            <Link to="/register" className="link">Create new account</Link>
        </div>
    )
}
