const API_BASE = 'http://localhost:5000/api';

// --- HELPER ---
const getAuthHeaders = (token) => ({
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
});

// --- USER ---
export const getAllUsers = async (token) => {
    const res = await fetch(`${API_BASE}/users`, {
        headers: getAuthHeaders(token)
    });
    return res.json();
};

export const getUser = async (userId, token) => {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
        headers: getAuthHeaders(token)
    });
    return res.json();
};

export const registerUser = async (data) => {
    const res = await fetch(`${API_BASE}/users/register`, {
        method: 'POST',
        headers: getAuthHeaders(), // No token needed for registration
        body: JSON.stringify(data)
    });
    return res.json();
};

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: getAuthHeaders(), // No token needed for login
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json(); // Should return { token: "..." }
};

export const updateUser = async (userId, data, token) => {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data)
    });
    return res.json();
};

export const deleteUser = async (userId, token) => {
    await fetch(`${API_BASE}/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token)
    });
};

// --- PRODUCT ---
export const getAllProducts = async (token) => {
    const res = await fetch(`${API_BASE}/products`, {
        headers: getAuthHeaders(token) // Ensure token is included
    });
    console.log(res)

    if (!res.ok) {
        throw new Error('Unauthorized or failed to fetch products');
    }

    return res.json();
};


export const getProduct = async (productId) => {
    const res = await fetch(`${API_BASE}/products/${productId}`);
    return res.json();
};

export const createProduct = async (data, token) => {
    const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`, // kein Content-Type bei FormData
        },
        body: data,  // data ist schon FormData vom Frontend
    });

    if (!res.ok) {
        throw new Error('Produkt konnte nicht erstellt werden');
    }

    return res.json();
};




export const updateProduct = async (productId, data, token) => {
    const res = await fetch(`${API_BASE}/products/${productId}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error('Produkt konnte nicht aktualisiert werden');
    }

    return res.json();
};


export const deleteProduct = async (productId, token) => {
    await fetch(`${API_BASE}/products/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token)
    });
};

// --- ORDER ---
export const getAllOrders = async (token) => {
    const res = await fetch(`${API_BASE}/orders`, {
        headers: getAuthHeaders(token)
    });
    return res.json();
};

export const getOrdersByUser = async (userId, token) => {
    const res = await fetch(`${API_BASE}/orders/user/${userId}`, {
        headers: getAuthHeaders(token)
    });
    return res.json();
};

export const getOrder = async (orderId, token) => {
    const res = await fetch(`${API_BASE}/orders/${orderId}`, {
        headers: getAuthHeaders(token)
    });
    return res.json();
};

export const createOrder = async (data, token) => {
    const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data)
    });
    return res.json();
};

export const updateOrderStatus = async (orderId, status, token) => {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ status })
    });
    return res.json();
};

export const deleteOrder = async (orderId, token) => {
    await fetch(`${API_BASE}/orders/${orderId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token)
    });
};

// --- CURRENT USER ---
export const getCurrentUser = async (token) => {
    const res = await fetch(`${API_BASE}/users/me`, {
        headers: getAuthHeaders(token)
    });

    if (!res.ok) throw new Error("Nicht authentifiziert");

    return res.json();
};


export const updateCurrentUser = async (data, token) => {
    const res = await fetch(`${API_BASE}/users/me`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data)
    });

    return res.json();
};

export const deleteCurrentUser = async (token) => {
    const res = await fetch(`${API_BASE}/users/me`, {
        method: 'DELETE',
        headers: getAuthHeaders(token)
    });

    if (!res.ok) {
        throw new Error('Failed to delete current user');
    }

    return res.json();
};
