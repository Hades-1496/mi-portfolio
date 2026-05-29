import { createContext } from "react";
import { useFetch } from "../hooks/useFetch.jsx";

export const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  // Usamos import.meta.env para leer variables de entorno en Vite
  let API_URL = import.meta.env.VITE_GITHUB_API_URL;
  
  // Mostramos en consola qué leyó exactamente
  console.log("URL leída del .env por Vite:", API_URL);

  if (!API_URL) {
    console.warn("⚠️ ALERTA: Vite no pudo leer el .env. Usando URL de respaldo temporalmente...");
    API_URL = "https://api.github.com/users/Hades-1496/repos";
  } else {
    // Limpiamos comillas si por accidente las pusiste en el .env
    API_URL = API_URL.replace(/['"]/g, '');
  }

  const { data: listaProyectos, loading, error } = useFetch(API_URL);

  return (
    <GithubContext.Provider value={{ listaProyectos, loading, error }}>
      {children}
    </GithubContext.Provider>
  );
};
