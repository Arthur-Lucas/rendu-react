import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Api from './Api';
import Recherche from './pages/Recherche';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Api />
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route name="home" path='/' element={<Home/>}></Route> */}
        <Route name="search" path='/search' element={<Recherche/>}></Route>
      </Routes>
  </BrowserRouter>
  </>
);
