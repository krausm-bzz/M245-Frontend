import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Token aus LocalStorage laden
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            // Optional: Hier könntest du Token validieren oder Userdaten laden
            setToken(savedToken);
            setIsAuthenticated(true);
            // Beispiel: user aus Token extrahieren oder API Request machen
            setUser({ email: 'demo@example.com' }); // Dummy User, ersetze nach Bedarf
        } else {
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
        }
        setLoading(false);
    }, []);

    const login = (newToken, userData) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
