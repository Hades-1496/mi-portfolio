import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Para el responsive dentro de navegador
import Resultado from "../routes/Resultado.jsx";
export default function Navegador() {
  const menu = [
    { id: "intro", path: "/", label: "Introducción" },
    { id: "proyectos", path: "/proyectos", label: "Buscar Proyectos" },
    { id: "empresas", path: "/laboral", label: "Experiencia laboral" },
    { id: "estudios", path: "/carreras", label: "Carreras" },
    { id: "skills", path: "/skills" ,label: "Habilidades" },
    { id: "personal", path: "/personal", label: "Gustos Personales" },
    { id: "contacto", path: "/contacto", label: "Contacto" },
  ];
  const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const sizeCheck = () => {
      setIsPhoneScreen(window.innerWidth < 600);
    }
    window.addEventListener('resize', sizeCheck);
    return () => window.removeEventListener('resize', sizeCheck);
  }, []);
  console.log("¿Es pantalla de móvil?:", isPhoneScreen);
  return (
    <>
    {/* Distribución navegador y resultado */}
      <div style={!isPhoneScreen ? { display: "grid", gridTemplateColumns: "250px 1fr" } : { display: "flex", flexDirection: "column" }}>

        {/* Navegador */}
        <nav
          className="#navegador"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
          }}
        >
          {menu.map((e) => (
            <NavLink
              key={e.id}
              to={e.path}
              style={({ isActive}) =>({
                background: isActive? "#3b82f6" : "transparent",
                color: isActive? "white" : "#374151",
                padding: "10px 15px",
                textAlign: "left", // Texto alineado a la izquierda queda mejor en sidebars
                textDecoration: "none",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: isActive? "bold" : "normal",
                transition: "all 0.2s ease",
              })}
            >
              {e.label}
            </NavLink>
          ))}
        </nav>
        {/* Resultado, siendo el main tamibén */}
        <main style={{ marginTop: "0", padding: "0 40px" }}>

            <Resultado />

        </main>
      </div>
    </>
  );
}
