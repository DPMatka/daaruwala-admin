import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { fetchProducts, deleteProduct } from '../api'; // Import new API functions

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch products from backend
    const getProductsFromBackend = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products for admin:", err);
            setError("Failed to load products. Check backend connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductsFromBackend(); // Fetch products on component mount
    }, []);

    const handleEdit = (id) => {
        setEditingProductId(id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id); // Call backend API to delete
                alert(`Product ${id} deleted successfully from backend!`);
                getProductsFromBackend(); // Re-fetch products to update list
            } catch (err) {
                alert(`Failed to delete product: ${err.message}`);
            }
        }
    };

    const handleSave = async (productToSave) => {
        // This will be handled by ProductForm calling the API
        // For now, it just closes the form and re-fetches products.
        // We'll pass getProductsFromBackend directly to ProductForm's onSave in a later step if needed.
        setEditingProductId(null);
        setShowForm(false);
        getProductsFromBackend(); // Re-fetch products after save/update
    };

    const handleCancelForm = () => {
        setEditingProductId(null);
        setShowForm(false);
    };

    if (loading) {
        return <div className="text-center text-lg py-10">Loading products for admin...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 py-10">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Product List</h2>
            <div className="flex justify-end mb-4">
                <button onClick={() => { setEditingProductId(null); setShowForm(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Add New Product</button>
            </div>
            {showForm && (
                <ProductForm
                    productId={editingProductId}
                    onSave={handleSave} // Calls getProductsFromBackend on save
                    onCancel={handleCancelForm}
                    refreshProducts={getProductsFromBackend} // Pass refresh function
                />
            )}
            {products.length === 0 ? (
                <div className="text-center text-gray-700 py-10">No products found in the database.</div>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-8">
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
                            <ProductCard
                                key={product._id} // Use _id from MongoDB
                                product={{
                                    id: product._id, // Pass _id as 'id' for consistency
                                    name: product.name,
                                    price: product.price,
                                    stock: product.stockQuantity, // Map backend's stockQuantity to 'stock'
                                    image: product.imageUrl || 'https://via.placeholder.com/50?text=Product'
                                }}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;