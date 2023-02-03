import React, { useEffect, useState } from 'react';


export default function Navbar(){



    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=539381c9df374031919666304f095371');
        const json = await response.json();
        setData(json);
        };
        fetchData();
    }, []);

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