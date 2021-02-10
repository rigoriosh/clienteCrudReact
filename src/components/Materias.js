import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { urls } from '../urls/urls';
import { useForm } from '../hooks/useForm';

export const Materias = () => {

    const [profes, setprofes] = useState([]);
    const [materias, setmaterias] = useState([])

    useEffect(() => {
        traerProfes();
        traerMaterias();
    }, [])

    const traerProfes = ()=>{
        Axios.get(`${urls.server}getProfes`)
        .then(resp => {
            console.log(resp);
            (resp.data !== '') ? setprofes(resp.data): setprofes([]);
        })
    }

    const [{nombre_materia}, handledInputChange, resetFields] = useForm({nombre_materia: '', creditos_materia: ''});
    const [idprofesors, setidprofesors] = useState('');

    const traerMaterias = ()=>{
        Axios.get(`${urls.server}getMaterias`)
        .then(resp => {
            console.log(resp);
            (resp.data !== '') ? setmaterias(resp.data): setmaterias([]);
        })
    }

    const submit = (e)=>{
        e.preventDefault()
        console.log(nombre_materia, idprofesors);
        if (!nombre_materia && !idprofesors) {
            alert('Please all fields are necesary')
        } else {            
            Axios.post(`${urls.server}addMaterias`, {idprofesors:parseInt(idprofesors), nombre_materia, creditos_materia:3})
            .then((resp)=>{
                if (resp.data.message) {
                    alert(resp.data.message);
                }
                resetFields();
                traerMaterias();
                traerProfes();
            });
        }
    }

    const getNameTeacher = (id)=>{
        let nameTeacher = ''
        profes.forEach(p => {            
            if(p.idteachers === id) nameTeacher = `${p.nombre_profesor} ${p.apellido_profesor}`;
        }) 
        return nameTeacher
    }

    return (
        <div style={{border: '2px solid black', textAlign: 'center'}}>
            <h3>Adicionar Materias</h3>
            <hr/>
            <form onSubmit={submit}>
                <label htmlFor="">Nombre de la materia</label>
                <br/>
                <input type="text" placeholder="Materia name..." 
                    name="nombre_materia" value={nombre_materia} onChange={handledInputChange}/>
                <hr/>
                {/* <label htmlFor="">Creditos de la materia</label>
                <br/>
                <input type="number" placeholder="Materia credit..." 
                    name="creditos_materia" min='0' maxLength='1' value={creditos_materia} onChange={handledInputChange}/>
                    <hr/> */}
                <label htmlFor="">Profesor que dictará la materia</label>
                <br/>
                <select onChange={s => setidprofesors(s.target.value)}>
                    <option value="select...">Select...</option>
                    {
                        profes.map(({idteachers, nombre_profesor, apellido_profesor, profesion}) => {
                            return <option key={idteachers} value={idteachers}>
                                {`${nombre_profesor} ${apellido_profesor} - ${profesion}`}</option>
                        })
                    }                    
                </select>
                <hr/>
                <button type="submit" className="btn btn-primary" >
                    Agregar
                </button>
            </form>
            <h3>Materias existentes</h3>
            {
                materias.map(({idmaterias, nombre_materia, idteachers}) => {
                    return (
                        <div key={idmaterias}>
                            <h4>{nombre_materia}, Profesor: {getNameTeacher(idteachers)}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}
