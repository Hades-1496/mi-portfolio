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
              if (response.status === 403) {
                throw new Error(`Error HTTP 403: Límite de peticiones a GitHub superado. Intenta de nuevo en un rato.`);
              }
              throw new Error(`Error HTTP: ${response.status} - Verifica tu enlace de la API`);
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