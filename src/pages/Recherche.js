import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";


export default function Navbar(){



    const [data, setData] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //     //const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=160c6021f73643b18ba7e0ad4b916643');
    //     const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=9185b4dc4ec64b1bbd9055313ecf227c');
    //     const json = await response.json();
    //     setData(json);
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className='flex justify-evenly  w-1/1'>   
        <table >
            <thead>
                <td></td>
                <td>Titre</td>
            </thead>
            <tbody>
                
                {data && data.results && data.results.map((repas) =>{
                    return(
                        <tr  key={repas.id}>
                            <td className='w-24'><img src={repas.image}></img></td>
                            <td>{repas.title}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}