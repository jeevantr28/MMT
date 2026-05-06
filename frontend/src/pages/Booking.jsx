import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const Booking = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [formData, setFormData] = useState({ passengerName: '', passengerAge: '', seatNumber: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const rows = 18;
  const seatsPerRow = 10;

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
    if (!formData.seatNumber) {
      setError('Please select a seat');
      return;
    }
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

  const generateSeats = () => {
    const seats = [];
    for (let i = 1; i <= rows; i++) {
      for (let j = 0; j < seatsPerRow; j++) {
        const seatLetter = String.fromCharCode(65 + j);
        seats.push(`${i}${seatLetter}`);
      }
    }
    return seats;
  };

  const allSeats = generateSeats();
  const isSeatBooked = (seat) => flight?.bookedSeats?.includes(seat) || false;

  if (error && !flight) return <div className="container" style={{ padding: '40px' }}><div className="error-msg">{error}</div></div>;
  if (!flight) return <div className="container" style={{ padding: '40px' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #051a4a, #0b2c7d)',
        padding: '30px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.18)',
        maxWidth: '840px',
        margin: '0 auto',
        color: '#eef4ff'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.14)', paddingBottom: '16px' }}>Review your Booking</h2>
        
        <div style={{ marginBottom: '30px', background: 'rgba(255,255,255,0.06)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#f5f9ff' }}>{flight.airline}</h3>
          <p style={{ fontSize: '16px', color: '#d3e1ff', marginBottom: '8px' }}>
            <strong>{flight.from}</strong> to <strong>{flight.to}</strong>
          </p>
          <p style={{ fontSize: '14px', color: '#c7d9ff' }}>
            Date: {flight.date} | Time: {flight.departureTime} - {flight.arrivalTime}
          </p>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#9ec7ff', marginTop: '16px' }}>
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
                <label className="form-label" style={{ color: '#cbd5ff' }}>Full Name</label>
                <input 
                  type="text" 
                  className="form-input"
                  style={{ background: '#0d254f', color: '#eef4ff', borderColor: '#2c4e97' }}
                  value={formData.passengerName}
                  onChange={e => setFormData({...formData, passengerName: e.target.value})}
                  required
                />
              </div>
              <div style={{ flex: 1, minWidth: '100px' }}>
                <label className="form-label" style={{ color: '#cbd5ff' }}>Age</label>
                <input 
                  type="number" 
                  className="form-input"
                  style={{ background: '#0d254f', color: '#eef4ff', borderColor: '#2c4e97' }}
                  value={formData.passengerAge}
                  onChange={e => setFormData({...formData, passengerAge: e.target.value})}
                  required
                />
              </div>
            </div>

            <h3 style={{ fontSize: '18px', marginBottom: '16px', marginTop: '24px', color: '#eef4ff' }}>Select Your Seat</h3>
            <div style={{ background: '#0b285f', padding: '24px', borderRadius: 'var(--radius-md)', marginBottom: '20px', overflowX: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${seatsPerRow}, 1fr)`, gap: '8px', width: 'fit-content', margin: '0 auto' }}>
                {allSeats.map((seat) => {
                  const isBooked = isSeatBooked(seat);
                  const isSelected = formData.seatNumber === seat;
                  return (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => !isBooked && setFormData({...formData, seatNumber: seat})}
                      style={{
                        padding: '12px 8px',
                        borderRadius: 'var(--radius-sm)',
                        border: '2px solid',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: isBooked ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        borderColor: isBooked ? '#ddd' : isSelected ? 'var(--primary-blue)' : '#ccc',
                        backgroundColor: isBooked ? '#f0f0f0' : isSelected ? 'var(--primary-blue)' : 'white',
                        color: isBooked ? '#999' : isSelected ? 'white' : '#333',
                        opacity: isBooked ? 0.5 : 1,
                      }}
                      disabled={isBooked}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop: '16px', fontSize: '14px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: 'white', border: '2px solid #ccc' }}></div>
                  <span>Available</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: 'var(--primary-blue)', border: '2px solid var(--primary-blue)' }}></div>
                  <span>Selected</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: '#f0f0f0', border: '2px solid #ddd' }}></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>
            {formData.seatNumber && (
              <div style={{ background: '#0b285f', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontSize: '16px', textAlign: 'center', color: '#eef4ff' }}>
                Selected Seat: <strong style={{ color: '#89b7ff' }}>{formData.seatNumber}</strong>
              </div>
            )}
            
            <button type="submit" className="btn-primary" style={{ marginTop: '10px', width: '100%', background: '#0d3163', borderRadius: '12px', boxShadow: '0 12px 24px rgba(10, 31, 78, 0.24)' }}>Confirm Booking</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking;
