import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Todoform from "./assets/todolist/todoform"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Todoform/>
  </React.StrictMode>,
)
