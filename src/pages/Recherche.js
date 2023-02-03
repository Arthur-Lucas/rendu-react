import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){

    var timeout = 0;

    const navigate = useNavigate();

    const [data, setData] = useState(null);

   const [repas, setRepas] = useState([])

    const [inputText, setInputText] = useState('');

    const handleChange = (e) => {
        //debounce
        e.preventDefault();
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            setInputText(e.target.value);
           
        }, 500);
    }
    const handleClick = (e,id) => {
        navigate("/recipe/"+id)
    }

    useEffect(() => {
        

        const fetchData = async () => {
        const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=da4b285dcb7a4107a9e06bd23c3752b0&query=' + inputText);
        const json = await response.json();
        setData(json);
        }; 
        fetchData(); 
    }, [inputText]);
    
    return (
        <div className='flex  flex-col items-center w-1/1'>  
        <div className='flex flex-row w-full items-center justify-center'>
            {/* textboxrecherche */}
            <div className='w-1/4'>
                <input className='w-full border-2 border-gray-300 rounded-lg p-2' onChange={handleChange} placeholder='Recherche'></input>
            </div>
            <div className='w-1/4'>
                <select placeholder='Catégorie' className=' border-2 border-gray-300 rounded-lg p-2'>
                    <option value='complexSearch'>Search by recipes</option>
                    <option value=''></option>
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
                        <td><img className='w-24' src='https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg' /></td>
                        <td>Repas</td>
                    </tr>
                    {data && data.results && data.results.map((repas) =>{
                        return(
                            <tr onClick={(e) =>  handleClick(e,repas.id)}  key={repas.id}>
                                <td className='w-24'><img src={repas.image}/></td>
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