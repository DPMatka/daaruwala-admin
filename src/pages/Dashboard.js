import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Dashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/products" className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center text-center text-indigo-700 hover:bg-gray-50 transition-colors">
                    <span className="text-5xl mb-3">📦</span>
                    <h3 className="text-xl font-semibold">Manage Products</h3>
                    <p className="text-gray-600">Add, edit, or delete items in your store.</p>
                </Link>
                <Link to="/orders" className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center text-center text-indigo-700 hover:bg-gray-50 transition-colors">
                    <span className="text-5xl mb-3">📋</span>
                    <h3 className="text-xl font-semibold">View Orders</h3>
                    <p className="text-gray-600">Track and manage customer orders.</p>
                </Link>
                {/* Add more dashboard sections as needed */}
            </div>
        </div>
    );
};

export default Dashboard;