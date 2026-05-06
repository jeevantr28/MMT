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
        const res = await api.get(`/flights?${queryParams.toString()}`);
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

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Available Flights</h2>
      
      {loading ? (
        <p>Loading flights...</p>
      ) : error ? (
        <div className="error-msg">{error}</div>
      ) : flights.length > 0 ? (
        <div>
          {flights.map(flight => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '20px', color: 'var(--text-light)', marginBottom: '16px' }}>No flights found for this route or date.</h3>
          <p style={{ color: 'var(--text-light)' }}>Please try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Flights;
