import React, { useState, useEffect } from 'react';

const Api  = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=160c6021f73643b18ba7e0ad4b916643');
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);



  return (
    
    <div>
      {/* {data && <div>{JSON.stringify(data)}</div>} */}
    </div>
  );
}

export default Api;

