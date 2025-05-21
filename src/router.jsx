import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product'; // ← this is the correct one
import Cart from './pages/CartPage';
import Checkout from './pages/Checkout';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AdminDashboard from './pages/Admin';
import AGB from './pages/AGB';
import Widerrufsrecht from './pages/Widerruf.jsx';
import Profile from './pages/Profile'; // Pfad ggf. anpassen


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/AGB" element={<AGB />} />
            <Route path="/Widerrufsrecht" element={<Widerrufsrecht />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default AppRoutes;
