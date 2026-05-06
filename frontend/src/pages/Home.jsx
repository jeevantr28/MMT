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
        backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 20px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)'
        }}></div>

        <div style={{ position: 'relative' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
            Explore The World 🌍
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Discover new places, create unforgettable memories, and travel without limits.
          </p>
        </div>
      </div>

      {/* Search Box (FIXED) */}
      <div className="container" style={{
        marginTop: '-60px',
        position: 'relative',
        zIndex: 10   // 🔥 This fixes the overlap issue
      }}>
        <form onSubmit={handleSearch} style={{
          background: 'var(--white)',
          padding: '30px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-end',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="form-label">From</label>
            <input
              type="text"
              name="from"
              placeholder="e.g. Delhi or New York"
              value={searchParams.from}
              onChange={handleChange}
              className="form-input"
              list="cities-list"
              required
            />
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="form-label">To</label>
            <input
              type="text"
              name="to"
              placeholder="e.g. Mumbai or London"
              value={searchParams.to}
              onChange={handleChange}
              className="form-input"
              list="cities-list"
              required
            />
          </div>

          <datalist id="cities-list">
            <option value="Delhi" />
            <option value="Mumbai" />
            <option value="Bangalore" />
            <option value="Chennai" />
            <option value="Goa" />
            <option value="Hyderabad" />
            <option value="New York" />
            <option value="London" />
            <option value="Dubai" />
            <option value="Singapore" />
            <option value="Paris" />
            <option value="Tokyo" />
          </datalist>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="form-label">Departure Date</label>
            <input
              type="date"
              name="date"
              value={searchParams.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{
            width: 'auto',
            padding: '12px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Search size={20} />
            Search
          </button>
        </form>
      </div>

      {/* Travel Inspiration Section */}
      <div style={{
        background: '#f5f7fa',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '30px', marginBottom: '20px' }}>
          Why Travel? 🌄
        </h2>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '18px', color: '#555' }}>
          Travel opens your heart, broadens your mind, and fills your life with stories.
          Whether it's mountains, beaches, or cities — every journey transforms you.
        </p>
      </div>

      {/* Call to Action Banner */}
      <div style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1493558103817-58b2924bce98")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)'
        }}></div>

        <div style={{ position: 'relative' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '10px' }}>
            Start Your Journey Today 🚀
          </h2>
          <p>Find the best deals and travel the world your way.</p>
        </div>
      </div>

    </div>
  );
};

export default Home;