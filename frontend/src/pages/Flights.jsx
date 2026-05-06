import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import FlightCard from '../components/FlightCard';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setError('');
        const queryParams = new URLSearchParams(location.search);
        const queryString = queryParams.toString();
        const path = queryString ? `/flights?${queryString}` : '/flights';
        const res = await api.get(path);
        setFlights(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch flights. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [location.search]);

  const queryParams = new URLSearchParams(location.search);
  const queryString = queryParams.toString();
  const title = queryString ? 'Available Flights' : 'All Available Flights';

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0b184c, #102a75 50%, #15399d)',
        borderRadius: '24px',
        padding: '32px 28px',
        color: '#eef4ff',
        marginBottom: '32px',
        boxShadow: '0 24px 60px rgba(8, 32, 80, 0.28)'
      }}>
        <h2 style={{ fontSize: '36px', marginBottom: '12px', letterSpacing: '0.4px' }}>{title}</h2>
        <p style={{ fontSize: '16px', opacity: 0.9, maxWidth: '700px' }}>Browse sleek flight options, compare prices and departure times, then book the best seat for your journey.</p>
      </div>

      {loading ? (
        <p style={{ fontSize: '18px' }}>Loading flights...</p>
      ) : error ? (
        <div className="error-msg">{error}</div>
      ) : flights.length > 0 ? (
        <div style={{ display: 'grid', gap: '18px' }}>
          {flights.map((flight, index) => (
            <FlightCard key={flight._id} flight={flight} index={index} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'linear-gradient(135deg, #ffffff, #f4f5f7)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '22px', color: 'var(--text-dark)', marginBottom: '16px' }}>{queryString ? 'No flights found for this route or date.' : 'No flights available at the moment.'}</h3>
          <p style={{ color: 'var(--text-light)' }}>{queryString ? 'Please try adjusting your search criteria.' : 'Please try again later.'}</p>
        </div>
      )}
    </div>
  );
};

export default Flights;
