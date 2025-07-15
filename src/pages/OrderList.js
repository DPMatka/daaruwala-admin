import React, { useState, useEffect } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  // ✅ Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      const response = await fetch('https://daaruwala-backend-5i6g.onrender.com/api/orders');
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data); // Default: show all
      setLoading(false);
    } catch (error) {
      console.error('Error loading orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Filter when status changes
  useEffect(() => {
    if (filterStatus === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status === filterStatus);
      setFilteredOrders(filtered);
    }
  }, [filterStatus, orders]);

  // ✅ Update status handler
  const updateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`https://daaruwala-backend-5i6g.onrender.com/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      alert('✅ Status updated!');
      fetchOrders(); // Refresh orders
    } catch (error) {
      alert('❌ Failed to update order status');
      console.error(error);
    }
  };

  if (loading) return <p className="p-4">Loading orders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Admin - Order Management</h2>

      {/* 🔽 Filter Dropdown */}
      <div className="mb-6">
        <label className="mr-2 font-semibold">Filter by status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* 🧾 Order Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Address</th>
              <th className="text-left p-3">Items</th>
              <th className="text-left p-3">Delivery</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.userId?.name || 'N/A'}</td>
                <td className="p-3">{order.contactNumber}</td>
                <td className="p-3">{order.deliveryAddress}</td>
                <td className="p-3 text-sm">
                  <ul className="list-disc ml-4">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} (Qty: {item.quantity} @ ₹{item.price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3">₹{order.deliveryCharge || 0}</td>
                <td className="p-3 font-semibold">₹{order.totalAmount}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                        order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                        order.status === 'Cancelled' ? 'bg-red-200 text-red-800' :
                        'bg-gray-200 text-gray-800'}
                    `}>
                      {order.status}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="text-sm border rounded p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">No orders found with selected status.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;