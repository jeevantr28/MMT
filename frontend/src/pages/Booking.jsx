import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const Booking = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [formData, setFormData] = useState({ passengerName: '', passengerAge: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await api.get(`/flights/${flightId}`);
        setFlight(res.data);
      } catch (err) {
        setError('Failed to fetch flight details');
      }
    };
    fetchFlight();
  }, [flightId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', {
        flightId,
        ...formData
      });
      setSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  if (error && !flight) return <div className="container" style={{ padding: '40px' }}><div className="error-msg">{error}</div></div>;
  if (!flight) return <div className="container" style={{ padding: '40px' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{
        background: 'var(--white)',
        padding: '30px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>Review your Booking</h2>
        
        <div style={{ marginBottom: '30px', background: 'var(--bg-color)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{flight.airline}</h3>
          <p style={{ fontSize: '16px', color: 'var(--text-light)', marginBottom: '8px' }}>
            <strong>{flight.from}</strong> to <strong>{flight.to}</strong>
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>
            Date: {flight.date} | Time: {flight.departureTime} - {flight.arrivalTime}
          </p>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary-blue)', marginTop: '16px' }}>
            Price: ₹{flight.price}
          </div>
        </div>

        {success ? (
          <div className="success-msg" style={{ padding: '20px', fontSize: '18px', textAlign: 'center' }}>
            🎉 Booking successful! Redirecting to home...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Passenger Details</h3>
            {error && <div className="error-msg">{error}</div>}
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 2, minWidth: '200px' }}>
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.passengerName}
                  onChange={e => setFormData({...formData, passengerName: e.target.value})}
                  required
                />
              </div>
              <div style={{ flex: 1, minWidth: '100px' }}>
                <label className="form-label">Age</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.passengerAge}
                  onChange={e => setFormData({...formData, passengerAge: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Confirm Booking</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking;
