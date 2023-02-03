import React, { useEffect, useState } from 'react'
import getIngredients from '../utils/getIngredients'
import IngredientPicker from '../components/Ingredients/IngredientPicker'

export default function Leftovers() {

    const [data, setData] = useState([])
    const [ingredients, setIngredients] = useState([])
    
    useEffect(() => {
        getIngredients().then(output => {
          setData(output)
        })
      }, [])

  return (
    <div className='container px-4'>
        <h1>Leftovers</h1>
        <IngredientPicker setIngredients={setIngredients} ingredients={ingredients} data={data} />
    </div >
  )
}
