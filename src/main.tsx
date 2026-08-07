import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { FournisseurJeu } from './ui/store-react'
import './styles/theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FournisseurJeu>
      <App />
    </FournisseurJeu>
  </StrictMode>,
)
