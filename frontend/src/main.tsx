import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './router/Router.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppRoutes />
  </StrictMode>,
)
