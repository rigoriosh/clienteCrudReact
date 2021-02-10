import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { urls } from '../urls/urls';

export const Roles = () => {

    const [users, setusers] = useState([]);
    const [roles, setroles] = useState([]);
    const [idRol, setidRol] = useState();

    useEffect(() => {
        getUsers();
        getRoles();
    }, [])

    const getRoles = ()=>{
        Axios.get(`${urls.server}getRoles`)
        .then(resp => {
            console.log(resp);
            (resp.data !== '') ? setroles(resp.data): setroles([]);
        })
    }


    const getUsers = ()=>{
        Axios.get(`${urls.server}getUsers`)
        .then(resp => {
            console.log(resp);
            (resp.data !== '') ? setusers(resp.data): setusers([]);
        })
    }
    const upDate = (idusers)=>{
        
        if (!idRol) {
            alert('Please all fields are necesary')
        } else {
            console.log(`${urls.server}updateUserRol`);
            Axios.put(`${urls.server}updateUserRol`, {idusers:parseInt(idusers), idRol:parseInt(idRol)})
                .then((resp)=>{
                    if (resp.data.message) {
                        console.log(resp.data.message);                       
                    }                    
                    getUsers();
                });  
            
            setidRol();
        }
    }
    const getRolById = (rol) => {
        if(!rol) return 'Sin Rol asignado'
        let nameRol = '';
        roles.forEach(r =>{
            if(r.idroles === rol) nameRol = r.nombre_rol;            
        })        
        return nameRol;
    }
    return (
        <div>
            <h4>Asignar Roles</h4>
            <hr/>
            {
                users.map(({idusers, username, email, rol}) => {
                    return (
                        <div key={idusers}>
                            <div className="row" style={{alignItems: 'center', border: '1px solid', marginBottom:'2px'}}>
                                <div className="col"><h5>{username}</h5><h6>Rol: {getRolById(rol)}</h6></div>
                                <div className="col">
                                    <select id={`'${idusers}'`} onChange={s => setidRol(s.target.value)}>
                                        <option value="select...">Select...</option>
                                            {
                                                roles.map(({idroles, nombre_rol}) => {
                                                    return <option key={idroles} value={idroles}>
                                                        {nombre_rol}
                                                    </option>
                                                })
                                            }                            
                                </select>
                                <button className="btn btn-outline-dark btn-sm" onClick={()=>{                                    
                                    upDate(idusers);
                                    const a = document.getElementById(`'${idusers}'`);
                                    a.value = "select...";
                                }}>Update</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
