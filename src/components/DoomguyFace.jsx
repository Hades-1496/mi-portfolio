import { useEffect, useState } from 'react';

export default function DoomguyFace({ health, godMode, weaponState }) {
  const [lookDirection, setLookDirection] = useState('center');

  // Eye look direction cycles every 1-2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const dirs = ['center', 'left', 'right'];
      const randomDir = dirs[Math.floor(Math.random() * dirs.length)];
      setLookDirection(randomDir);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Determine skin color and face elements based on health
  let faceColor = '#e0a98c'; // healthy skin
  let eyeColor = godMode ? '#ffff00' : '#4ba3e3'; // gold/yellow in god mode, else blue
  let mouthPath = 'M 18,28 Q 24,28 30,28'; // flat mouth
  let showScars = false;
  let showHeavyBlood = false;
  let isDead = health <= 0;

  if (isDead) {
    faceColor = '#7a7a7a'; // dead gray
    eyeColor = '#1a1a1a';
  } else if (health < 20) {
    faceColor = '#c76b5d'; // very flushed/bloody
    mouthPath = 'M 18,31 C 18,31 24,34 30,31'; // deep frown / open gasp
    showHeavyBlood = true;
    showScars = true;
  } else if (health < 50) {
    faceColor = '#d99182';
    mouthPath = 'M 19,30 Q 24,33 29,30'; // frown
    showScars = true;
  } else if (health < 80) {
    mouthPath = 'M 19,29 Q 24,30 29,29'; // slight frown
    showScars = true;
  }

  // Grin expression when firing
  if (weaponState === 'firing' && !isDead) {
    mouthPath = 'M 16,27 C 20,33 28,33 32,27 Z'; // evil grin / open teeth
  }

  // Pupil offset
  let leftPupilX = 17;
  let rightPupilX = 29;
  if (lookDirection === 'left') {
    leftPupilX = 15;
    rightPupilX = 27;
  } else if (lookDirection === 'right') {
    leftPupilX = 18;
    rightPupilX = 30;
  }

  return (
    <div className="doomguy-avatar-wrapper" style={{ width: '64px', height: '74px', position: 'relative' }}>
      <svg 
        viewBox="0 0 48 56" 
        width="100%" 
        height="100%" 
        style={{ 
          imageRendering: 'pixelated',
          filter: health < 20 && !isDead ? 'drop-shadow(0px 0px 5px rgba(255, 0, 0, 0.8))' : 'none',
          transition: 'all 0.1s ease'
        }}
      >
        {/* Background / Neck */}
        <rect x="14" y="44" width="20" height="12" fill="#bc775c" />
        
        {/* Helmet / Hair back */}
        <rect x="8" y="4" width="32" height="42" rx="4" fill="#3a4f2e" /> {/* Military green helmet */}
        <rect x="10" y="8" width="28" height="34" rx="2" fill="#2d1c18" /> {/* Dark brown hair base */}
        
        {/* Face plate / Skin */}
        <rect x="10" y="14" width="28" height="30" fill={faceColor} />
        
        {/* Helmet details (rim/straps) */}
        <rect x="7" y="10" width="34" height="4" fill="#2d3d24" />
        <rect x="8" y="14" width="3" height="16" fill="#2d3d24" />
        <rect x="37" y="14" width="3" height="16" fill="#2d3d24" />

        {/* Eyes (Left and Right whites) */}
        {!isDead ? (
          <>
            {/* Eye whites */}
            <rect x="14" y="20" width="6" height="4" fill="#ffffff" />
            <rect x="26" y="20" width="6" height="4" fill="#ffffff" />
            
            {/* Pupils */}
            <rect x={leftPupilX} y="21" width="2" height="2" fill={eyeColor} />
            <rect x={rightPupilX} y="21" width="2" height="2" fill={eyeColor} />
            
            {/* Eye brows */}
            <path d="M 12,19 L 20,20 M 26,20 L 34,19" stroke="#1f1310" strokeWidth="2" strokeLinecap="square" />
          </>
        ) : (
          <>
            {/* Dead eyes (X) */}
            <path d="M 14,20 L 19,23 M 19,20 L 14,23" stroke="#000000" strokeWidth="2" />
            <path d="M 27,20 L 32,23 M 32,20 L 27,23" stroke="#000000" strokeWidth="2" />
          </>
        )}

        {/* Nose */}
        <rect x="22" y="24" width="4" height="4" fill="#bc775c" />
        
        {/* Mouth */}
        {!isDead ? (
          <path d={mouthPath} fill={weaponState === 'firing' ? '#ffffff' : 'none'} stroke="#1f1310" strokeWidth="2" strokeLinecap="square" />
        ) : (
          <rect x="20" y="30" width="8" height="2" fill="#1f1310" />
        )}

        {/* Scars & Blood Overlays */}
        {showScars && (
          <>
            {/* Scar on cheek */}
            <path d="M 12,32 L 15,35" stroke="#cc3333" strokeWidth="1.5" />
            {/* Blood on temple */}
            <rect x="33" y="15" width="2" height="4" fill="#990000" />
          </>
        )}
        
        {showHeavyBlood && (
          <>
            {/* Nose bleed */}
            <rect x="23" y="27" width="2" height="3" fill="#ff0000" />
            {/* Bruised chin */}
            <rect x="18" y="38" width="12" height="3" fill="#aa2222" />
            {/* Mouth blood */}
            <rect x="16" y="32" width="3" height="2" fill="#ff0000" />
          </>
        )}

        {/* God Mode overlay */}
        {godMode && !isDead && (
          <path d="M 12,18 L 20,18 M 26,18 L 34,18" stroke="#ffcc00" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        )}
      </svg>
    </div>
  );
}
