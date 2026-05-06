import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(searchParams).toString();
    navigate(`/flights?${query}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #051a4a, #0b2b78)',
        padding: '80px 20px',
        textAlign: 'center',
        color: '#eef4ff'
      }}>
        <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px' }}>Book Your Flight Tickets</h1>
        <p style={{ fontSize: '18px', opacity: 0.95 }}>Fly anywhere in the world with the best prices.</p>
      </div>

      {/* Search Box */}
      <div className="container" style={{ marginTop: '-40px' }}>
        <form onSubmit={handleSearch} style={{
          background: '#081d4e',
          padding: '30px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.18)',
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-end',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="form-label" style={{ color: '#cbd5ff' }}>From</label>
            <input 
              type="text" 
              name="from"
              placeholder="e.g. Delhi"
              value={searchParams.from}
              onChange={handleChange}
              className="form-input"
              style={{ background: '#0f2a6b', color: '#eef4ff', borderColor: '#2c4e97' }}
              required
            />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="form-label" style={{ color: '#cbd5ff' }}>To</label>
            <input 
              type="text" 
              name="to"
              placeholder="e.g. Mumbai"
              value={searchParams.to}
              onChange={handleChange}
              className="form-input"
              style={{ background: '#0f2a6b', color: '#eef4ff', borderColor: '#2c4e97' }}
              required
            />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="form-label" style={{ color: '#cbd5ff' }}>Departure Date</label>
            <input 
              type="date" 
              name="date"
              value={searchParams.date}
              onChange={handleChange}
              className="form-input"
              style={{ background: '#0f2a6b', color: '#eef4ff', borderColor: '#2c4e97' }}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={20} />
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
