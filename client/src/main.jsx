import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/system";
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NextUIProvider>
        <App />
    </NextUIProvider>
  </Provider>

)
