import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      const response = await fetch('https://daaruwala-backend-5i6g.onrender.com/api/orders');
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status (PUT request)
  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`https://daaruwala-backend-5i6g.onrender.com/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      alert('✅ Order status updated');
      fetchOrders(); // Refresh orders
    } catch (error) {
      alert('❌ Could not update order status');
      console.error(error);
    }
  };

  if (loading) return <p className="p-4">Loading orders...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Admin - All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Customer:</strong> {order.customerName || 'N/A'}</p>
              <p><strong>Phone:</strong> {order.contactNumber}</p>
              <p><strong>Address:</strong> {order.deliveryAddress}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>

              <div className="mt-3">
                <strong>Items:</strong>
                <ul className="list-disc ml-5 mt-1">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      Product ID: {item.productId}, Qty: {item.quantity}, Price: ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <label className="font-semibold mr-2">Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;