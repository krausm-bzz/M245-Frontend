import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Zum Zugriff auf den AuthContext
import { registerUser } from '../services/api.js'; // API-Service zum Registrieren eines Benutzers

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();  // Um den Benutzer nach der Registrierung einzuloggen
    const navigate = useNavigate();  // Zum Weiterleiten nach erfolgreicher Registrierung

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validierung der Eingabefelder
        if (!email || !password || !username || !firstName || !lastName || !street || !city || !zip || !country || !phone) {
            setError('Alle Felder sind erforderlich!');
            setLoading(false);
            return;
        }

        try {
            // API-Aufruf zur Registrierung des Benutzers mit allen notwendigen Feldern
            const userData = await registerUser({
                email,
                password,
                username,
                firstName,
                lastName,
                address: { street, city, state, zip, country },
                phone
            });
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
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Vorname
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Vorname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Nachname
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Nachname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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

                <div className="mb-4">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                        Straße
                    </label>
                    <input
                        type="text"
                        id="street"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Straße"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Stadt
                    </label>
                    <input
                        type="text"
                        id="city"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Stadt"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        Bundesland
                    </label>
                    <input
                        type="text"
                        id="state"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Bundesland"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                        Postleitzahl
                    </label>
                    <input
                        type="text"
                        id="zip"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Postleitzahl"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Land
                    </label>
                    <input
                        type="text"
                        id="country"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Land"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefonnummer
                    </label>
                    <input
                        type="text"
                        id="phone"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                        placeholder="Telefonnummer"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
