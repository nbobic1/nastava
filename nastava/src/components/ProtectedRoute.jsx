import { useAtom } from 'jotai';
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({p, children }) => {
	//const token = localStorage.getItem('token'); 
    const isLogedin=localStorage.getItem('isLogedin')==='true'
	const isProfesor=localStorage.getItem('role')==='Profesor'
	if(p)
	return (isLogedin&&isProfesor? children : <Navigate to='/login' />);
	else
	return (isLogedin? children : <Navigate to='/login' />);
};

export default ProtectedRoute;