import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <tr>
            <td className="px-6 py-4">
                {/* Placeholder image. Will load actual image from product.image later */}
                <img src={product.image || 'https://via.placeholder.com/50?text=Product'} alt={product.name} className="w-12 h-12 object-cover rounded" />
            </td>
            <td className="px-6 py-4">{product.name}</td>
            <td className="px-6 py-4">₹{product.price}</td>
            <td className="px-6 py-4">{product.stock}</td>
            <td className="px-6 py-4">
                <button onClick={() => onEdit(product.id)} className="text-indigo-600 mr-2">Edit</button>
                <button onClick={() => onDelete(product.id)} className="text-red-600">Delete</button>
            </td>
        </tr>
    );
};

export default ProductCard;