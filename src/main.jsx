import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'

import router from './Router/Router.jsx'
import AuthProvider from './Context/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />,
<ToastContainer position="top-center"></ToastContainer>

    </AuthProvider>
  </StrictMode>,
)
