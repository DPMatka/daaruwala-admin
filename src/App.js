import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Changed Switch to Routes
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import OrderList from './pages/OrderList';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Simple client-side login for demo. In real app, this verifies with backend.
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // Redirect to login if not logged in for protected routes
    const ProtectedRoute = ({ children, redirectTo }) => {
        return isLoggedIn ? children : <Login onLogin={handleLogin} />;
    };

    return (
        <Router>
            <Header />
            <Routes> {/* Changed Switch to Routes for react-router-dom v6+ */}
                {/* Public route for Login */}
                <Route path="/login" element={<Login onLogin={handleLogin} />} />

                {/* Protected routes */}
                <Route path="/" element={<ProtectedRoute redirectTo="/login"><Dashboard /></ProtectedRoute>} />
                <Route path="/products" element={<ProtectedRoute redirectTo="/login"><ProductList /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute redirectTo="/login"><OrderList /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;