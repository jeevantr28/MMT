import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', formData);
      setSuccess('Account created successfully. You can now login.');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setSuccess('');
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 65px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96")', // Beautiful travel sunset
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.6)'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '10px' }}>Start Your Next Journey 🌍</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>"A journey of a thousand miles begins with a single step."</p>
        </div>

        <div className="form-container" style={{ margin: '0 auto', width: '100%' }}>
          <h2 className="form-title">Create Account</h2>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn-primary">Sign Up Now</button>
          </form>
          <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-light)' }}>
            Already traveling with us? <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
