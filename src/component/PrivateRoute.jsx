import React from 'react';
import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('sb-narivuecshkbtcueblcl-auth-token');

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
