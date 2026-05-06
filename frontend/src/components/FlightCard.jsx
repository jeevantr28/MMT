import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const FlightCard = ({ flight, index }) => {
  const navigate = useNavigate();

  const colorPalettes = [
    ['#041838', '#0a2f6d'],
    ['#061b4f', '#143d8f'],
    ['#082660', '#1c4a9f'],
    ['#051a4a', '#1a3b82'],
    ['#0a265f', '#1e4c8f']
  ];
  const palette = colorPalettes[index % colorPalettes.length];

  const handleBook = () => {
    navigate(`/book/${flight._id}`);
  };

  return (
    <div style={{
      background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
      padding: '24px',
      borderRadius: '24px',
      boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '24px',
      transition: 'transform 0.2s',
      color: '#eef4ff'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ flex: 1, minWidth: '220px' }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', fontSize: '12px', fontWeight: '700', marginBottom: '12px', color: '#dce8ff' }}>
          {flight.airline}
        </div>
        <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>{flight.from} → {flight.to}</h3>
        <p style={{ color: '#dce8ff', fontSize: '15px', lineHeight: '1.6' }}>Depart: {flight.date} | Seats: {flight.totalSeats - (flight.bookedSeats?.length || 0)} left</p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', minWidth: '180px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.12)', padding: '10px 14px', borderRadius: '16px' }}>
          <Clock size={18} color="#eef4ff" />
          <span style={{ fontWeight: '700', color: '#eef4ff' }}>{flight.departureTime} - {flight.arrivalTime}</span>
        </div>
        <div style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff' }}>₹{flight.price}</div>
      </div>

      <div style={{ flex: '0 0 160px', textAlign: 'right' }}>
        <button onClick={handleBook} className="btn-primary" style={{ width: '100%', padding: '14px 20px', backgroundColor: '#052b7a', borderRadius: '16px' }}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
