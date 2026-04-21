import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import React from 'react';
import './App.css';

const API_URL = "https://api.github.com/users/Hades-1496/repos"
// --- COMPONENTES DE SECCIÓN ---

const Header = () => (
  <header className="header">
    <h1>Tu Nombre o Marca</h1>
    <nav>
      <a href="#sobre-mi">Sobre mí</a>
      <a href="#proyectos">Proyectos</a>
      <a href="#contacto">Contacto</a>
    </nav>
  </header>
);

const Hero = () => (
  <section id="sobre-mi" className="section hero">
    <h2>¡Hola! Soy un Desarrollador Web</h2>
    <p>
      Me apasiona crear experiencias web increíbles, aprender nuevas tecnologías 
      y resolver problemas complejos. Actualmente enfocado en React y el ecosistema frontend.
    </p>
  </section>
);

const Proyectos = () => {
  // Array de datos para tus proyectos. ¡Fácil de actualizar!
  const listaProyectos = [
    
  ];

  return (
    <section id="proyectos" className="section">
      <h2>Mis Proyectos</h2>
      <div className="grid-proyectos">
        {listaProyectos.map((proyecto) => (
          <div key={proyecto.id} className="tarjeta-proyecto">
            <h3>{proyecto.titulo}</h3>
            <p>{proyecto.descripcion}</p>
            <a href={proyecto.enlace} target="_blank" rel="noreferrer">Ver código</a>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contacto = () => (
  <section id="contacto" className="section footer">
    <h2>¿Hablamos?</h2>
    <p>Siempre estoy abierto a nuevas oportunidades y colaboraciones.</p>
    <div className="enlaces-contacto">
      <a href="mailto:tuemail@ejemplo.com">Envíame un correo</a>
      <a href="https://github.com/tuusuario" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noreferrer">LinkedIn</a>
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
        <Proyectos />
      </main>
      <Contacto />
    </div>
  );
}
