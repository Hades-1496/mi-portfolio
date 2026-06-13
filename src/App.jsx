import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { DoomContext } from './context/DoomContext';
import Navegador from './components/Navegador.jsx';
import DoomHUD from './components/DoomHUD.jsx';
import CRTOverlay from './components/CRTOverlay.jsx';
import './App.css';
import profilePicture from './assets/Hades-Perfil.jpeg';

// --- COMPONENTES DE SECCIÓN ---

const Header = () => {
  return (
    <header className="header">
      <h1>Hades Otero</h1>
      <nav className="nav-desktop">
        <a href="#/">Sobre mí</a>
        <a href="#/proyectos">Proyectos</a>
        <a href="#/contacto">Contacto</a>
      </nav>
    </header>
  );
};

const Hero = () => {
  const location = useLocation();

  // Only display brief intro on main dashboard route
  if (location.pathname !== '/') return null;

  return (
    <section id="sobre-mi" className="section hero">
      <div className="doom-hero-dossier">
        <div className="doom-hero-avatar-frame">
          <img src={profilePicture} alt="Hades Otero Avatar" className="doom-hero-avatar-image" />
          <div className="doom-hero-avatar-label">HADES OTERO</div>
        </div>
        <div className="doom-hero-info">
          <div>
            <h2>EXPEDIENTE PROFESIONAL</h2>
            <p>
              ¡Hola! Soy Desarrollador Web Fullstack y graduado en Ingeniería Electrónica 
              Industrial y Automática, de Canarias, España. Especialista en programación, robótica 
              y el desarrollo de soluciones lógicas avanzadas aplicadas a la web y sistemas embebidos.
            </p>
          </div>
          <div className="doom-dossier-stats">
            <div className="doom-dossier-stat-item"><strong>PUESTO:</strong> FULLSTACK DEV</div>
            <div className="doom-dossier-stat-item"><strong>UBICACIÓN:</strong> CANARIAS, ES</div>
            <div className="doom-dossier-stat-item"><strong>ESTADO:</strong> ACTIVO</div>
            <div className="doom-dossier-stat-item"><strong>STACK:</strong> REACT / JS / C++</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contacto = () => {
  // Hide global Contacto footer because we have a dedicated /contacto route now
  return null;
};

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const { isScreenShaking } = useContext(DoomContext);

  return (
    <div 
      className={`doom-shaker-container ${isScreenShaking ? 'shaking' : ''}`}
      style={{ minHeight: '100vh', position: 'relative' }}
    >
      {/* CRT overlay effects (Scanlines, vignetting) */}
      <CRTOverlay />

      <div className="portfolio-container">
        <Header />

        <main style={{ position: 'relative', zIndex: 10 }}>
          <Hero />
          <Navegador />
        </main>

        <Contacto />
      </div>

      {/* Classic Doom HUD panel at the bottom */}
      <DoomHUD />
    </div>
  );
}
