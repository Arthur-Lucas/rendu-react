import React, { useState, useEffect } from 'react';

function Api() {

    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=160c6021f73643b18ba7e0ad4b916643');
          const json = await response.json();
          setData(json);
          console.log(json)
        };
        fetchData();
        console.log(data, 'test')
      }, []);

  return (
    <div className="App">
      <p>{data.results[0].title}</p>
        <img src={data.results[0].image}></img>
    </div>
  )
}

export default Api;
