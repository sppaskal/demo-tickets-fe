import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import './App.css'

function App () {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
