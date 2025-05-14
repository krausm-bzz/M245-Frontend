import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';
import Cart from './Cart';

export default function Checkout() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            alert('Bitte logge dich ein, um den Kauf abzuschließen.');
            navigate('/login');
            return;
        }

        setLoading(true);

        try {
            const orderData = {
                customerId: user._id,
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: total,
                shippingAddress: {
                    fullName: `${user.firstName} ${user.lastName}`,
                    addressLine1: user.address?.street || '',
                    city: user.address?.city || '',
                    postalCode: user.address?.zip || '',
                    country: user.address?.country || ''
                }
            };

            const response = await createOrder(orderData);

            alert('Vielen Dank für deinen Einkauf!');
            clearCart();
            navigate('/');

        } catch (error) {
            console.error('Fehler beim Bestellen:', error);
            alert('Beim Abschließen der Bestellung ist ein Fehler aufgetreten.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return <div className="p-4 text-center">Dein Warenkorb ist leer.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Zur Kasse</h1>
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
                disabled={loading}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
                {loading ? 'Bestellung wird verarbeitet...' : 'Jetzt kaufen'}
            </button>
        </div>
    );
}
