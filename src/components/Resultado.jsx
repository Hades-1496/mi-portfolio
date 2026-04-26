import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import "./Experiencia.js";
import { Estudios, Laboral } from "./Experiencia.js";
const API_URL_1 = "https://api.github.com/users/Hades-1496/repos";

const Intro = () => {
  const { data: listaProyectos, loading, error } = useFetch(API_URL_1);
  if (loading) {
    return (
      <section id="resultado" className="section">
        <h2>Mis Proyectos</h2>
        <p>Cargando repositorios...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section id="resultado" className="section">
        <h2>Mis proyectos</h2>
        <p>{error}</p>
      </section>
    );
  }
  return (
    <section id="resultado" className="section">
      <h2>Mis Proyectos</h2>
      <div className="grid-proyectos">
        {listaProyectos
          .filter((proyecto) => !proyecto.fork)
          .map(
            (proyecto) =>
              !proyecto.fork && (
                <div key={proyecto.id} className="tarjeta-proyecto">
                  <h3>{proyecto.name}</h3>
                  <p>{proyecto.description || "Sin descripción"}</p>
                  <a href={proyecto.html_url} target="_blank" rel="noreferrer">
                    Ver código
                  </a>
                </div>
              ),
          )}
      </div>
    </section>
  );
};

const Proyecto = () => {
  // Buscador de proyectos
  const [filtro, setFiltro] = useState("");
  // Proyectos
  const { data: listaProyectos, loading, error } = useFetch(API_URL_1);
  const proyectosFiltrados = listaProyectos.filter((proyecto) => {
    const coincideNombre = proyecto.name
      .toLowerCase()
      .includes(filtro.toLowerCase());
    return coincideNombre;
  });
  if (loading) {
    return (
      <section id="resultado" className="section">
        <h2>Todos los proyectos</h2>
        <p>Cargando repositorios...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section id="resultado" className="section">
        <h2>Todos los proyectos</h2>
        <p>{error}</p>
      </section>
    );
  }
  return (
    <section id="resultado" className="section">
      {/* Buscador proyecto */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Buscar:</h2>
        <input
          type="text"
          placeholder="Busca por nombre de proyecto..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            padding: "10px",
            width: "30%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Proyectos */}
      <h2>{filtro == '' ?'Todos los proyectos' : 'Resultados:'}</h2>
      <div className="grid-proyectos">
        {proyectosFiltrados.length > 0 ? (
          proyectosFiltrados.map((proyecto) => (
            <div key={proyecto.id} className="tarjeta-proyecto">
              <h3>{proyecto.name}</h3>
              <p>{proyecto.description || "Sin descripción"}</p>
              <a href={proyecto.html_url} target="_blank" rel="noreferrer">
                Ver código
              </a>
            </div>
          ))
        ) : (
          <p>No se encontraros proyectos con ese nombre</p>
        )}
      </div>
    </section>
  );
};
function Experiencia({id}) {
    switch (id) {
        case "empresas":
            return (
    <section id="resultado" className="section">
        <h2>Experiencia Laboral</h2>
        {Laboral.map((e) => (
            <article key= {e.id} style={{margin: '20px 0'}}>
                <h3 style={{marginBottom:'0'}}>{e.title}</h3>
                <p style={{fontSize:'0.8rem', margin:'0',padding:'0'}}>{e.occupation}<br/>{e.date}</p>
                <p style={{fontWeight:'bold'}}>{e.description}</p>
            </article>
        ))}
        
    </section>
  );
    case "estudios":
        return (
    <section id="resultado" className="section">
        <h2>Carreras</h2>
        {Estudios.map((e) => (
            <article key= {e.id}>
                <h3 style={{marginBottom:'0'}}>{e.title}</h3>
                <p style={{fontSize:'0.8rem', margin:'0',padding:'0'}}>{e.institution}<br/>
                {e.date}</p>
                <p style={{fontWeight:'bold'}}>{e.desc}</p>
            </article>
        ))}
        
    </section>
  );
    }
  
};

const Habiidades = () => {
  return(<>
    <section id="resultado" className="section">
      <article>
      <h2>Soft Skills</h2>
      <ul style={{textDecoration:'none'}}>
        <li>Flexible</li>
        <li>Curioso</li>
        <li>Resolutivo</li>
        <li>Con actitud positiva</li>
      </ul>
      </article>
      <article>
      <h2>Hard Skills/Conocimientos</h2>
      <ul style={{textDecoration:'none'}}>
        <li>Adobe AutoCAD</li>
        <li>Búsqueda de subvencioones</li>
        <li>Conocimientos de arquitectura ARM</li>
        <li>Conttrol de medios de comunicación: SPI, CAN, I2C, MQTT</li>
        <li>Eficiencia energética</li>
        <li>Conocimiento de lenguajes de eprogramación como: C, C++, Ensamblador, Java, Javascript, C#, MatLab, PHP</li>
        <li>Conocimiento de lenguajes de dominio MongoDB y SQL como sus sistemas de gestión: MySQL, MariaDB, XAMPP</li>
        <li>Conocimiento de lenguajes de marcas: HTML5, XML, CSS</li>
        <li>Conocimiento de Microsoft Excel y Word</li>
        <li>Software: AutoCAD, LibreCAD, Microsoft Office, LibreOffice</li>
      </ul>
      </article>

    </section>
  </>);
}
const Error501 = () => {
  return (
    <section id="resultado" className="section">
      <h2>Error 501</h2>
      <p>No implementado, perdone las molestias</p>
    </section>
  );
};

export default function Resultado({ id }) {
  switch (id) {
    case "intro":
      return <Intro />;
    case "proyectos":
      return <Proyecto />;
    case "empresas":
    case "estudios":
      return <Experiencia id={id}/>;
    case "skills":
      return <Habiidades/>
    default:
      return <Error501 />;
  }
}
