import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import SeatSelection from './pages/SeatSelection.jsx';
import Tickets from './pages/Tickets.jsx';
import Contact from './pages/Contact.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/:eventId/seats' element={<SeatSelection />} />
          <Route path='/tickets' element={<Tickets />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;