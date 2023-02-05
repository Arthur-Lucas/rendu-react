import React, { useContext, useEffect, useState } from 'react';

import getIngredients from '../utils/getIngredients';
import IngredientPicker from '../components/Ingredients/IngredientPicker';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';


export default function Navbar(){

    var timeout = 0;

    const { apiKey } = useContext(UserContext);
    const [data, setData] = useState([]);

    const [listIngredients, setListIngredients] = useState(null);

    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate();


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
    const handleClick = (e,id) => {
        navigate("/recipe/"+id)
    }


        


    const handleChangeminCarbs = (e) => {
        e.preventDefault();
        clearTimeout(timeout)
        timeout = setTimeout(() => {
                setMinCarbs(e.target.value);
           
           
        }, 700);
    }

    const handleChangemaxCarbs = (e) => {
        e.preventDefault();
        
        clearTimeout(timeout)
        timeout = setTimeout(() => {
                setMaxCarbs(e.target.value);

           
        }, 700);
    }

    // 7924ce9a31634a24b50f584ec8ea8b86

    // c9ac5e1b5ca9448fb5cf775c71b4aeb1
    // 9185b4dc4ec64b1bbd9055313ecf227c


    // requete API 
    useEffect(() => {
        const fetchData = async () => {
            var response = []
        if(filter === 'complexSearch'){
            response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=' + apiKey + '&query=' + inputText);
        }
        else if(filter === 'findByNutrients'){
            if(minCarbs != '' || maxCarbs != ''){

                if(minCarbs != '' && maxCarbs != '' && Number(minCarbs) > Number(maxCarbs)){
                    response = null
                }
                else {
                    response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=' + apiKey + (minCarbs != '' ? '&minCarbs=' + minCarbs : '') + (maxCarbs != '' ? '&maxCarbs=' + maxCarbs : ''));
                }
                

            }
            else {
                response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=' + apiKey + '&minCarbs=1');
            }

        }
        else if(filter === 'findByIngredients'){
            if(ingredients.length > 0){
                 response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=' + apiKey + '&ingredients=' + ingredients.map((ingredient) => {
                    return (
                        '+' + ingredient.name
                    )
                 }));
            }
            else {
                response = await fetch('https://api.spoonacular.com/recipes/' + filter + '?apiKey=' + apiKey);
            }
            
            getIngredients().then(output => {
                setListIngredients(output)
            })
        }
        var json = null;
        if(response){
            json = await response.json();  
        } else {
            json = {};
        }
        
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
            
            {/* Si la recherche n'est pas vide */}
            {data != null && (data.length > 0 || (data.results && data.results.length > 0))? (
            <table >
                <thead>
                    <tr>
                        
                    <td></td>
                    <td>Titre</td>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td><img className='w-24' src='https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg' /></td>
                        <td>Repas</td>
                    </tr> */}
                    {data && data.results && data.results.map((repas) =>{
                        return(
                            <tr onClick={(e) =>  handleClick(e,repas.id)}  key={repas.id}>
                                <td className='w-24'><img src={repas.image}/></td>
                                <td>{repas.title}</td>
                            </tr>
                        )
                    })}
                    {data && !data.results && data.map((repas) =>{
                        return(
                            <tr onClick={(e) =>  handleClick(e,repas.id)}  key={repas.id}>
                                <td className='w-24'><img src={repas.image}></img></td>
                                <td><p>{repas.title}</p>{repas.unusedIngredients && repas.unusedIngredients.length > 0 ? ('Unused ingredient : ' + repas.unusedIngredients.map((ingr) => {return (ingr.name + ',')})) : ''}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            ) : (<p>
                Aucun résultat ne correspond à la recherche
            </p>)}
        </div>
    )
}