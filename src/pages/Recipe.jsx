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
        {data ?( 
                            <div key={data.id}>
                                <div className='w-24'><img src={data.image}/></div>
                                <div>{data.title}</div>
                            </div>
                        )
                    
                    : <div>Loading...</div>
                    }
                       
    </div>
  )
}
