/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useRef } from 'react';

export const DoomContext = createContext();

export const DoomProvider = ({ children }) => {
  const [health, setHealth] = useState(100);
  const [armor, setArmor] = useState(100);
  const [godMode, setGodMode] = useState(false);
  const [noclip, setNoclip] = useState(false);
  const [levelName, setLevelName] = useState('MAP 01: INTRODUCCIÓN');
  const [terminalMessage, setTerminalMessage] = useState('');
  const isScreenShaking = false;
  const bloodSplatter = false;
  const [monsters] = useState([]); // Keep empty array to prevent compilation errors
  
  const msgTimeout = useRef(null);
  const cheatBuffer = useRef('');

  const triggerGlitchMessage = (msg) => {
    setTerminalMessage(msg);
    if (msgTimeout.current) clearTimeout(msgTimeout.current);
    msgTimeout.current = setTimeout(() => setTerminalMessage(''), 3000);
  };

  // Easter eggs cheat codes (iddqd / idclip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      cheatBuffer.current += e.key.toLowerCase();
      if (cheatBuffer.current.length > 10) {
        cheatBuffer.current = cheatBuffer.current.slice(-10);
      }

      if (cheatBuffer.current.endsWith('iddqd')) {
        setGodMode((prev) => {
          const next = !prev;
          if (next) {
            setHealth(100);
            setArmor(100);
            triggerGlitchMessage('GOD MODE ON');
          } else {
            triggerGlitchMessage('GOD MODE OFF');
          }
          return next;
        });
        cheatBuffer.current = '';
      } 
      else if (cheatBuffer.current.endsWith('idclip')) {
        setNoclip((prev) => {
          const next = !prev;
          triggerGlitchMessage(next ? 'NOCLIP ON' : 'NOCLIP OFF');
          return next;
        });
        cheatBuffer.current = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DoomContext.Provider
      value={{
        health,
        armor,
        godMode,
        noclip,
        levelName,
        setLevelName,
        terminalMessage,
        isScreenShaking,
        bloodSplatter,
        monsters,
        triggerGlitchMessage,
      }}
    >
      {children}
    </DoomContext.Provider>
  );
};
