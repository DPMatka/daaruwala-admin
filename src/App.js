import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import OrderList from './pages/OrderList';
import Users from './pages/Users'; // ✅ NEW

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check token on initial load (auto-login after refresh)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Called after login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // ✅ Called on logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove token
    setIsLoggedIn(false);
  };

  // ✅ Route guard for protected screens
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Login onLogin={handleLogin} />;
  };

  return (
    <Router>
      {/* ✅ Pass isLoggedIn & onLogout to Header */}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        {/* Public login route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;