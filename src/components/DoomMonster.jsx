import { useEffect, useState, useRef, useContext } from 'react';
import { DoomContext } from '../context/DoomContext';

export default function DoomMonster({ monster }) {
  const { shoot, hurtPlayer } = useContext(DoomContext);
  const health = monster.health;
  const isDying = false;
  const [isAttacking, setIsAttacking] = useState(false);
  const attackTimer = useRef(null);

  // Attack behavior: after 4.5 seconds, the monster attacks the player!
  useEffect(() => {
    const triggerAttack = () => {
      setIsAttacking(true);
      
      // Damage player
      const damage = monster.type === 'baron' ? 25 : monster.type === 'cacodemon' ? 15 : 10;
      hurtPlayer(damage);

      // Reset attacking animation after 500ms
      setTimeout(() => {
        setIsAttacking(false);
      }, 500);

      // Schedule next attack in 4 seconds
      attackTimer.current = setTimeout(triggerAttack, 4000);
    };

    attackTimer.current = setTimeout(triggerAttack, 4500);

    return () => {
      if (attackTimer.current) clearTimeout(attackTimer.current);
    };
  }, [monster.type, hurtPlayer]);

  const handleShoot = (e) => {
    e.stopPropagation(); // prevent shooting the background double
    if (isDying) return;

    // Trigger shoot from context, passing the monster ID
    shoot(monster.id);
  };

  const getMonsterSvg = () => {
    switch (monster.type) {
      case 'cacodemon':
        return (
          <svg viewBox="0 0 100 100" className="monster-svg cacodemon">
            {/* Round sphere body */}
            <circle cx="50" cy="50" r="40" fill="#a82316" stroke="#520e07" strokeWidth="3" />
            
            {/* Horns */}
            <polygon points="20,20 10,5 25,15" fill="#cfcfcf" stroke="#555" strokeWidth="2" />
            <polygon points="80,20 90,5 75,15" fill="#cfcfcf" stroke="#555" strokeWidth="2" />
            <polygon points="50,12 50,2 45,9" fill="#cfcfcf" />
            
            {/* Giant center eye */}
            <circle cx="50" cy="40" r="14" fill="#141414" />
            <circle cx="50" cy="40" r="10" fill="#e8ea3a" /> {/* Yellow pupil */}
            <circle cx="50" cy="40" r="5" fill="#141414" />
            <circle cx="48" cy="38" r="2" fill="#ffffff" /> {/* Glint */}
            
            {/* Spiky mouth */}
            <path d="M 25,65 Q 50,85 75,65" fill="none" stroke="#141414" strokeWidth="5" strokeLinecap="round" />
            <polygon points="30,64 33,70 36,65" fill="#ffffff" />
            <polygon points="45,67 48,74 51,68" fill="#ffffff" />
            <polygon points="64,64 67,70 70,65" fill="#ffffff" />
            {/* Lower teeth */}
            <polygon points="38,71 40,66 42,70" fill="#ffffff" />
            <polygon points="55,73 57,67 59,72" fill="#ffffff" />
          </svg>
        );

      case 'imp':
        return (
          <svg viewBox="0 0 100 100" className="monster-svg imp">
            {/* Spiky brown head/body */}
            <polygon points="50,15 65,30 60,65 40,65 35,30" fill="#6e5041" stroke="#3d2c23" strokeWidth="3" />
            {/* Shoulders / Claws */}
            <path d="M 25,50 L 10,70 L 25,75 Z" fill="#6e5041" stroke="#3d2c23" strokeWidth="2" />
            <path d="M 75,50 L 90,70 L 75,75 Z" fill="#6e5041" stroke="#3d2c23" strokeWidth="2" />
            
            {/* Multiple red eyes */}
            <circle cx="42" cy="32" r="3" fill="#ff0000" />
            <circle cx="58" cy="32" r="3" fill="#ff0000" />
            <circle cx="50" cy="25" r="2" fill="#ff0000" />
            <circle cx="45" cy="40" r="1.5" fill="#ff0000" />
            <circle cx="55" cy="40" r="1.5" fill="#ff0000" />
            
            {/* Spikes on body */}
            <polygon points="35,30 25,28 34,35" fill="#ebebeb" />
            <polygon points="65,30 75,28 66,35" fill="#ebebeb" />
            <polygon points="50,15 50,5 47,12" fill="#ebebeb" />
            
            {/* Snarl mouth */}
            <rect x="44" y="48" width="12" height="4" fill="#141414" rx="1" />
            <polygon points="46,48 48,51 50,48" fill="#fff" />
            <polygon points="52,48 54,51 56,48" fill="#fff" />
          </svg>
        );

      case 'baron':
        return (
          <svg viewBox="0 0 120 120" className="monster-svg baron">
            {/* Large muscular pink torso */}
            <polygon points="60,25 90,45 80,95 40,95 30,45" fill="#d470a2" stroke="#703652" strokeWidth="4" />
            
            {/* Goat horns */}
            <path d="M 45,30 Q 30,10 15,20" fill="none" stroke="#cfcfcf" strokeWidth="7" strokeLinecap="round" />
            <path d="M 75,30 Q 90,10 105,20" fill="none" stroke="#cfcfcf" strokeWidth="7" strokeLinecap="round" />
            
            {/* Face details */}
            <polygon points="60,35 48,60 72,60" fill="#9e4b73" />
            {/* Green glowing eyes */}
            <circle cx="50" cy="50" r="3.5" fill="#00ff00" className="baron-eye-glow" />
            <circle cx="70" cy="50" r="3.5" fill="#00ff00" className="baron-eye-glow" />
            
            {/* Dark nose */}
            <polygon points="60,58 56,64 64,64" fill="#111" />
            
            {/* Beast mouth */}
            <path d="M 48,72 Q 60,82 72,72" fill="none" stroke="#111" strokeWidth="3" />
            {/* Fangs */}
            <polygon points="50,71 52,76 54,71" fill="#fff" />
            <polygon points="66,71 68,76 70,71" fill="#fff" />
          </svg>
        );

      default:
        return null;
    }
  };

  const monsterStyle = {
    position: 'absolute',
    left: `${monster.x}%`,
    top: `${monster.y}%`,
    width: monster.type === 'baron' ? '90px' : monster.type === 'cacodemon' ? '75px' : '65px',
    height: monster.type === 'baron' ? '90px' : monster.type === 'cacodemon' ? '75px' : '65px',
    transform: 'translate(-50%, -50%)',
    zIndex: 999,
    cursor: 'crosshair',
    transition: 'all 0.1s ease',
    animation: 'monsterFloat 3s ease-in-out infinite',
  };

  return (
    <div 
      className={`doom-monster-card ${monster.type} ${isAttacking ? 'attacking' : ''} ${isDying ? 'dying' : ''}`}
      style={monsterStyle}
      onClick={handleShoot}
    >
      {getMonsterSvg()}
      {/* Health Bar of Monster */}
      <div className="monster-health-bar">
        <div className="monster-health-fill" style={{ width: `${(health / monster.health) * 100}%` }}></div>
      </div>
      {/* Attack indicator indicator */}
      {isAttacking && <div className="monster-fireball-alert">🔥</div>}
    </div>
  );
}
