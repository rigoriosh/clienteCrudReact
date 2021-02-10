import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm';
import Axios from 'axios';
import { urls } from '../urls/urls';

export const Profesors = () => {

    const [fields, handledInputChange, resetFields] = useForm({nombre_profesor: '', apellido_profesor: '', profesion: ''});
    const {nombre_profesor, apellido_profesor, profesion} = fields;

    const [profes, setprofes] = useState([]);


    useEffect(() => {
        traerProfes();
    }, [])

    const traerProfes = ()=>{
        Axios.get(`${urls.server}getProfes`)
        .then(resp => {
            console.log(resp);
            (resp.data !== '') ? setprofes(resp.data): setprofes([]);
        })
    }


    const submit = (e)=>{
        e.preventDefault();
        if(!nombre_profesor && !apellido_profesor && !profesion){
            alert('please all fields must be complete');
        }else{
            console.log(nombre_profesor, apellido_profesor, profesion);
            Axios.post(`${urls.server}addProfessor`, {nombre_profesor, apellido_profesor, profesion})
            .then((resp) => {
                console.log("register ok", resp);
                if (resp.data.message) {
                    alert(resp.data.message);
                }
                resetFields();
                traerProfes();
            });
        }
    }
    return (
        <div>
            <h4> Add Professors </h4>
            <form onSubmit={submit}>
                <input type="text" placeholder="Name..." 
                    name="nombre_profesor" value={nombre_profesor} onChange={handledInputChange}/>
                <input type="text" placeholder="Last Name..." 
                    name="apellido_profesor" value={apellido_profesor} onChange={handledInputChange}/>
                <input type="text" placeholder="Profession..." 
                    name="profesion" value={profesion} onChange={handledInputChange}/>

                <button type="submit" className="btn btn-primary" >
                    Add
                </button>
            </form>
            <h3>Profesores actuales</h3>
            {
                profes.map((e, i) => {
                    return <div key={e.idteachers}>
                        <h4>{i + 1}. {e.nombre_profesor} {e.apellido_profesor} {e.profesion}</h4>
                    </div>
                })
            }
        </div>
    )
}
