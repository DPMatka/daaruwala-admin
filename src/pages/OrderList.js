import React, { useEffect, useState } from 'react';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Placeholder: In a real app, fetch orders from backend API
        const storedOrders = JSON.parse(localStorage.getItem('daaruwala_orders')) || [
            // Sample data if localStorage is empty
            { id: 'ORD001', customerName: 'John Doe', total: 1800, status: 'Pending', items: [{name: 'Absolut Vodka', qty: 1}] },
            { id: 'ORD002', customerName: 'Jane Smith', total: 300, status: 'Shipped', items: [{name: 'Breezer Cranberry', qty: 2}] },
            { id: 'ORD003', customerName: 'Alice Johnson', total: 2500, status: 'Delivered', items: [{name: 'Jack Daniel\'s', qty: 1}] }
        ];
        setOrders(storedOrders);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Order List</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="px-6 py-4">{order.id}</td>
                            <td className="px-6 py-4">{order.customerName}</td>
                            <td className="px-6 py-4">₹{order.total}</td>
                            <td className="px-6 py-4">{order.status}</td>
                            <td className="px-6 py-4">
                                <button className="text-indigo-600">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;