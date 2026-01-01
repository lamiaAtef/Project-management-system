import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
<<<<<<< HEAD
import './index.css'
import App from './App.jsx'
=======
import AuthContextProvider from './context/AuthContext';

>>>>>>> 163c19a270b14bfb3327618e0c6382f76dcbb835

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
     <App />
    </AuthContextProvider>
  </StrictMode>,
)
