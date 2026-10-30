import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { AlertProvider } from './Components/AlertContext.jsx';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

createRoot(document.getElementById('root')).render(
  <AlertProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </AlertProvider>
)
