import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="mt-4 text-xl text-gray-700">Seite nicht gefunden</p>
                <p className="mt-2 text-lg text-gray-500">Die von Ihnen angeforderte Seite existiert nicht.</p>
                <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-md">
                    Zurück zur Startseite
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
