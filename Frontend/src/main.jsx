import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

import { AlertProvider } from './Components/AlertContext.jsx';


createRoot(document.getElementById('root')).render(
  <AlertProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </AlertProvider>
)
