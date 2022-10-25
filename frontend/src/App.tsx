import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
import CreateAppointment from './pages/CreateAppointment'
import EditAppointment from './pages/EditAppointement'
import Error from './pages/Error'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='create-appointment' element={<CreateAppointment />} />
          <Route path='edit-appointment/:id' element={<EditAppointment />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
