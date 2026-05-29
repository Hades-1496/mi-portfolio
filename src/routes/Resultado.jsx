import { useMemo, useState, useContext } from "react";
import { GithubContext } from "./GithubContext.jsx";
import "./Experiencia.js";
import { Estudios, Laboral } from "./Experiencia.js";
import Contacto from "./Contacto.jsx";
import { Routes, Route, Navigate, Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Resultado.module.css";

const Intro = () => {
  const { listaProyectos, loading, error } = useContext(GithubContext);

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
                  <div className={styles.linksContainer}>
                    <Link to={`/proyecto/${proyecto.id}`} className={styles.linkDetalle}>Ver detalles</Link>
                  </div>
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
  const { listaProyectos, loading, error } = useContext(GithubContext);

  // useMemo en el buscador: Sólo lo recalculará si cambian los repos o tu búsqueda.
  const proyectosFiltrados = useMemo(
    () =>
      listaProyectos.filter((proyecto) => {
        const coincideNombre = proyecto.name
          .toLowerCase()
          .includes(filtro.toLowerCase());
        return coincideNombre;
      }),
    [listaProyectos, filtro],
  );
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
      <div className={styles.searchContainer}>
        <h2>Buscar:</h2>
        <input
          type="text"
          placeholder="Busca por nombre de proyecto..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Proyectos */}
      <h2>{filtro == "" ? "Todos los proyectos" : "Resultados:"}</h2>
      <div className="grid-proyectos">
        {proyectosFiltrados.length > 0 ? (
          proyectosFiltrados.map((proyecto) => (
            <div key={proyecto.id} className="tarjeta-proyecto">
              <h3>{proyecto.name}</h3>
              <p>{proyecto.description || "Sin descripción"}</p>
              <div className={styles.linksContainer}>
                <Link to={`/proyecto/${proyecto.id}`} className={styles.linkDetalle}>Ver detalles</Link>
                
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraros proyectos con ese nombre</p>
        )}
      </div>
    </section>
  );
};

function Experiencia({ id }) {
  switch (id) {
    case "laboral":
      return (
        <section id="resultado" className="section">
          <h2>Experiencia Laboral</h2>
          {Laboral.map((e) => (
            <article key={e.id} className={styles.experienciaArticle}>
              <h3 className={styles.experienciaTitle}>{e.title}</h3>
              <p className={styles.experienciaDate}>
                {e.occupation}
                <br />
                {e.date}
              </p>
              <p className={styles.experienciaDesc}>{e.description}</p>
            </article>
          ))}
        </section>
      );
    case "carreras":
      return (
        <section id="resultado" className="section">
          <h2>Carreras</h2>
          {Estudios.map((e) => (
            <article key={e.id} className={styles.experienciaArticle}>
              <h3 className={styles.experienciaTitle}>{e.title}</h3>
              <p className={styles.experienciaDate}>
                {e.institution}
                <br />
                {e.date}
              </p>
              <p className={styles.experienciaDesc}>{e.desc}</p>
            </article>
          ))}
        </section>
      );
  }
}

const Habiidades = () => {

  // Pude haberlo hecho mejor (rleacionarlo con un objeto como hice con experiencia)
  return (
    <>
      <section id="resultado" className="section">
        <article>
          <h2>Soft Skills</h2>
          <ul className={styles.skillsList}>
            <li>Flexible</li>
            <li>Curioso</li>
            <li>Resolutivo</li>
            <li>Con actitud positiva</li>
          </ul>
        </article>
        <article>
          <h2>Hard Skills/Conocimientos</h2>
          <ul className={styles.skillsList}>
            <li>Adobe AutoCAD</li>
            <li>Búsqueda de subvencioones</li>
            <li>Conocimientos de arquitectura ARM</li>
            <li>Conttrol de medios de comunicación: SPI, CAN, I2C, MQTT</li>
            <li>Eficiencia energética</li>
            <li>
              Conocimiento de lenguajes de eprogramación como: C, C++,
              Ensamblador, Java, Javascript, C#, MatLab, PHP
            </li>
            <li>
              Conocimiento de lenguajes de dominio MongoDB y SQL como sus
              sistemas de gestión: MySQL, MariaDB, XAMPP
            </li>
            <li>Conocimiento de lenguajes de marcas: HTML5, XML, CSS</li>
            <li>Conocimiento de Microsoft Excel y Word</li>
            <li>Software: AutoCAD, LibreCAD, Microsoft Office, LibreOffice</li>
          </ul>
        </article>
      </section>
    </>
  );
};

const ProyectoDetalle = () => {
  // useParams extrae el parámetro dinámico ':id' directamente de la URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { listaProyectos, loading, error } = useContext(GithubContext);

  if (loading || error) return null;

  // Buscamos el proyecto exacto usando el id
  const proyecto = listaProyectos.find((p) => p.id.toString() === id);

  if (!proyecto) {
    return (
      <div className={styles.overlay} onClick={() => navigate(-1)}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2>Proyecto no encontrado</h2>
          <button onClick={() => navigate(-1)} className={`${styles.btnCerrar} ${styles.btnCerrarMargin}`}>Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={() => navigate(-1)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>{proyecto.name}</h2>
        <p><strong>Descripción:</strong> {proyecto.description || "Sin descripción detallada disponible."}</p>
        <p><strong>Lenguaje principal:</strong> {proyecto.language || "No especificado"}</p>
        <p><strong>Estrellas:</strong> ⭐ {proyecto.stargazers_count}</p>
        <p><strong>Última actualización:</strong> {new Date(proyecto.updated_at).toLocaleDateString()}</p>
        
        <div className={styles.modalActions}>
          <a href={proyecto.html_url} target="_blank" rel="noreferrer" className={styles.btnGithub}>Ver código en GitHub</a>
          <button onClick={() => navigate(-1)} className={styles.btnCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};


const Error501 = () => {
  return (
    <section id="resultado" className="section">
      <h2>Error 501</h2>
      <p>No implementado, perdone las molestias</p>
    </section>
  );
};

export default function Resultado() {
  return (
    <Routes>
      {/* La ruta base ("/") muestra la Introducción */}
      <Route path="/" element={<Intro />} />
      <Route path="/proyectos" element={<Proyecto />} />
      <Route path="/laboral" element={<Experiencia id="laboral" />} />
      <Route path="/carreras" element={<Experiencia id="carreras" />} />
      <Route path="/skills" element={<Habiidades />} />
      <Route path="/contacto" element={<Contacto />} />

      {/* Ruta Dinámica para los detalles del proyecto */}
      <Route path="/proyecto/:id" element={<><Proyecto /><ProyectoDetalle /></>} />

      {/* Si el usuario escribe una URL inventada, le mostramos tu Error 501 */}
      <Route path="*" element={<Error501 />} />
    </Routes>
  );
}
