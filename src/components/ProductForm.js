import React, { useState, useEffect } from 'react';

const ProductForm = ({ productId, onSave, onCancel }) => {
    const [product, setProduct] = useState({ name: '', price: '', stock: '', category: 'Whiskey', image: '' });

    useEffect(() => {
        if (productId) {
            // In a real app, you would fetch the product by ID from your backend API
            const products = JSON.parse(localStorage.getItem('daaruwala_products')); // Placeholder for now
            const existingProduct = products ? products.find(p => p.id === productId) : null;
            if (existingProduct) {
                setProduct(existingProduct);
            }
        } else {
            setProduct({ name: '', price: '', stock: '', category: 'Whiskey', image: '' }); // Clear form for new product
        }
    }, [productId]); // Re-run when productId changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mt-8"> {/* Added mt-8 for spacing */}
            <h3 className="text-xl font-bold mb-4">{productId ? 'Edit Product' : 'Add New Product'}</h3>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price (₹)</label>
                <input type="number" name="price" value={product.price} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Stock Quantity</label>
                <input type="number" name="stock" value={product.stock} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select name="category" value={product.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                    <option value="Whiskey">Whiskey</option>
                    <option value="Beer">Beer</option>
                    <option value="Vodka">Vodka</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Mixers">Mixers</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input type="text" name="image" value={product.image} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save Product</button>
            </div>
        </form>
    );
};

export default ProductForm;