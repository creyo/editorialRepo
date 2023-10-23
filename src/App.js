import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import HomePage from './component/HomePage';
import FormPage from './component/FormPage';
import Updatearticle from './component/Updatearticle';
import SignUp from './component/SignUp';
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <PrivateRoute path="/" element={<HomePage />} />
          <PrivateRoute path="/addarticle/:publicationId/:postTypeId" element={<FormPage />} />
          <PrivateRoute path="/updatearticle/:articleId" element={<Updatearticle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
