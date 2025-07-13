// IMPORTANT: Update this URL with YOUR LIVE Render backend URL (same as frontend)
const API_URL = 'https://daaruwala-backend-5i6g.onrender.com/api'; // Make sure this is YOUR actual Render backend URL!

// Function to fetch all products
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products from backend:", error);
        return []; // Return empty array on error for graceful handling
    }
};

// Function to create a new product
export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer YOUR_ADMIN_TOKEN` // Add auth token if admin login protects this route
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create product');
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating product:", error);
        throw error; // Re-throw to handle in component
    }
};

// Function to update an existing product
export const updateProduct = async (productId, productData) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer YOUR_ADMIN_TOKEN` // Add auth token if admin login protects this route
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update product');
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// Function to delete a product
export const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                // 'Authorization': `Bearer YOUR_ADMIN_TOKEN` // Add auth token if admin login protects this route
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete product');
        }
        // No content returned for successful delete usually, just status
        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// Placeholder for fetching a single product by ID (if needed for editing)
export const fetchProductById = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
        throw error;
    }
};

// Add API functions for orders, admin login etc. here as needed
// Example for admin login (if you want to implement real login later):
/*
export const adminLogin = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }
    return response.json();
};
*/