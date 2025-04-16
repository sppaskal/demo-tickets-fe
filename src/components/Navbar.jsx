import '../styles/Navbar.css'

export default function Navbar () {
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-logo'>DemoTickets</div>
        <ul className='navbar-links'>
          <li><a href='/events'>Events</a></li>
          <li><a href='/about'>About</a></li>
          <li><a href='/contact'>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}
