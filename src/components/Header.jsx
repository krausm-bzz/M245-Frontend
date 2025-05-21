import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importiere AuthContext
import logo from '../assets/logo.png';

export default function Header() {
    const { cartItems } = useContext(CartContext);
    const { isAuthenticated, user, logout } = useAuth(); // Zugriff auf AuthContext

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/">
                    <img src={logo} alt="Kostuemshop Logo" className="h-10" />
                </Link>
                <nav className="flex gap-4 items-center">
                    <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
                    <Link to="/cart" className="relative">
                        🛒
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                            {cartItems.length}
                        </span>
                    </Link>

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
