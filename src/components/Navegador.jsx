import { NavLink } from 'react-router-dom';
import { useState } from 'react'; 
import Resultado from "../routes/Resultado.jsx";
export default function Navegador() {
  const menu = [
    { id: "intro", path: "/mi-portfolio/", label: "Introducción" },
    { id: "proyectos", path: "/proyectos", label: "Buscar Proyectos" },
    { id: "empresas", path: "/laboral", label: "Experiencia laboral" },
    { id: "estudios", path: "/carreras", label: "Carreras" },
    { id: "skills", path: "/skills" ,label: "Habilidades" },
    { id: "personal", path: "/personal", label: "Gustos Personales" },
    { id: "contacto", path: "/contacto", label: "Contacto" },
  ];
  
  // Estado para controlar si el menú de hamburguesa está abierto o cerrado
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
    {/* Distribución navegador y resultado */}
      <div className="layout-container">

        {/* Navegador */}
        <div>
          {/* Botón de hamburguesa (visible solo en móviles por CSS) */}
          <button 
            className="menu-hamburguesa" 
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? "✖ Cerrar menú" : "☰ Menú"}
          </button>

          <nav className={`navegador-lateral ${menuAbierto ? "abierto" : ""}`}>
          {menu.map((e) => (
            <NavLink
              key={e.id}
              to={e.path}
              onClick={() => setMenuAbierto(false)} // Cierra el menú al hacer clic
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
        </div>

        {/* Resultado, siendo el main tamibén */}
        <main className="main-content" style={{ marginTop: "0", padding: "0 40px" }}>

            <Resultado />

        </main>
      </div>
    </>
  );
}
