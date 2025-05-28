import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const userData = await getCurrentUser(token);
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } catch (err) {
                console.error("Fehler beim Abrufen des Benutzers:", err);
                logout(); // Token ungültig – alles zurücksetzen
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const login = async (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);

        try {
            const userData = await getCurrentUser(newToken);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true; // Erfolg
        } catch (err) {
            console.error("Fehler beim Login:", err);
            logout();
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const isAuthenticated = !!token && !!user;
    const isAdmin = !!user?.isAdmin;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, isAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
