import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DoomContext } from '../context/DoomContext';
import { GithubContext } from '../routes/GithubContext';
import { Estudios, Laboral } from '../routes/Experiencia';
import DoomguyFace from './DoomguyFace';

export default function DoomHUD() {
  const {
    health,
    armor,
    levelName,
    setLevelName,
    godMode,
  } = useContext(DoomContext);

  const { listaProyectos } = useContext(GithubContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Calculate actual project count
  const projsCount = listaProyectos ? listaProyectos.length : 0;
  // Calculate years of experience (started in 2015, current year is 2026)
  const expJobs = Laboral.length;
  const expStud =  Estudios.length;

  // Update level name based on current route - Professional terminology
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setLevelName('MAP 01: INTRODUCCIÓN Y PERFIL');
        break;
      case '/proyectos':
        setLevelName('MAP 02: GALERÍA DE PROYECTOS');
        break;
      case '/laboral':
        setLevelName('MAP 03: TRAYECTORIA LABORAL');
        break;
      case '/carreras':
        setLevelName('MAP 04: FORMACIÓN ACADÉMICA');
        break;
      case '/skills':
        setLevelName('MAP 05: HABILIDADES Y TECNOLOGÍAS');
        break;
      case '/contacto':
        setLevelName('MAP 06: FORMULARIO DE CONTACTO');
        break;
      default:
        if (location.pathname.startsWith('/proyecto/')) {
          setLevelName('MAP 07: DETALLES DEL PROYECTO');
        } else {
          setLevelName('MAP 404: SECCIÓN NO ENCONTRADA');
        }
    }
  }, [location.pathname, setLevelName]);

  const navSections = [
    { label: 'ABOUT', path: '/' },
    { label: 'PROJS', path: '/proyectos' },
    { label: 'WORK', path: '/laboral' },
    { label: 'STUDY', path: '/carreras' },
    { label: 'SKILL', path: '/skills' },
    { label: 'MAIL', path: '/contacto' },
  ];

  return (
    <div className="doom-hud-panel">
      {/* Level Info Banner */}
      <div className="doom-hud-level-banner">
        <span className="doom-hud-blink-dot"></span>
        <span className="level-title-text">{levelName}</span>
      </div>

      <div className="doom-hud-content">
        {/* PROJECTS*/}
        <div className="hud-stat-box projs-box" onClick={() => navigate('/proyectos')} title="Ir a Proyectos">
          <div className="hud-stat-label">PROJS</div>
          <div className="hud-stat-value number-font red-led">{String(projsCount).padStart(3, '0')}</div>
        </div>

        {/* HEALTH Counter */}
        <div className="hud-stat-box health-box" title="Salud del Sistema">
          <div className="hud-stat-label">HEALTH</div>
          <div className="hud-stat-value number-font red-led">{String(health).padStart(3, '0')}%</div>
        </div>

        {/* PORTRAIT */}
        <div className="hud-portrait-box">
          <DoomguyFace health={health} godMode={godMode} weaponState="idle" />
        </div>

        {/* EXPERIENCE Studies */}
        <div className="hud-stat-box armor-box" onClick={() => navigate('/carreras')} title="Blindaje / Habilidades">
          <div className="hud-stat-label">EXP STD</div>
          <div className="hud-stat-value number-font red-led">{String(expStud).padStart(3, '0')}%</div>
        </div>

        {/* EXPERIENCE Jobs */}
        <div className="hud-stat-box exp-box" onClick={() => navigate('/laboral')} title="Ir a Experiencia Laboral">
          <div className="hud-stat-label">EXP JBS</div>
          <div className="hud-stat-value number-font red-led">{String(expJobs).padStart(3, '0')}</div>
        </div>

        {/* QUICK NAVIGATION PANEL (replaces WEAPONS PANEL) */}
        <div className="hud-weapons-panel">
          <div className="hud-stat-label">SECCIONES</div>
          <div className="hud-weapons-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
            {navSections.map((s, idx) => (
              <button
                key={s.label}
                className={`hud-weapon-btn ${location.pathname === s.path ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(s.path);
                }}
                style={{ padding: '3px 2px', fontSize: '0.6rem' }}
              >
                <span className="weapon-num">{idx + 1}</span>
                <span className="weapon-name-abbr">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative rivets */}
      <div className="hud-rivet top-left"></div>
      <div className="hud-rivet top-right"></div>
      <div className="hud-rivet bottom-left"></div>
      <div className="hud-rivet bottom-right"></div>
    </div>
  );
}
