import React, { useState } from 'react';
import {  Route, useNavigate } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {

const navigate = useNavigate()
  const [isAuthenticated ,setIsAuthenticated] = useState(false)
const user = localStorage.getItem('sb-narivuecshkbtcueblcl-auth-token') 

if (user !== null) {
    isAuthenticated(true)
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
