
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { UserContext } from '../Context/userContext';



export default function Navbar(){

    const {toggleModals, currentUser, signOutUser} = useContext(UserContext);

    return (
        <div className='flex justify-evenly font-bold w-1/1'>
            <Link  to={{ pathname: `/search`}}>Search</Link>
            {currentUser ? 
            (<>
                <button onClick={(e) => signOutUser(e)}>Disconnect</button>
            </>) 
            : 
            (<>
                <button onClick={() => toggleModals("signUp")}>Sign Up</button>
                <button onClick={() => toggleModals("signIn")}>Sign In</button>
            </>)}
            
            
        </div>
    )
}