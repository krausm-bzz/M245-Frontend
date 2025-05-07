import React, { createContext, useState, useContext } from 'react';

// 1. Context erstellen
export const CartContext = createContext();

// 2. Provider-Komponente exportieren
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Produkt zum Warenkorb hinzufügen
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existing = prevItems.find((item) => item.id === product.id);
            if (existing) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    // Produkt aus dem Warenkorb entfernen
    const removeFromCart = (id) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );
    };

    // Warenkorb komplett leeren
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// 3. Custom Hook (optional, für bequemere Nutzung)
export const useCart = () => useContext(CartContext);
