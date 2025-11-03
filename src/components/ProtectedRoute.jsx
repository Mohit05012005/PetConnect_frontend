import React from 'react'
import Login from '../pages/Login';

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    
  return token?children:<Login/>
}

export default ProtectedRoute
