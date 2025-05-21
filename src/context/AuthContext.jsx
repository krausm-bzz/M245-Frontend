import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUser } from '../services/api'; // Funktion, die Userdaten vom Backend holt

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        try {
            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
        }
    }, []);

    // login ist jetzt async, lädt Userdaten nach Setzen des Tokens
    const login = async (tokenValue) => {
        setToken(tokenValue);
        localStorage.setItem('token', tokenValue);

        try {
            const userData = await getUser(tokenValue);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Fehler beim Laden der Benutzerdaten:', error);
            logout();
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
