import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Recherche from './pages/Recherche';
import Home from './pages/Home';
import Leftovers from './pages/Leftovers';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Recipe from './pages/Recipe';
import Converter from './components/Converter';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Navbar />
      <Converter />
      <Routes>
        <Route name="search" path='/search' element={<Recherche/>}></Route>
        <Route name="home" path='/' element={<Home/>}></Route>
        <Route name="leftovers" path='/leftovers' element={<Leftovers/>}></Route>
        <Route name="recipe" path='/recipe/:id' element={<Recipe/>}></Route>
      </Routes>
  </BrowserRouter>
  </>
);
