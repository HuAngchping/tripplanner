import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CreateTrip from './create-trip/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from 'sonner'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>,
)
