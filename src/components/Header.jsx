import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
const API_BASE = 'http://localhost:5000/';

export default function Header() {
    const { cartItems } = useContext(CartContext);
    const { isAuthenticated, isAdmin, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3">
                    <img src={logo} alt="Kostuemshop Logo" className="h-14" />
                    <span className="text-xl font-bold text-gray-800">Outrageous Outfits</span>
                </Link>
                <nav className="flex gap-4 items-center">
                    <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
                    <Link to="/cart" className="relative">
                        🛒
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                        {cartItems.length}
                    </span>
                    </Link>

                    {!loading && isAuthenticated && isAdmin && (
                        <Link to="/admin" className="text-gray-700 hover:text-purple-600">Admin</Link>
                    )}

                    {/* Anzeigen der Login/Registrieren-Links, wenn der Benutzer nicht eingeloggt ist */}
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
                            <Link to="/register" className="text-gray-700 hover:text-blue-500">Registrieren</Link>
                        </>
                    ) : (
                        <>
                            {/* Anzeigen des Profil-Links und Logout-Buttons, wenn der Benutzer eingeloggt ist */}
                            <Link to="/profile" className="text-gray-700 hover:text-blue-500">Profil</Link>
                            <button
                                onClick={logout} // Logout-Funktion beim Klicken
                                className="text-gray-700 hover:text-blue-500"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
