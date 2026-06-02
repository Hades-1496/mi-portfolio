import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom';
import { GithubProvider } from './routes/GithubContext.jsx';
import { DoomProvider } from './context/DoomContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <GithubProvider>
        <DoomProvider>
          <App />
        </DoomProvider>
      </GithubProvider>
    </HashRouter>
  </StrictMode>,
)
