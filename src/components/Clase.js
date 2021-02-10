import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../auth/AuthContext';

export const Clase = () => {


    const {user, dispatch} = useContext(AuthContext); 


    useEffect(() => {
       console.log(user)
    }, [])


    return (
        <>
            Clase
        </>
    )
}
