import React, { useState, useEffect } from 'react';
import { fetchProductById, createProduct, updateProduct } from '../api'; // Import API functions

const ProductForm = ({ productId, onSave, onCancel, refreshProducts }) => {
    const [product, setProduct] = useState({ name: '', price: '', stockQuantity: '', category: 'Whiskey', imageUrl: '' });
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        if (productId) {
            setLoadingProduct(true);
            setFormError(null);
            const getProduct = async () => {
                try {
                    const existingProduct = await fetchProductById(productId);
                    setProduct({
                        name: existingProduct.name,
                        price: existingProduct.price,
                        stockQuantity: existingProduct.stockQuantity,
                        category: existingProduct.category,
                        imageUrl: existingProduct.imageUrl || ''
                    });
                } catch (err) {
                    console.error("Failed to fetch product for editing:", err);
                    setFormError("Failed to load product details.");
                } finally {
                    setLoadingProduct(false);
                }
            };
            getProduct();
        } else {
            setProduct({ name: '', price: '', stockQuantity: '', category: 'Whiskey', imageUrl: '' });
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        try {
            if (productId) {
                await updateProduct(productId, product);
                alert('Product updated successfully!');
            } else {
                await createProduct(product);
                alert('Product added successfully!');
            }
            onSave();
            refreshProducts();
        } catch (err) {
            setFormError(err.message || "Failed to save product.");
        }
    };

    if (loadingProduct) {
        return <div className="text-center">Loading product for edit...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mt-8">
            <h3 className="text-xl font-bold mb-4">{productId ? 'Edit Product' : 'Add New Product'}</h3>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
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
                <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select name="category" value={product.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                    <option value="Whiskey">Whiskey</option>
                    <option value="Beer">Beer</option>
                    <option value="Vodka">Vodka</option>
                    <option value="Rum">Rum</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Mixers">Mixers</option>
                    <option value="Cigarette">Cigarette</option>
                    <option value="Party Supplies">Party Supplies</option> {/* <-- THIS IS THE ONLY CHANGE */}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save Product</button>
            </div>
        </form>
    );
};

export default ProductForm;