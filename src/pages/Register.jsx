import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Zum Zugriff auf den AuthContext
//import { registerUser } from '../services/api.js'; // API-Service zum Registrieren eines Benutzers

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();  // Um den Benutzer nach der Registrierung einzuloggen
    const navigate = useNavigate();  // Zum Weiterleiten nach erfolgreicher Registrierung

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // API-Aufruf zur Registrierung des Benutzers
            const userData = await registerUser({ email, password, username });
            login(userData); // Nach erfolgreicher Registrierung den Benutzer einloggen
            navigate('/'); // Weiterleitung zur Startseite nach der Anmeldung
        } catch (err) {
            setError('Registrierung fehlgeschlagen: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center">Registrieren</h2>

            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Benutzername
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Benutzername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-Mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="E-Mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Passwort
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white py-3 rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Registrieren...' : 'Jetzt Registrieren'}
                </button>
            </form>

            <p className="mt-4 text-center text-sm">
                Schon ein Konto?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                    Anmelden
                </a>
            </p>
        </div>
    );
}

export default Register;
