   import { Link } from 'react-router-dom';
   import '../styles/Navbar.css';
   import LogoutButton from './LogoutButton.jsx';

   export default function Navbar() {
     return (
       <nav className='navbar'>
         <div className='navbar-container'>
           <div className='navbar-logo'>DemoTickets</div>
           <div className='navbar-actions'>
             <ul className='navbar-links'>
               <li><Link to='/events'>Events</Link></li>
               <li><Link to='/about'>About</Link></li>
               <li><Link to='/contact'>Contact</Link></li>
             </ul>
             <LogoutButton />
           </div>
         </div>
       </nav>
     );
   }
