import React, { useEffect, useState } from 'react';
import getIngredients from '../utils/getIngredients';
import IngredientPicker from '../components/Ingredients/IngredientPicker';

export default function Navbar(){

    var timeout = 0;

    const [data, setData] = useState([]);

    const [listIngredients, setListIngredients] = useState(null);

    const [ingredients, setIngredients] = useState([]);

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
            if(maxCarbs == '' || e.target.value <= Number(maxCarbs)){
                setMinCarbs(e.target.value);
            } else {
                setMinCarbs('1')
            }
           
        }, 1500);
    }

    const handleChangemaxCarbs = (e) => {
        e.preventDefault();
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            if(e.target.value >= Number(minCarbs)){
                
                setMaxCarbs(e.target.value);

            } else {
                setMaxCarbs('')
            }
           
        }, 1500);
    }

    // 7924ce9a31634a24b50f584ec8ea8b86
    // 9185b4dc4ec64b1bbd9055313ecf227c
    useEffect(() => {
        const fetchData = async () => {
            var response = null
        if(filter === 'complexSearch'){
            response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=7924ce9a31634a24b50f584ec8ea8b86&query=' + inputText);
        }
        else if(filter === 'findByNutrients'){
            response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=7924ce9a31634a24b50f584ec8ea8b86&minCarbs=' + minCarbs + (maxCarbs != '' ? '&maxCarbs=' + maxCarbs : ''));
        }
        else if(filter === 'findByIngredients'){
            if(ingredients.length > 0){
                 response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=7924ce9a31634a24b50f584ec8ea8b86&ingredients=' + ingredients.map((ingredient) => {
                    return (
                        '+' + ingredient.name
                    )
                 }));
            }
            
            getIngredients().then(output => {
                setListIngredients(output)
            })
        }
        const json = await response.json();
        setData(json);
        }; 
        fetchData(); 
    }, [inputText, filter, minCarbs, maxCarbs, ingredients]);
    
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
                        <IngredientPicker setIngredients={setIngredients} ingredients={ingredients} data={listIngredients} />
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
            
            
            {data ? (
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
            ) : (<p>
                Aucun résultat à la recherche
            </p>)}
        </div>
    )
}