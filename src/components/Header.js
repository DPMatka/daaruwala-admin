import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();          // 🔄 call App.js logout
    navigate('/login');  // ↩ redirect to login
  };

  return (
    <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Daaruwala Admin</h1>

      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/orders" className="hover:underline">Orders</Link>
        <Link to="/users" className="hover:underline">Users</Link> {/* ✅ New Link */}

        {/* ✅ Show Logout button only if logged in */}
        {isLoggedIn && (
          <button
            onClick={handleLogoutClick}
            className="ml-4 bg-white text-purple-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;