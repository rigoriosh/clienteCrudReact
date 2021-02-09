import React, { useEffect, useReducer } from 'react'
import './App.css'
import { AuthReducer } from './auth/AuthReducer';
import { AppRouter } from './routers/AppRouter';
import {AuthContext} from './auth/AuthContext';

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || {logged: false}
}

export const App = () => {
  const [user, dispatch] = useReducer(AuthReducer, {}, init)
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    
  }, [user])

  return (
    
      <AuthContext.Provider value={{user, dispatch}}>
        <AppRouter/>
      </AuthContext.Provider>
  )
}

