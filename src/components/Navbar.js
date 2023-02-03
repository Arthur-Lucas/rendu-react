
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";


export default function Navbar(){
    return (
        <div className='flex justify-evenly font-bold w-1/1'>
            <Link  to={{ pathname: `/search`}}>Recherche</Link>
            <Link to={{pathname: `/signup`}}>Sign Up</Link>
        </div>
    )
}