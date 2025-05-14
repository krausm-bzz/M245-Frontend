import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
//import { loginUser } from '../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Bitte füllen Sie alle Felder aus.');
            return;
        }

        try {
            const response = await loginUser(email, password);
            if (response.success) {
                login(response.user);
                navigate('/');
            } else {
                setError(response.message || 'Anmeldung fehlgeschlagen.');
            }
        } catch (err) {
            setError('Es gab ein Problem bei der Anmeldung.');
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Anmelden</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-Mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md"
                >
                    Anmelden
                </button>
            </form>

            <p className="mt-4 text-center text-sm">
                Noch kein Konto?{' '}
                <a href="/register" className="text-blue-500 hover:underline">
                    Jetzt registrieren
                </a>
            </p>
        </div>
    );
}

export default Login;
