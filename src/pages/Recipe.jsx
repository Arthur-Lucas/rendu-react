import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VeganLogo from '../assets/vegan.svg';
import GlutenFreeLogo from '../assets/gluten-free.png';
import DairyFreeLogo from '../assets/dairy-free.png';
import Converter from '../components/Converter';


export default function Recipe() {

    const [data, setData] = useState(null);
    const params = useParams();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        
        const fetchData = async () => {
        const response = await fetch('https://api.spoonacular.com/recipes/'+params.id+'/information?apiKey=31708597a5a041d896c31ed8b6e53dfa');
        const json = await response.json();
        setData(json);
        }; 
        fetchData(); 
    }, []);

  return (
    <div>
        {data ? ( 
            <div className='flex justify-start items-center' key={data.id}>
            <div className="borderRadiusTop background-green left-36 w-3/5">
                <div className='flex flex-col py-36'>   
                    <h2 className='LogoSpan text-3xl mb-8'>{data.sourceName}</h2>
                            <div className='flex flex-col'>
                                <h2 className='text-4xl colorWhite font-bold mb-8'>{data.title}</h2>
                                <p className="LogoSpan text-2xl colorWhite pb-8">{data.description}</p>
                                <div className="infos  gap-4 flex h-16">
                                {data.vegan  == false ?(
                                            <div className="flex items-center gap-3">
                                            <div className=" h-12 w-12 borderRadius background-green-clear px-3 py-3">
                                                <img src={VeganLogo} alt="" className='w-8'/>
                                            </div>
                                            <p className='LogoSpan text-l'>Vegan</p>
                                        </div>
                                        ):(
                                            <div></div>
                                        )}
                                        {data.glutenFree  == true ?(
                                            <div className="flex items-center gap-3">
                                            <div className=" h-12 w-12 borderRadius background-green-clear px-3 py-3">
                                                <img src={GlutenFreeLogo} alt="" className='w-8'/>
                                            </div>
                                            <p className='LogoSpan text-l'>Gluten Free</p>
                                        </div>
                                        ):(
                                            <div></div>
                                        )}

                                        {data.dairyFree  == true ?(
                                            <div className="flex items-center gap-3">
                                            <div className=" h-12 w-12 borderRadius background-green-clear px-3 py-3">
                                                <img src={ DairyFreeLogo} alt="" className='w-8'/>
                                            </div>
                                            <p className='LogoSpan text-l'>Dairy Free</p>
                                        </div>
                                        ):(
                                            <div></div>
                                        )}

                                        <Converter quantity={quantity} setQuantity={setQuantity} />
                                      
                                </div>

                            </div>

                            <img src={data.image} alt={data.title} className='absolute w-2/5 right-0 '/>
                            
                            <div className='mt-10 colorWhite LogoSpan'>
                                {data.extendedIngredients.map((ingredient) => {
                                  return (
                                <div key={ingredient.id}>
                                    <p>{ingredient.name}</p>
                                    <div className='w-24'><img src={'https://spoonacular.com/cdn/ingredients_100x100/' + ingredient.image}/></div>
                                    <p>
                                        <span>{Math.floor(ingredient.measures.metric.amount * quantity)} </span>
                                        <span>{ingredient.measures.metric.unitShort}</span>
                                        </p>
                                    </div>
                                )})}
                            </div>
                </div>
            </div>
        </div>
                    ) : <div>Loading...</div> 
            }
    </div>
  )
}