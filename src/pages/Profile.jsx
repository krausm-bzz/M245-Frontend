import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUser, updateUser, deleteUser } from '../services/api';

const getLabel = (key) => {
    const labels = {
        username: 'Benutzername',
        firstName: 'Vorname',
        lastName: 'Nachname',
        email: 'E-Mail',
        street: 'Strasse',
        city: 'Stadt',
        state: 'Bundesland',
        zip: 'Postleitzahl',
        country: 'Land',
        phone: 'Telefonnummer'
    };
    return labels[key] || key;
};

function Profile() {
    const { user, token, logout, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [authLoading, isAuthenticated, navigate]);

    useEffect(() => {
        if (!authLoading && isAuthenticated && user) {
            const fetchData = async () => {
                try {
                    const data = await getUser(token);
                    setFormData({
                        username: data.username,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        street: data.address?.street || '',
                        city: data.address?.city || '',
                        state: data.address?.state || '',
                        zip: data.address?.zip || '',
                        country: data.address?.country || '',
                        phone: data.phone || ''
                    });
                } catch (err) {
                    setError('Fehler beim Abrufen der Benutzerdaten: ' + err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [authLoading, isAuthenticated, user, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await updateUser(formData, token);
            alert('Daten wurden erfolgreich aktualisiert!');
            setIsEditing(false);
        } catch (err) {
            setError('Fehler beim Speichern der Daten: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Möchtest du dein Konto wirklich löschen? Dies kann nicht rückgängig gemacht werden.');
        if (!confirmDelete) return;

        try {
            await deleteUser(token);
            logout();
            alert('Konto wurde gelöscht.');
            navigate('/');
        } catch (err) {
            setError('Fehler beim Löschen des Kontos: ' + err.message);
        }
    };

    if (authLoading || loading || !formData) {
        return <div>Lädt...</div>;
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center mb-4">Mein Konto</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {!isEditing ? (
                <div>
                    <ul className="space-y-2">
                        {Object.entries(formData).map(([key, value]) => (
                            <li key={key} className="flex justify-between border-b pb-1">
                                <span className="font-medium">{getLabel(key)}:</span>
                                <span>{value}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex justify-between gap-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full bg-blue-500 text-white py-2 rounded-md"
                        >
                            Konto bearbeiten
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full bg-red-500 text-white py-2 rounded-md"
                        >
                            Konto löschen
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className="mb-4">
                            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                                {getLabel(key)}
                            </label>
                            <input
                                type="text"
                                id={key}
                                className="w-full mt-1 p-2 border rounded-md"
                                value={value}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div className="flex justify-between mt-4 gap-4">
                        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">
                            Speichern
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="w-full bg-gray-400 text-white py-2 rounded-md"
                        >
                            Abbrechen
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Profile;
