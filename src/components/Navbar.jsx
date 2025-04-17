import '../styles/Navbar.css'
import LogoutButton from './LogoutButton.jsx'

export default function Navbar () {
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-logo'>DemoTickets</div>
        <div className='navbar-actions'>
          <ul className='navbar-links'>
            <li><a href='/events'>Events</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/contact'>Contact</a></li>
          </ul>
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
}
