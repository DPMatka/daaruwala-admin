import React from 'react';
import ReactDOM from 'react-dom/client'; // Changed from 'react-dom'
import App from './App';
import './index.css'; // Your Tailwind CSS styles

// Use createRoot for React 18+ (which create-react-app now uses)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);