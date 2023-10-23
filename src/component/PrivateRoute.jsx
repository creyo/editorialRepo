import React from 'react';
import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {
  
const isAuthenticated = localStorage.getItem('sb-narivuecshkbtcueblcl-auth-token') 

if (isAuthenticated !== null) {
  // User is authenticated
  console.log('User is authenticated');
} else {
  // User is not authenticated
  console.log('User is not authenticated');
}


  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
