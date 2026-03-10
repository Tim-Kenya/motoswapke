import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-o10ji0sy62ih4v3h.us.auth0.com"
      clientId="Ct31vfvzibvqU4gx3R5ck50rzm7jrqei"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
