import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  // ✅ Pre-filled credentials (for dev only)
  const [email, setEmail] = useState('admin@daaruwala.com');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://daaruwala-backend-5i6g.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Login successful!');
        localStorage.setItem('adminToken', data.token);

        onLogin(); 
        navigate('/'); // Go to dashboard
      } else {
        alert(data.message || '❌ Invalid Admin Credentials!');
      }
    } catch (error) {
      alert('❌ Backend connection failed');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 mt-20 border rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;