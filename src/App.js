import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './component/PrivateRoute';
import Login from './component/Login';
import SignUp from './component/SignUp';
import FormPage from './component/FormPage';
import Updatearticle from './component/Updatearticle';
import HomePage from './component/HomePage';
import NoDataFoundPage from './component/ExtraPage/NoDataFoundPage';
import Logout from './component/Logout';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         { <Route path="/login" element={<Login />} />}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<PrivateRoute Component={HomePage} />} />
          <Route path="/addarticle/:publicationId/:postTypeId" element={<PrivateRoute Component={FormPage} />} />
          <Route path="/updatearticle/:articleId" element={<PrivateRoute Component={Updatearticle} />} />
          <Route path ="/blank" element = {<NoDataFoundPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
