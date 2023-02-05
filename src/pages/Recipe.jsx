import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VeganLogo from '../assets/vegan.svg';
import GlutenFreeLogo from '../assets/gluten-free.png';
import DairyFreeLogo from '../assets/dairy-free.png';


export default function Recipe() {

    const [data, setData] = useState(null);
    const params = useParams();

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
            <div className='HomeCustom flex justify-start items-center relative' key={data.id}>
            <div className="borderRadiusTop background-green absolute left-36 w-3/5">
                <div className='flex flex-col px-36 pr-96 py-36'>   
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
                                      
                                </div>

                            </div>

                            <img src={data.image} alt={data.title} className='absolute w-2/5 right-0 '/>
                            
                            <div className='mt-10 colorWhite LogoSpan'>
                                {data.extendedIngredients.map((ingredient) => (
                                <div key={ingredient.id}>
                                   <p>{ingredient.name}</p>
                                    <div className='w-24'><img src={'https://spoonacular.com/cdn/ingredients_100x100/' + ingredient.image}/></div>
                                    <p>
                                        <span>{ingredient.measures.metric.amount} </span>
                                        <span>{ingredient.measures.metric.unitShort}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                </div>

                
            </div>
            {/* <img src={Pastas} alt="Pastas" className='absolute w-2/5 right-36 top-20'/> */}
        </div>
                    // <div key={data.id}>
                    //     <div className='w-24'><img src={data.image}/></div>
                    //     <div>{data.title}</div>
                    //     <div>{data.readyInMinutes}</div>
                    //     <div>{data.servings}</div>
                    //     <div>{data.vegetarian == false ? (<div>Vegetarian</div>) : (<div>Not vegetarian</div> )}</div>
                    //     <div>{data.glutenFree == false ? ( <div>Gluten Free</div>) : (<div>Not Gluten Free</div> )}</div>
                    //     <div>
                    //         {data.extendedIngredients.map((ingredient) => (
                    //             <div key={ingredient.id}>
                    //                 <p>{ingredient.name}</p>
                    //                 <div className='w-24'><img src={ingredient.image}/></div>
                    //                 <p>
                    //                     <span>{ingredient.measures.metric.amount} </span>
                    //                     <span>{ingredient.measures.metric.unitShort}</span>
                    //                     </p>
                    //             </div>
                    //         ))}
                    //         </div>
                    //         <div>{data.winePairing.pairingText}</div>
                    //         <div>{data.winePairing.productMatches[0].title}</div>
                    //         <div>{data.winePairing.productMatches[0].price}</div>
                    //         <div>{data.winePairing.productMatches[0].description}</div>
                    //         <div className='w-24'><img src={data.winePairing.productMatches[0].imageUrl}/></div>
                    //         {/* <div>{data.winePairing.productMatches.map((wineInfos) => (
                    //             <div key={wineInfos.title}></div>
                    //         ))}</div> */}
                    // </div>
                    ) : <div>Loading...</div> 
            }
                       
    </div>
  )
}