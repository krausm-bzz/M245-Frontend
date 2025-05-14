const API_BASE = 'http://localhost:5000/api';

// --- USER ---
export const getAllUsers = async () => {
    const res = await fetch(`${API_BASE}/users`);
    return res.json();
};

export const getUser = async (userId) => {
    const res = await fetch(`${API_BASE}/users/${userId}`);
    return res.json();
};

export const registerUser = async (data) => {
    const res = await fetch(`${API_BASE}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const loginUser = async (data) => {
    const res = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
};

export const updateUser = async (userId, data) => {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const deleteUser = async (userId) => {
    await fetch(`${API_BASE}/users/${userId}`, {
        method: 'DELETE'
    });
};

// --- PRODUCT ---
export const getAllProducts = async () => {
    const res = await fetch(`${API_BASE}/products`);
    return res.json();
};

export const getProduct = async (productId) => {
    const res = await fetch(`${API_BASE}/products/${productId}`);
    return res.json();
};

export const createProduct = async (data) => {
    const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const updateProduct = async (productId, data) => {
    const res = await fetch(`${API_BASE}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const deleteProduct = async (productId) => {
    await fetch(`${API_BASE}/products/${productId}`, {
        method: 'DELETE'
    });
};

// --- ORDER ---
export const getAllOrders = async () => {
    const res = await fetch(`${API_BASE}/orders`);
    return res.json();
};

export const getOrdersByUser = async (userId) => {
    const res = await fetch(`${API_BASE}/orders/user/${userId}`);
    return res.json();
};

export const getOrder = async (orderId) => {
    const res = await fetch(`${API_BASE}/orders/${orderId}`);
    return res.json();
};

export const createOrder = async (data) => {
    const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const updateOrderStatus = async (orderId, status) => {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    return res.json();
};

export const deleteOrder = async (orderId) => {
    await fetch(`${API_BASE}/orders/${orderId}`, {
        method: 'DELETE'
    });
};
