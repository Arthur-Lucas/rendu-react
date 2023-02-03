import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";


export default function Navbar(){

    var timeout = 0;

    const [data, setData] = useState(null);

    const [filter, setFilter] = useState('complexSearch')

    const [inputText, setInputText] = useState('');

    const handleChange = (e) => {
        //debounce
        e.preventDefault();
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            setInputText(e.target.value);
           
        }, 500);
        
    }

    useEffect(() => {
        console.log(filter);
        const fetchData = async () => {
            var response = null
        if(filter === 'complexSearch'){
            console.log(filter)
            response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=160c6021f73643b18ba7e0ad4b916643&query=' + inputText);
        }
        else if(filter === 'findByNutrients'){
            response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=160c6021f73643b18ba7e0ad4b916643&minCarbs=10');
        }
        else if(filter === 'findByIngredients'){
            response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=160c6021f73643b18ba7e0ad4b916643&ingredients=apples');
        }
        const json = await response.json();
        setData(json);
        console.log(data && data.results)
        }; 
        fetchData(); 
    }, [inputText, filter]);
    
    return (
        <div className='flex  flex-col items-center w-1/1'>  
        <div className='flex flex-row w-full items-center justify-center'>
            {/* textboxrecherche */}
            <div className='w-1/4'>
                <input className='w-full border-2 border-gray-300 rounded-lg p-2' onChange={handleChange} placeholder='Recherche'></input>
            </div>
            <div className='w-1/4'>
                <select placeholder='Catégorie' onChange={(event) => setFilter(event.target.value)} className=' border-2 border-gray-300 rounded-lg p-2'>
                    <option value='complexSearch'>Find by recipes</option>
                    <option value='findByNutrients'>Find by Nutritients</option>
                    <option value='findByIngredients'>Find by ingredients</option>
                </select>
            </div>
        </div>
            
            
            {/* {data && data.results ? ( */}
            <table >
                <thead>
                    <tr>
                        
                    <td></td>
                    <td>Titre</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img className='w-24' src='https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg'></img></td>
                        <td>Repas</td>
                    </tr>
                    {data && data.results && data.results.map((repas) =>{
                        return(
                            <tr  key={repas.id}>
                                <td className='w-24'><img src={repas.image}></img></td>
                                <td>{repas.title}</td>
                            </tr>
                        )
                    })}
                    {data && !data.results && data.map((repas) =>{
                        return(
                            <tr  key={repas.id}>
                                <td className='w-24'><img src={repas.image}></img></td>
                                <td>{repas.title}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/*  ) : (<></>)} */}
        </div>
    )
}