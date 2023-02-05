import React, { useEffect, useState } from 'react'

export default function IngredientPicker({ setIngredients, ingredients, data }) {

    
    
    const [select, setSelect] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const [showDatalist, setShowDatalist] = useState(false)

    

    const addIngredient = (result) => {
        const newIngredient = data.find(ingredient => ingredient.id === result)
        setIngredients([...ingredients, newIngredient])
        setSelect('')
    }

    const removeIngredient = (e) => {
        const filteredIngredients = ingredients.filter(ingredient => ingredient.id !== e.target.value)
        setIngredients(filteredIngredients)
    }

    useEffect(() => {
        if (select.length > 0) {
            const results = data.filter(ingredient => ingredient.name.toLowerCase().includes(select.toLowerCase()))
            setQueryResults(results)
        } else {
            setQueryResults([])
        }
    }, [select])

  return (
    <div>
        <div className='relative'>
            <input onChange={(e) => setSelect(e.target.value)} onFocus={() => {setShowDatalist(true)}} className='border border-[#7A835E]' type="text" name='ingredient' value={select} />
            {showDatalist && queryResults.length != 0 && (
                <ul className='flex flex-col absolute divide-y border border-black h-28 overflow-y-auto top-full left-0 bg-white'>
                {showDatalist && queryResults.map(result => {
                    return (
                        // <li onClick={ () => {addIngredient(result.id) } } className='hover:bg-slate-300 cursor-pointer' key={result.id}  >
                        //     {result.name}
                        // </li>
                        <a onClick={ () => {addIngredient(result.id) } } className='hover:bg-slate-300 cursor-pointer' key={result.id}  >
                            {result.name}
                        </a>
                    )
                })}
            </ul>
            )}
        </div>
        
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
