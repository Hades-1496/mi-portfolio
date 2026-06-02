import { useContext } from 'react';
import { DoomContext } from '../context/DoomContext';

export default function DoomWeapon() {
  const { activeWeapon, weaponState } = useContext(DoomContext);

  const getWeaponSvg = () => {
    const isFiring = weaponState === 'firing';

    switch (activeWeapon) {
      case 'pistol':
        return (
          <svg viewBox="0 0 100 100" className={`weapon-svg pistol ${isFiring ? 'firing' : ''}`} style={{ width: '220px', height: '220px' }}>
            {/* Hand holding gun */}
            <rect x="42" y="70" width="16" height="30" fill="#cc9988" rx="2" /> {/* Arm/Wrist */}
            <rect x="36" y="60" width="28" height="15" fill="#444455" rx="3" /> {/* Glove */}
            {/* Pistol structure */}
            <rect x="44" y="25" width="12" height="36" fill="#222" rx="1" /> {/* Handle */}
            <rect x="42" y="10" width="16" height="24" fill="#333" rx="1" /> {/* Slide body */}
            <rect x="45" y="8" width="10" height="2" fill="#555" /> {/* Iron sights */}
            <rect x="47" y="10" width="6" height="3" fill="#00ff00" opacity="0.8" /> {/* Neon green laser sight */}
            
            {/* Trigger guard */}
            <rect x="38" y="32" width="8" height="10" fill="none" stroke="#222" strokeWidth="2" />
            
            {/* Firing Muzzle Flash */}
            {isFiring && (
              <g>
                <circle cx="50" cy="0" r="15" fill="#ffcc00" opacity="0.9" />
                <circle cx="50" cy="0" r="8" fill="#ffffff" />
                <line x1="50" y1="0" x2="35" y2="-20" stroke="#ff3300" strokeWidth="4" />
                <line x1="50" y1="0" x2="65" y2="-20" stroke="#ff3300" strokeWidth="4" />
                <line x1="50" y1="0" x2="50" y2="-30" stroke="#ffcc00" strokeWidth="6" />
              </g>
            )}
          </svg>
        );

      case 'shotgun':
        return (
          <svg viewBox="0 0 120 120" className={`weapon-svg shotgun ${isFiring ? 'firing' : ''}`} style={{ width: '320px', height: '320px' }}>
            {/* Gloves holding the heavy shotgun */}
            <rect x="48" y="85" width="24" height="35" fill="#222" rx="4" /> {/* Left hand glove */}
            <rect x="36" y="70" width="48" height="20" fill="#333" rx="3" />
            {/* Gun barrel */}
            <rect x="52" y="15" width="7" height="60" fill="#555" /> {/* Double barrel left */}
            <rect x="61" y="15" width="7" height="60" fill="#444" /> {/* Double barrel right */}
            <rect x="50" y="35" width="20" height="12" fill="#111" /> {/* Middle clamp */}
            <rect x="46" y="60" width="28" height="20" fill="#7d5032" rx="2" /> {/* Wooden grip pump */}
            
            {/* Muzzle Flash */}
            {isFiring && (
              <g>
                <polygon points="60,10 40,-25 80,-25 55,-5 65,-5" fill="#ff4500" opacity="0.95" />
                <polygon points="60,10 48,-15 72,-15 58,-2 62,-2" fill="#ffcc00" />
                <circle cx="60" cy="15" r="18" fill="#ffdd00" opacity="0.7" />
                {/* Smoke puffs */}
                <circle cx="45" cy="-5" r="10" fill="#888" opacity="0.5" />
                <circle cx="75" cy="-5" r="10" fill="#888" opacity="0.5" />
              </g>
            )}
          </svg>
        );

      case 'plasma':
        return (
          <svg viewBox="0 0 100 100" className={`weapon-svg plasma ${isFiring ? 'firing' : ''}`} style={{ width: '280px', height: '280px' }}>
            {/* Main weapon frame */}
            <rect x="35" y="45" width="30" height="55" fill="#2d3540" rx="3" />
            <rect x="30" y="60" width="40" height="10" fill="#1a1f26" />
            
            {/* Plasma rails */}
            <rect x="42" y="10" width="5" height="40" fill="#111" />
            <rect x="53" y="10" width="5" height="40" fill="#111" />
            
            {/* Plasma Coils glowing */}
            <rect x="43" y="18" width="14" height="4" fill="#00ffcc" className="plasma-coil-glow" />
            <rect x="43" y="26" width="14" height="4" fill="#00ffcc" className="plasma-coil-glow" />
            <rect x="43" y="34" width="14" height="4" fill="#00ffcc" className="plasma-coil-glow" />

            {/* Futuristic sights */}
            <polygon points="50,5 45,12 55,12" fill="#00ffcc" opacity="0.7" />

            {/* Muzzle Flash - Neon turquoise splash */}
            {isFiring && (
              <g>
                <circle cx="50" cy="10" r="22" fill="#00ffff" opacity="0.6" />
                <circle cx="50" cy="10" r="12" fill="#ffffff" />
                <polygon points="50,10 30,-15 70,-15 45,-2 55,-2" fill="#00ffcc" />
                {/* Spark particles */}
                <circle cx="35" cy="-5" r="2" fill="#00ffff" />
                <circle cx="65" cy="-5" r="2" fill="#00ffff" />
                <circle cx="50" cy="-25" r="3" fill="#ffffff" />
              </g>
            )}
          </svg>
        );

      case 'bfg':
        return (
          <svg viewBox="0 0 140 140" className={`weapon-svg bfg ${isFiring ? 'firing' : ''}`} style={{ width: '400px', height: '400px' }}>
            {/* Giant green weapon frame */}
            <rect x="25" y="55" width="90" height="85" fill="#3a4d32" rx="6" />
            <rect x="35" y="45" width="70" height="25" fill="#2d3d24" rx="2" />
            {/* Steel trims */}
            <rect x="25" y="70" width="90" height="8" fill="#555" />
            <rect x="20" y="90" width="10" height="30" fill="#222" />
            <rect x="110" y="90" width="10" height="30" fill="#222" />
            
            {/* The BFG Barrel Hole */}
            <circle cx="70" cy="45" r="16" fill="#111" />
            <circle cx="70" cy="45" r="12" fill="#1a3311" stroke="#00ff00" strokeWidth="2" />
            
            {/* Power Core lines */}
            <rect x="68" y="70" width="4" height="50" fill="#39ff14" className="bfg-core-glow" />
            <circle cx="70" cy="95" r="12" fill="#111" />
            <circle cx="70" cy="95" r="8" fill="#39ff14" className="bfg-core-glow" />

            {/* Muzzle Flash - Huge Toxic Green blast! */}
            {isFiring && (
              <g>
                <circle cx="70" cy="45" r="45" fill="#39ff14" opacity="0.6" className="bfg-flash-pulse" />
                <circle cx="70" cy="45" r="25" fill="#ffffff" />
                {/* Plasma spikes */}
                <polygon points="70,45 20,-30 120,-30 60,-5 80,-5" fill="#00ff00" />
                <polygon points="70,45 5,-10 135,-10" fill="#39ff14" opacity="0.8" />
                <circle cx="30" cy="-10" r="8" fill="#00ff00" opacity="0.7" />
                <circle cx="110" cy="-10" r="8" fill="#00ff00" opacity="0.7" />
              </g>
            )}
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`doom-weapon-container ${weaponState}`}>
      {getWeaponSvg()}
    </div>
  );
}
