import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx';
import './App.css'

function App () {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/events' element={<Events />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
