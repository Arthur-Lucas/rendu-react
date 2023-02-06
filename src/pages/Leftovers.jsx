import React, { useEffect, useState } from 'react'
import getIngredients from '../utils/getIngredients'
import IngredientPicker from '../components/Ingredients/IngredientPicker'
import RecipeList from '../components/Recipes/RecipeList'

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

    
    // Store parameters
    const [diet, setDiet] = useState([])   


    // Store results
    const [recipes, setRecipes] = useState([])

    const fetchData = async () => {
            
        let filters = "";
        if (diet.length !== 0) {
            filters += `&diet=${diet.join("|")}`;
        }
        if (ingredients.length !== 0) {
            filters += '&sort=min-missing-ingredients'
            filters += `&includeIngredients=${ingredients.map((ingredient) => encodeURIComponent(ingredient.name)).join(",")}`;
        }
        console.log(filters)
        fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=5e6cdf61b5ab4a3489d33fb775485c74&addRecipeInformation=true' + filters)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setRecipes(data.results)
            })
        
    }

    // Fetch results
    useEffect(() => {
        // Construct filters string if there are filters for diet and/or ingredients
        fetchData()
    }, [diet, ingredients])


  return (
    <div className='container w-full h-full px-4'>
            <h1>Leftovers</h1>
            <IngredientPicker setIngredients={setIngredients} ingredients={ingredients} data={data} diet={diet} setDiet={setDiet} />
            <div>
                Results :
                {recipes.length !== 0 && (
                    <div>
                        {
                            recipes.length !== 0 && <RecipeList recipes={recipes} />
                        }
                    </div>)
                        }
            </div>
        <div>
        </div>
    </div >
  )
}
