
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { UserContext } from '../Context/userContext';



export default function Navbar(){

    const {toggleModals, currentUser, signOutUser} = useContext(UserContext);

    return (
        
        <div className='Nav h-32 items-center flex justify-evenly font-bold w-1/1'>
            <h1 className="Logo text-3xl">Green <span className="LogoSpan">Cookbook</span></h1>
            <div className='flex gap-8 text-xl font-semibold Logo'>
                <Link  to={{ pathname: `/`}}>Receipes</Link>
                <Link  to={{ pathname: `/search`}}>Research</Link>
                <Link  to={{ pathname: `/`}}>My favs !</Link>
                <Link  to={{ pathname: `/`}}>Any left overs ?</Link>
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
        </div>
    )
}