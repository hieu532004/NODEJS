
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import DefaultLayout from './layouts/DefaultLayout'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import EmptyLayout from './layouts/EmptyLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path='/login' element={<EmptyLayout />} >
          <Route index element={<LoginPage />} />
        </Route>
        
        <Route path="*" element={<div>Not Found</div>} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
