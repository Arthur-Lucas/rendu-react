import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Recherche from './pages/Recherche';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { UserContextProvider } from './Context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
    <UserContextProvider>
      
      <SignUp />
      <SignIn />
      <Navbar />
      <Routes>
        <Route name="search" path='/search' element={<Recherche/>}></Route>
        <Route name="signup" path='/signup' element={<SignUp/>}></Route>
        <Route name="signin" path='/signin' element={<SignIn/>}></Route>
      </Routes>
    </UserContextProvider>
  </BrowserRouter>
  </>
);
