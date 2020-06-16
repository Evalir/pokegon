import React from 'react'
import ReactDOM from 'react-dom'
import { ViewportProvider } from 'use-viewport'
import App from './App'
import BoxProvider from './components/BoxProvider'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ViewportProvider>
      <BoxProvider>
        <App />
      </BoxProvider>
    </ViewportProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
