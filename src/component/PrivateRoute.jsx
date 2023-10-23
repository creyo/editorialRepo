import React from 'react';
import {  Route, useNavigate } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {
    const navigate = useNavigate()
  
const isAuthenticated = localStorage.getItem('sb-narivuecshkbtcueblcl-auth-token') 

if (isAuthenticated !== null) {
  // User is authenticated
  console.log('User is authenticated');
} else {
  navigate("/login")
}


  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
