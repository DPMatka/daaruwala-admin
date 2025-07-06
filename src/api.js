// IMPORTANT: Update this URL with YOUR LIVE Render backend URL (same as frontend)
const API_URL = 'https://daaruwala-backend-5i6g.onrender.com/api'; // Replace with YOUR Render URL!

// Example function to fetch products from backend
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            // If the response is not OK (e.g., 404, 500 error)
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching products from backend:", error);
        // Optionally, return an empty array or rethrow the error
        return []; // Return empty array on error for graceful handling
    }
};

// Add more API functions as needed for auth, orders, etc.
// Example for admin login:
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