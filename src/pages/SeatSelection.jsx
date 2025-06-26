import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import '../styles/SeatSelection.css';

function SeatSelection() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state || {};
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSeats = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Please login to view seats.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/seats`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (response.status === 401) {
          setError('Unauthorized. Please login.');
          localStorage.removeItem('auth_token');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch seats');
        }

        const data = await response.json();
        setSeats(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSeats();
  }, [eventId, navigate]);

  const handleSeatSelect = (seat) => {
    if (seat.reserved) return;
    setSelectedSeat(seat.id === selectedSeat ? null : seat.id);
  };

  const handleReserve = async () => {
    if (!selectedSeat) {
      setError('Please select a seat.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError('Please log in to reserve a seat.');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ seat_id: selectedSeat, event_id: parseInt(eventId) }),
      });

      if (res.status === 401) {
        setError('Unauthorized. Please log in again.');
        localStorage.removeItem('auth_token');
        navigate('/login');
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to reserve seat.');
      }

      setSuccess('Seat reserved successfully!');
      setSelectedSeat(null); // Clear selection
      // Refresh seats
      const seatsRes = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/seats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${token}`,
        },
      });
      if (seatsRes.ok) {
        const updatedSeats = await seatsRes.json();
        setSeats(updatedSeats);
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  // Group seats by row for grid display
  const rows = [...new Set(seats.map((seat) => seat.seat_row))].sort();
  const maxSeatsPerRow = Math.max(
    ...rows.map((row) => seats.filter((seat) => seat.seat_row === row).length)
  );

  return (
    <>
      <Navbar />
      <main className='seat-selection-content'>
        <section className='seat-selection-header'>
          <h1>Select Your Seat</h1>
          <p>Choose an available seat and click "Reserve" to book.</p>
        </section>
        {event.name && (
          <section className='event-details'>
            <h2>{event.name}</h2>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
          </section>
        )}
        {error && <p className='error-message'>{error}</p>}
        {success && <p className='success-message'>{success}</p>}
        <section className='seat-grid'>
          {rows.map((row) => (
            <div key={row} className='seat-row'>
              <span className='row-label'>Row {row}</span>
              <div className='seat-row-seats'>
                {[...Array(maxSeatsPerRow)].map((_, index) => {
                  const seat = seats.find(
                    (s) => s.seat_row === row && parseInt(s.seat_number) === index + 1
                  );
                  if (!seat) return <div key={`${row}-${index}`} className='seat-empty'></div>;
                  return (
                    <button
                      key={seat.id}
                      className={`seat ${seat.reserved ? 'reserved' : 'available'} ${
                        selectedSeat === seat.id ? 'selected' : ''
                      }`}
                      onClick={() => handleSeatSelect(seat)}
                      disabled={seat.reserved}
                      title={`${seat.seat_row}${seat.seat_number} - $${seat.price}`}
                    >
                      {seat.seat_number}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
        <section className='reserve-action'>
          <button
            className='reserve-button'
            onClick={handleReserve}
            disabled={!selectedSeat}
          >
            Reserve
          </button>
        </section>
      </main>
    </>
  );
}

export default SeatSelection;