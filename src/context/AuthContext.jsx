import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Context erstellen
export const AuthContext = createContext();

// 2. Provider-Komponente
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Bei App-Start prüfen, ob User gespeichert ist
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Einloggen
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Ausloggen
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Prüfen ob eingeloggt
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Optionaler Custom Hook
export const useAuth = () => useContext(AuthContext);
