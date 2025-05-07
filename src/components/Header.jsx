import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    🎭 Kostümshop
                </Link>
                <nav className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/cart" className="hover:underline">Warenkorb</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Registrieren</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
