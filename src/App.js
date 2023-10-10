
import './App.css';
import React from 'react';
import FormPage from './component/FormPage';
import HomePage from './component/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Updatearticle from './component/Updatearticle';
import PrivateRoute from './component/PrivateRoute';
import Login from './component/Login';
import SignUp from './component/SignUp';



function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           
          <Route path ="/login" element ={<Login/>} />
          <Route path ="/signup" element ={<SignUp/>} />
         <Route path="/" element={<PrivateRoute Component={HomePage} />} />  
          <Route path="/addarticle/:publicationId/:postTypeId" element={<PrivateRoute Component = {FormPage} />} />
          <Route path='/updatearticle/:articleId' element={ <PrivateRoute Component ={Updatearticle }/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
