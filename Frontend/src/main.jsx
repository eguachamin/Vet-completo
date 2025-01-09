import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//componentes rendericen dos veces react.StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode> 
    <App />
  //</React.StrictMode>,
)
