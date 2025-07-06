import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    useEffect(() => {
        // Placeholder: In a real app, fetch products from backend API
        const storedProducts = JSON.parse(localStorage.getItem('daaruwala_products')) || [
            // Sample data if localStorage is empty
            { id: '1', name: 'Absolut Vodka', description: 'Smooth vodka from Sweden.', price: 1500, category: 'Vodka', stock: 100, image: 'https://via.placeholder.com/50/0000FF/FFFFFF?text=Absolut' },
            { id: '2', name: 'Jack Daniel\'s', description: 'Tennessee whiskey, classic taste.', price: 2500, category: 'Whiskey', stock: 50, image: 'https://via.placeholder.com/50/FF0000/FFFFFF?text=Jack+Daniels' },
            { id: '3', name: 'Breezer Cranberry', description: 'Refreshing cranberry flavored drink.', price: 120, category: 'RTD', stock: 200, image: 'https://via.placeholder.com/50/00FF00/FFFFFF?text=Breezer' }
        ];
        setProducts(storedProducts);
    }, []);

    const handleEdit = (id) => {
        setEditingProductId(id);
        setShowForm(true); // Show form when editing
    };

    const handleDelete = (id) => {
        // Placeholder: In a real app, send DELETE request to backend API
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem('daaruwala_products', JSON.stringify(updatedProducts)); // Update localStorage
        alert(`Product ${id} deleted!`);
    };

    const handleSave = (productToSave) => {
        // Placeholder: In a real app, send POST/PUT request to backend API
        let updatedProducts;
        if (editingProductId) {
            updatedProducts = products.map(p => (p.id === editingProductId ? { ...productToSave, id: editingProductId } : p));
            alert(`Product ${productToSave.name} updated!`);
        } else {
            updatedProducts = [...products, { ...productToSave, id: Date.now().toString() }]; // Assign a new ID for new products
            alert(`New product ${productToSave.name} added!`);
        }
        setProducts(updatedProducts);
        localStorage.setItem('daaruwala_products', JSON.stringify(updatedProducts)); // Update localStorage
        setEditingProductId(null); // Clear editing state
        setShowForm(false); // Hide form after saving
    };

    const handleCancelForm = () => {
        setEditingProductId(null);
        setShowForm(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Product List</h2>
            <div className="flex justify-end mb-4">
                <button onClick={() => setShowForm(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Add New Product</button>
            </div>
            {showForm && (
                <ProductForm
                    productId={editingProductId}
                    onSave={handleSave}
                    onCancel={handleCancelForm}
                />
            )}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-8"> {/* Added mt-8 */}
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;