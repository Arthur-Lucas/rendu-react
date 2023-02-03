import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Recherche from './pages/Recherche';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route name="search" path='/search' element={<Recherche/>}/>
        <Route name="home" path='/' element={<Home/>}/>
      </Routes>
  </BrowserRouter>
  </>
);
