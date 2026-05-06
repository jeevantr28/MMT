import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/book/${flight._id}`);
  };

  return (
    <div style={{
      background: 'var(--white)',
      padding: '20px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      transition: 'box-shadow 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
    >
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{flight.airline}</h3>
        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>{flight.from} → {flight.to}</p>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)', fontWeight: '500' }}>
        <Clock size={16} color="var(--primary-blue)" />
        {flight.departureTime} - {flight.arrivalTime}
      </div>

      <div style={{ flex: 1, textAlign: 'right' }}>
        <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--primary-blue)', marginBottom: '8px' }}>
          ₹{flight.price}
        </div>
        <button onClick={handleBook} className="btn-orange" style={{ padding: '8px 24px' }}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
