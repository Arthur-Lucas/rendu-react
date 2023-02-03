import React, { useEffect, useState } from 'react'
import getIngredients from '../utils/getIngredients'
export default function Leftovers() {

    const [data, setData] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [select, setSelect] = useState('')


    
    useEffect(() => {
        getIngredients().then(output => {
          setData(output)
        })
      }, [])

    const addIngredient = (e) => {
        const foundIngredient = data.find(ingredient => ingredient.name === e.target.value)
        if (foundIngredient) {
            if (!ingredients.includes(foundIngredient)){
                setSelect('')
                setIngredients([...ingredients, foundIngredient])
            }
        } else {
            setSelect(e.target.value)
        }
    }

    const removeIngredient = (e) => {
        const filteredIngredients = ingredients.filter(ingredient => ingredient.id !== e.target.value)
        setIngredients(filteredIngredients)
    }

    const searchRecipes = () => {
        if (ingredients.length > 0) {
            
        }
    }

  return (
    <div className='container px-4'>
        <h1>Leftovers</h1>
        <input onChange={addIngredient}  className='border border-black' list="ingredients" name='ingredient' value={select} />
        <datalist id='ingredients'>
            <option value="Search for an ingredient (ex: apple)"></option>
            {data.map(ingredient => {
                return <option key={ingredient.id} value={ingredient.name} />
            })}
        </datalist>
        <div>
            <h2>Selected :</h2>
            <ul>
                {ingredients.map(ingredient => {
                    return (
                    <li key={ingredient.id}>
                        {ingredient.name}
                        <button className='border border-black' onClick={removeIngredient} value={ingredient.id}>Remove</button>
                    </li>
                    )
                })}
            </ul>
        </div>
        <button onClick={searchRecipes}>Search</button>
    </div >
  )
}
