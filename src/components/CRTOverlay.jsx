import { useContext } from 'react';
import { DoomContext } from '../context/DoomContext';

export default function CRTOverlay() {
  const { terminalMessage, bloodSplatter, noclip } = useContext(DoomContext);

  return (
    <>
      {/* CRT Scanline and Flicker Effects */}
      <div className="crt-scanlines"></div>
      <div className="crt-screen-flicker"></div>
      <div className="crt-vignette"></div>

      {/* Screen Glitch overlay (if Noclip is on, adds matrix-like green tint) */}
      <div className={`crt-matrix-screen ${noclip ? 'active' : ''}`}></div>

      {/* Blood Splatter overlay on damage */}
      <div className={`blood-splatter-overlay ${bloodSplatter ? 'active' : ''}`}></div>

      {/* Doom Style Message Notification (Top Center) */}
      {terminalMessage && (
        <div className="doom-terminal-notification">
          <div className="doom-terminal-glitch-text">{terminalMessage}</div>
        </div>
      )}
    </>
  );
}
