import React, { useEffect, useState } from 'react'

export default function IngredientPicker({ setIngredients, ingredients, data }) {

    
    
    const [select, setSelect] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const [showDatalist, setShowDatalist] = useState(false)

    

    const addIngredient = (result) => {
        const newIngredient = data.find(ingredient => ingredient.id === result)
        setIngredients([...ingredients, {id: newIngredient.id, name: newIngredient.name, quantity: 1}])
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
    <div className='flex flex-col gap-3'> 
        <div className='relative'>
            <div className='w-full border-2 relative text-base flex border-[#7A835E] bg-[#7A835E]/[.1] rounded-full'>
                <svg className='absolute top-1/2 left-2 -translate-y-1/2' width="16" height="18" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.8 2.03146C7.75783 2.03146 5.79931 2.81654 4.35528 4.21399C2.91125 5.61143 2.1 7.50678 2.1 9.48307C2.1 11.4594 2.91125 13.3547 4.35528 14.7522C5.79931 16.1496 7.75783 16.9347 9.8 16.9347C11.8422 16.9347 13.8007 16.1496 15.2447 14.7522C16.6888 13.3547 17.5 11.4594 17.5 9.48307C17.5 7.50678 16.6888 5.61143 15.2447 4.21399C13.8007 2.81654 11.8422 2.03146 9.8 2.03146ZM2.26232e-08 9.48307C0.000132212 7.96656 0.376057 6.47219 1.09624 5.12532C1.81642 3.77844 2.85987 2.61834 4.13904 1.74233C5.4182 0.866319 6.8958 0.29994 8.44788 0.0907039C9.99995 -0.118532 11.5812 0.035477 13.0591 0.539812C14.537 1.04415 15.8683 1.8841 16.9415 2.98922C18.0146 4.09433 18.7983 5.43238 19.2267 6.89112C19.6551 8.34986 19.7158 9.88675 19.4036 11.3729C19.0915 12.859 18.4157 14.251 17.4328 15.4322L22.092 19.9424C22.1952 20.0354 22.2779 20.1476 22.3353 20.2723C22.3927 20.3969 22.4235 20.5315 22.426 20.6679C22.4285 20.8043 22.4026 20.9399 22.3498 21.0664C22.297 21.1929 22.2184 21.3079 22.1187 21.4043C22.0189 21.5008 21.9002 21.5769 21.7694 21.628C21.6387 21.6791 21.4987 21.7042 21.3577 21.7018C21.2167 21.6994 21.0776 21.6695 20.9488 21.614C20.82 21.5585 20.7041 21.4784 20.608 21.3786L15.9474 16.8697C14.5076 17.992 12.769 18.6973 10.9326 18.904C9.09618 19.1108 7.23677 18.8107 5.56913 18.0382C3.90148 17.2658 2.49364 16.0526 1.50818 14.5388C0.522731 13.025 -0.000125577 11.2722 2.26232e-08 9.48307Z" fill="#7A835E"/>
                </svg>

                <input onChange={(e) => setSelect(e.target.value)} onFocus={() => {setShowDatalist(true)}} placeholder="Add ingredients you want to use in the recipe (ex: chicken legs)" className='w-full h-full outline-none p-1 pl-8 text-black bg-transparent rounded-full' type="text" name='ingredient' value={select} />
            </div>
            {showDatalist && queryResults.length !== 0 && (
                <ul className='flex flex-col absolute divide-y divide-[#7A835E] border-2 border-[#7A835E] h-40 pl-2 overflow-y-auto top-12 w-full rounded left-0 bg-[#FAEBD2]'>
                {showDatalist && queryResults.map(result => {
                    return (
                        <>
                        <li onClick={ () => {addIngredient(result.id) } } className='hover:bg-slate-300 py-1 cursor-pointer' key={result.id}  >
                            { result.name.charAt(0).toUpperCase() + result.name.slice(1)}
                        </li>
                        </>
                    )
                })}
            </ul>
            )}
        </div>
        <ul className='flex gap-3'>
            {ingredients.map(ingredient => {
                return (
                <li className='items-center leading-normal px-3 py-1 text-sm text-black bg-[#7A835E] text-[#FAEBD2] rounded-full w-fit flex gap-3' key={ingredient.id}>
                    { ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}
                    <button className='text-[#FAEBD2] border-none font-bold' onClick={removeIngredient} value={ingredient.id}>
                        &#10005;
                    </button>
                </li>
                )
            })}
            {ingredients.length !== 0 && (
                <button className='items leading-relaxed center px-3 py-1 text-sm text-black bg-[#FAEBD2]/[.1] border-2 border-[#7A835E] text-[#7A835E] rounded-full w-fit flex gap-3' onClick={() => {setIngredients([])}} >
                    Clear
                </button>
            )    
            }
        </ul>
    </div>
  )
}
