import { Link, useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          <Plane size={28} color="var(--primary-orange)" />
          MakeMyTrip Clone
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-btn-outline">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
