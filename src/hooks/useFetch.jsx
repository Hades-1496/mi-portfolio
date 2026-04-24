import { useState, useEffect } from 'react';

export const useFetch = (API) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect( () => {

    const fetchData = async () => {
      if(!API) return;
    try {
      setLoading(true);
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    setData(await response.json());
  }
  catch (Err) {
    setError("Error: "+Err);
  }
  finally{
    setLoading(false);
  }
    }
    fetchData();
  },[API]);
  return {data, loading, error};
};