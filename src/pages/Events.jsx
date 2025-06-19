import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import '../styles/Events.css';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('auth_token');
      console.log('Token:', token); // Debugging line to check token
      if (!token) {
        setError('Please log in to view events.');
        return;
      }

      try {
        console.log('Token 2:', token); // Debugging line to check token
        const res = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
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
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch events.');
        }

        const data = await res.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [locationFilter, events]);

  return (
    <>
      <Navbar />
      <main className='events-content'>
        <section className='events-header'>
          <h1>Upcoming Events</h1>
          <p>Discover exciting events in your area.</p>
          <div className='filter-container'>
            <input
              type='text'
              placeholder='Filter by location (e.g., New York)'
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className='location-filter'
            />
          </div>
        </section>
        {error && <p className='error-message'>{error}</p>}
        <section className='events-grid'>
          {filteredEvents.length === 0 && !error && (
            <p>No events found for this location.</p>
          )}
          {filteredEvents.map((event) => (
            <div key={event.id} className='event-card'>
              <img
                src='https://i.imgur.com/45rqlqE.jpg' // Placeholder
                alt={event.name}
                className='event-image'
              />
              <div className='event-details'>
                <h3>{event.name}</h3>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}