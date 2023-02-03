
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { UserContext } from '../Context/userContext';



export default function Navbar(){

    const {toggleModals} = useContext(UserContext);

    const {currentUser} = useContext(UserContext);
    console.log(currentUser)

    return (
        <div className='flex justify-evenly font-bold w-1/1'>
            <Link  to={{ pathname: `/search`}}>Recherche</Link>
            <button onClick={() => toggleModals("signUp")}>Sign Up</button>
            
        </div>
    )
}