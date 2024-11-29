import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async";
import {CssBaseline} from '@mui/material'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store} >
    <HelmetProvider>  
      <CssBaseline />
      <App />
    </HelmetProvider>  
  </Provider>
  // </StrictMode>,
)
