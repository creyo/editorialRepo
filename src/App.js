
import './App.css';
import React,{useState} from 'react';
import FormPage from './component/FormPage';
import HomePage from './component/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Updatearticle from './component/Updatearticle';

function App() {
  const [selectedPublicationId, setSelectedPublicationId] = useState(null);
  const [selectedPostTypeId, setSelectedPostTypeId] = useState(null);

  const handleOnChange = ({ selectedPublicationId, selectedPostTypeId }) => {
    setSelectedPublicationId(selectedPublicationId);
    setSelectedPostTypeId(selectedPostTypeId);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage onchange={handleOnChange} />} />
          <Route path="/addarticle" element={<FormPage
        selectedPublicationId={selectedPublicationId}
        selectedPostTypeId={selectedPostTypeId}
      />} />
      <Route path='/updatearticle/:articleId'  element={<Updatearticle/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
