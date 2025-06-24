import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import '../styles/Tickets.css';

export default function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Please log in to view tickets.');
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (res.status === 401) {
          setError('Unauthorized. Please log in again.');
          localStorage.removeItem('auth_token');
          navigate('/login');
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch tickets.');
        }

        const data = await res.json();
        setTickets(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTickets();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main className='tickets-content'>
        <section className='tickets-header'>
          <h1>Your Tickets</h1>
          <p>View all your reserved tickets.</p>
        </section>
        {error && <p className='error-message'>{error}</p>}
        <section className='tickets-grid'>
          {tickets.length === 0 && !error && (
            <p>No tickets found. Reserve some from the Events page!</p>
          )}
          {tickets.map((ticket) => (
            <div key={ticket.id} className='ticket-card'>
              <div className='ticket-details'>
                <h3>{ticket.event.name}</h3>
                <p><strong>Seat:</strong> {ticket.seat_row}{ticket.seat_number}</p>
                <p><strong>Price:</strong> ${ticket.price}</p>
                <p><strong>Date:</strong> {new Date(ticket.event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {ticket.event.location}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}