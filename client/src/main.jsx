import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'

import store from './reducer/store.js'
import { ThemeProvider } from './context/mode.jsx'


createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider>

    <App />
    </ThemeProvider>
    </BrowserRouter>
    </Provider>
  ,
)
