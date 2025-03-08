
import { createRoot } from 'react-dom/client'

import App from './App'
import './App.css'
import { UseContextAuthProvider } from './context/contextAuth.jsx'


createRoot(document.getElementById('root')).render(
    <UseContextAuthProvider>
        <App />
    </UseContextAuthProvider>


)
