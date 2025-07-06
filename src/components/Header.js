import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-indigo-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">DaaruWala Admin</h1>
                <Link to="/" className="bg-white text-indigo-700 px-3 py-1 rounded-lg font-medium">View Store</Link>
            </div>
        </header>
    );
};

export default Header;