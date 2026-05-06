import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const Booking = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [formData, setFormData] = useState({ 
    passengerName: '', 
    passengerAge: '',
    passengerEmail: '',
    passengerPhone: '',
    seatNumber: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mock seats: 6 rows, 4 seats per row (A, B, C, D)
  const rows = [1, 2, 3, 4, 5, 6];
  const cols = ['A', 'B', 'C', 'D'];

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
      setError('Please select a seat to continue.');
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

  if (error && !flight) return <div className="container" style={{ padding: '40px' }}><div className="error-msg">{error}</div></div>;
  if (!flight) return <div className="container" style={{ padding: '40px' }}>Loading...</div>;

  return (
    <div style={{
      minHeight: 'calc(100vh - 65px)',
      backgroundImage: 'url("https://images.unsplash.com/photo-1499856871958-5b9627545d1a")', // Beautiful Paris / City travel background
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      padding: '40px 20px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.5)'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '10px' }}>Complete Your Booking</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>"Travel is the only thing you buy that makes you richer."</p>
        </div>

        <div style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--glass-border)',
          padding: '40px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '850px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', color: 'var(--text-dark)' }}>Review your Booking</h2>
        
        {/* Flight Details Summary */}
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
            
            {/* Seat Selection */}
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Select Your Seat</h3>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '30px',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'inline-block', background: 'white', padding: '20px', borderRadius: '24px', border: '2px solid #ddd' }}>
                <div style={{ marginBottom: '15px', color: '#888', fontWeight: 'bold' }}>FRONT</div>
                {rows.map(row => (
                  <div key={row} style={{ display: 'flex', gap: '10px', marginBottom: '10px', justifyContent: 'center' }}>
                    {cols.map((col, idx) => {
                      const seatId = `${row}${col}`;
                      const isSelected = formData.seatNumber === seatId;
                      // adding a small gap for the aisle
                      const marginLeft = idx === 2 ? '20px' : '0';
                      
                      return (
                        <button
                          key={seatId}
                          type="button"
                          onClick={() => setFormData({ ...formData, seatNumber: seatId })}
                          style={{
                            marginLeft,
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid var(--primary-blue)' : '1px solid #ccc',
                            background: isSelected ? 'var(--primary-blue)' : '#fff',
                            color: isSelected ? '#fff' : '#333',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {seatId}
                        </button>
                      );
                    })}
                  </div>
                ))}
                <div style={{ marginTop: '15px', color: '#888', fontWeight: 'bold' }}>REAR</div>
              </div>
              {formData.seatNumber && (
                <p style={{ marginTop: '15px', fontWeight: '600', color: 'var(--primary-blue)' }}>
                  Selected Seat: {formData.seatNumber}
                </p>
              )}
            </div>

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

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-input"
                  value={formData.passengerEmail}
                  onChange={e => setFormData({...formData, passengerEmail: e.target.value})}
                  required
                />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-input"
                  value={formData.passengerPhone}
                  onChange={e => setFormData({...formData, passengerPhone: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Confirm Booking</button>
          </form>
        )}
      </div>
      </div>
    </div>
  );
};

export default Booking;
