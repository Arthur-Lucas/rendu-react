import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Recherche from './pages/Recherche';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Converter from './components/Converter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Navbar />
      <Converter />
      <Routes>
        <Route name="search" path='/search' element={<Recherche/>}></Route>
      </Routes>
  </BrowserRouter>
  </>
);
