import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Optional: Du kannst auch die Cart-Komponente als Einzeleintrag importieren
import Cart from '../pages/Cart';

export default function Checkout() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (!isAuthenticated) {
            alert('Bitte logge dich ein, um den Kauf abzuschließen.');
            navigate('/login');
            return;
        }

        alert('Vielen Dank für deinen Einkauf!');
        clearCart();
        navigate('/');
    };

    if (cartItems.length === 0) {
        return <div className="p-4 text-center">Dein Warenkorb ist leer.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Warenkorb</h1>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <Cart key={item.id} item={item} onRemove={removeFromCart} />
                ))}
            </div>
            <div className="mt-6 text-right text-xl font-semibold">
                Gesamt: {total.toFixed(2)} €
            </div>
            <button
                onClick={handleCheckout}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md"
            >
                Jetzt kaufen
            </button>
        </div>
    );
}
