import React, { useEffect, useState } from 'react';
import Pastas from '../assets/pastas.png';
import VeganLogo from '../assets/vegan.svg';
import GlutenFreeLogo from '../assets/gluten-free.png';
import DairyFreeLogo from '../assets/dairy-free.png';
export default function Home(){
    const [data, setData] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
            const response = await fetch('https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian&apiKey=539381c9df374031919666304f095371');
            const json = await response.json();
            setData(json);
            };
            fetchData();
        }, []);
        console.log(data)
    return (
        <div className='HomeCustom flex justify-start items-center relative'>
            <div className="borderRadiusTop background-green absolute left-36 w-3/5 h-full">
                <div className='flex flex-col px-36 pr-96 py-36'>   
                    <h2 className='LogoSpan text-3xl mb-8'>Today's special</h2>
                    {data && data.recipes && data.recipes.map((repas) =>{
                        return(
                            <div className='flex flex-col'>
                                <h2 className='text-4xl colorWhite font-bold mb-8'>{repas.title}</h2>
                                <p className="LogoSpan text-2xl colorWhite pb-8">[Lorem ipsum dolor sit amet. Eum obcaecati dolores eum doloremque 
                                    expedita est minus laboriosam aut architecto aperiam ea ipsa quia 
                                    qui possimus labore.] </p>
                                <div className="infos  gap-4 flex h-16">
                                    {repas.vegetarian && 
                                       <div className="flex items-center gap-3">
                                            <div className=" h-12 w-12 borderRadius background-green-clear px-3 py-3">
                                                <img src={VeganLogo} alt="" className='w-8'/>
                                            </div>
                                            <p className='LogoSpan text-l'>Vegetarian</p>
                                        </div>
                                    }
                                    
                                    {repas.glutenFree && 
                                        <div className="flex items-center gap-3">
                                            <div className=" h-12 w-12 borderRadius background-green-clear px-3 py-3">
                                                <img src={GlutenFreeLogo} alt="" className='w-8'/>
                                            </div>
                                            <p className='LogoSpan text-l'>Gluten free</p>
                                        </div>
                                    }
                                    {repas.dairyFree && 
                                       <div className="flex items-center gap-3">
                                            <div className=" h-12 w-12 borderRadius background-green-clear px-3 py-3">
                                                <img src={DairyFreeLogo} alt="" className='w-8'/>
                                            </div>
                                            <p className='LogoSpan text-l'>Dairy free</p>
                                       </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                   
                </div>
            </div>
            <img src={Pastas} alt="Pastas" className='absolute w-2/5 right-36 top-20'/>
        </div>
       
        
    )
}