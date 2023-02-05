import React, { useEffect, useState } from 'react';

export default function Navbar(){

    var timeout = 0;

    const [data, setData] = useState(null);

    const [filter, setFilter] = useState('complexSearch');

    const [minCarbs, setMinCarbs] = useState('1');
    const [maxCarbs, setMaxCarbs] = useState('');

    const [inputText, setInputText] = useState('');

    const handleChange = (e) => {
        //debounce
        e.preventDefault();
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            setInputText(e.target.value);
        }, 500);
        
    }

    const handleChangeminCarbs = (e) => {
        e.preventDefault();
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            if(maxCarbs == '' || e.target.value <= maxCarbs){
                setMinCarbs(e.target.value);
            } else {
                setMinCarbs('1')
            }
           
        }, 700);
    }

    const handleChangemaxCarbs = (e) => {
        e.preventDefault();
        clearTimeout(timeout)
        console.log(minCarbs)
        timeout = setTimeout(() => {
            if(e.target.value >= minCarbs){
                
        console.log(minCarbs + '2')
                setMaxCarbs(e.target.value);

            } else {
                setMaxCarbs('')
            }
           
        }, 700);
    }

    useEffect(() => {
        const fetchData = async () => {
            var response = null
        if(filter === 'complexSearch'){
            console.log(filter)
            response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=31708597a5a041d896c31ed8b6e53dfa&query=' + inputText);
        }
        else if(filter === 'findByNutrients'){
            response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=31708597a5a041d896c31ed8b6e53dfa&minCarbs=' + minCarbs + (maxCarbs != '' ? '&maxCarbs=' + maxCarbs : ''));
        }
        else if(filter === 'findByIngredients'){
            response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=31708597a5a041d896c31ed8b6e53dfa&ingredients=apples');
        }
        const json = await response.json();
        setData(json);
        }; 
        fetchData(); 
    }, [inputText, filter, minCarbs, maxCarbs]);
    
    return (
        <div className='flex  flex-col items-center w-1/1'>  
        <div className='flex flex-row w-full items-center justify-center'>
            {/* textboxrecherche */}
            {filter === 'complexSearch' ? (
                <div className='w-1/4'>
                    <input className='w-full border-2 border-gray-300 rounded-lg p-2' onChange={handleChange} placeholder='Recherche'></input>
                </div>
            )
            :
            (<>
                {filter === 'findByNutrients' ? (
                    <div className='w-1/4'>
                        <input type="number"  className='w-full border-2 border-gray-300 rounded-lg p-2' onChange={handleChangeminCarbs} min='1' max={maxCarbs != '' ? maxCarbs : null} placeholder='minCarbs'></input>
                        <input type="number" className='w-full border-2 border-gray-300 rounded-lg p-2' onChange={handleChangemaxCarbs} min={minCarbs != '' ? minCarbs : null} placeholder='maxCarbs'></input>
                    </div>
                ) 
                : 
                (
                    <div className='w-1/4'>
                    <input className='w-full border-2 border-gray-300 rounded-lg p-2' onChange={handleChange} placeholder='Recherche'></input>
                </div>
                )}
            </>)
            }
            
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