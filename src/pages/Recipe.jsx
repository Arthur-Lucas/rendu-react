import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Recipe() {

    const [data, setData] = useState(null);
    const params = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
        const response = await fetch('https://api.spoonacular.com/recipes/'+params.id+'/information?apiKey=da4b285dcb7a4107a9e06bd23c3752b0');
        const json = await response.json();
        setData(json);
        }; 
        fetchData(); 
    }, []);

  return (
    <div>
        {data ? ( 
                    <div key={data.id}>
                        <div className='w-24'><img src={data.image}/></div>
                        <div>{data.title}</div>
                        <div>{data.readyInMinutes}</div>
                        <div>{data.servings}</div>
                        <div>{data.vegetarian == false ? (<div>Vegetarian</div>) : (<div>Not vegetarian</div> )}</div>
                        <div>{data.glutenFree == false ? ( <div>Gluten Free</div>) : (<div>Not Gluten Free</div> )}</div>
                        <div>
                            {data.extendedIngredients.map((ingredient) => (
                                <div key={ingredient.id}>
                                    <p>{ingredient.name}</p>
                                    <div className='w-24'><img src={ingredient.image}/></div>
                                    <p>
                                        <span>{ingredient.measures.metric.amount} </span>
                                        <span>{ingredient.measures.metric.unitShort}</span>
                                        </p>
                                </div>
                            ))}
                            </div>
                            <div>{data.winePairing.pairingText}</div>
                            <div>{data.winePairing.productMatches[0].title}</div>
                            <div>{data.winePairing.productMatches[0].price}</div>
                            <div>{data.winePairing.productMatches[0].description}</div>
                            <div className='w-24'><img src={data.winePairing.productMatches[0].imageUrl}/></div>
                            {/* <div>{data.winePairing.productMatches.map((wineInfos) => (
                                <div key={wineInfos.title}></div>
                            ))}</div> */}
                    </div>
                    ) : <div>Loading...</div> 
            }
                       
    </div>
  )
}