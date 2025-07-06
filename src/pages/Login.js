import React, { useState } from 'react';
// No direct API call here yet, just local login simulation
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Basic client-side validation for demo purposes
        if (email === 'admin@daaruwala.com' && password === 'admin123') {
            alert('Admin Login Successful!');
            onLogin(); // Call the onLogin prop from App.js to set isLoggedIn to true
        } else {
            alert('Invalid Admin Credentials!');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow mt-10"> {/* Added mt-10 for spacing */}
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg">Login</button>
            </form>
        </div>
    );
};

export default Login;