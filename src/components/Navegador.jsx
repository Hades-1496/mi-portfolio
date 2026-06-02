import { NavLink } from 'react-router-dom';
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

  return (
    <>
    {/* Distribución navegador y resultado */}
      <div className="layout-container">

          <nav className="navegador-lateral">
          {menu.map((e) => (
            <NavLink
              key={e.id}
              to={e.path}
              className="navegador-link"
            >
              {e.label}
            </NavLink>
          ))}
          </nav>

        {/* Resultado, siendo el main tamibén */}
        <main className="main-content" style={{ marginTop: "0", padding: "0" }}>

            <Resultado />

        </main>
      </div>
    </>
  );
}
