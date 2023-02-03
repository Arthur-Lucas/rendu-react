import React, { useState } from 'react'

export default function IngredientPicker({ setIngredients, ingredients, data }) {

    
    
    const [select, setSelect] = useState('')

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

  return (
    <div>
        <input onChange={addIngredient}  className='border border-black' list="ingredients" name='ingredient' value={select} />
        <datalist id='ingredients'>
            <option value="Search for an ingredient (ex: apple)"></option>
            {data.map(ingredient => {
                return <option key={ingredient.id} value={ingredient.name} />
            })}
        </datalist>
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
  )
}
