import React from 'react'
import RecipeItem from './RecipeItem'

export default function RecipeList(recipes) {
  return (
    <div className='flex flex-col gap-y-10'>
        {recipes.recipes.map((recipe, id) => (
          <RecipeItem key={id} data={recipe} />
        ))}
    </div>
  )
}
