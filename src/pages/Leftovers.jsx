import React, { useEffect, useState } from 'react'
import getIngredients from '../utils/getIngredients'
import IngredientPicker from '../components/Ingredients/IngredientPicker'

export default function Leftovers() {


    // Fetch ingredients from CSV file
    const [data, setData] = useState([])
    useEffect(() => {
        getIngredients().then(output => {
            setData(output)
        })
    }, [])

    // Store selected ingredients
    const [ingredients, setIngredients] = useState([])
    
  return (
    <div className='container px-4'>
        <h1>Leftovers</h1>
        <IngredientPicker setIngredients={setIngredients} ingredients={ingredients} data={data} />
        
        <div>
        </div>
    </div >
  )
}
