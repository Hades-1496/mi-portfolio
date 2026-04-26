import Resultado from "./Resultado.jsx";
import { useState } from "react";
export default function Navegador() {
  const [active, setActive] = useState("intro");
  const menu = [
    { id: "intro", label: "Introducción" },
    { id: "proyectos", label: "Buscar Proyectos" },
    { id: "empresas", label: "Experiencia laboral" },
    { id: "estudios", label: "Carreras" },
    { id: "skills", label: "Habilidades" },
    { id: "personal", label: "Gustos Personales" },
    { id: "contacto", label: "Contacto" },
  ];
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "250px 1fr" }}>
        <nav
          className="#navegador"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
            minHeight: "100vh",
          }}
        >
          {menu.map((e) => (
            <button
              key={e.id}
              style={{
                background: active === e.id ? "#3b82f6" : "transparent",
                color: active === e.id ? "white" : "#374151",
                padding: "10px 15px",
                textAlign: "left", // Texto alineado a la izquierda queda mejor en sidebars
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: active === e.id ? "bold" : "normal",
                transition: "all 0.2s ease",
              }}
              onClick={() => setActive(e.id)}
            >
              {e.label}
            </button>
          ))}
        </nav>
        <main style={{ marginTop: "0", padding: "0 40px" }}>
          <Resultado id={active} />
        </main>
      </div>
    </>
  );
}
