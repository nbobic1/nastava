import { useAtom } from 'jotai';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogedinState } from '../atoms';

const ProtectedRoute = ({ children }) => {
	//const token = localStorage.getItem('token');
    const isLogedin=localStorage.getItem('isLogedin')==='true'
	return (isLogedin? children : <Navigate to='/login' />);
};

export default ProtectedRoute;