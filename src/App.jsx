import "./App.css";
import "./hooks/useFetch.jsx";
import "./components/Navegador.jsx";
import { useState, useEffect } from 'react'; // Para el responsive dentro de navegador
import "./App.css";
import Navegador from "./components/Navegador.jsx";

// --- COMPONENTES DE SECCIÓN ---

const Header = () => {
  const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const sizeCheck = () => {
      setIsPhoneScreen(window.innerWidth < 600);
    }
    window.addEventListener('resize', sizeCheck);
    return () => window.removeEventListener('resize', sizeCheck);
  }, []);
    return (
  
  <header className="header">
    <h1>Hades Otero</h1>
    {isPhoneScreen? <></> :
    <nav >
      <a href="#sobre-mi">Sobre mí</a>
      <a href="##resultado">Proyectos</a>
      <a href="#resultado">Contacto</a>
    </nav>
    }
    
  </header>
);

} 
const Hero = () => (
  <section id="sobre-mi" className="section hero">
    <h2>Breve Introducción</h2>
    <p>
      ¡Hola! ¡Bienvenido a mi página web! Soy un Desarrolaldor Web Fullstack y
      graduado en Ingeniería Electrónica Industrial y Automática. Aquí podrás
      ver mis trabajos, estudios, habilidades y hasta gustos personales.
    </p>
  </section>
);

const Contacto = () => (
  <section id="contacto" className="section footer">
    <h2>¿Hablamos?</h2>
    <p>Siempre estoy abierto a nuevas oportunidades y colaboraciones.</p>
    <div className="enlaces-contacto">
      <a href="mailto:tuemail@ejemplo.com">Envíame un correo</a>
      <a href="https://github.com/Hades-1496" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/tuusuario"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
    </div>
  </section>
);

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  return (
    <div className="portfolio-container">
      <Header />
      <main>
        <Hero />
        <Navegador />
      </main>
      <Contacto />
    </div>
  );
}
