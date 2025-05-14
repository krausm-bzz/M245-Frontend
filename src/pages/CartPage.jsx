import React from 'react';
import Cart from './Cart';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const { cartItems, removeFromCart } = useCart();

    const total = cartItems.reduce((sum, item) => {
        const price = item?.productId?.price || item?.price || 0;
        return sum + (item.quantity * price);
    }, 0);

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="p-4 text-center">
                <p>Dein Warenkorb ist leer.</p>
                <Link to="/" className="text-blue-600 underline">Zurück zur Startseite</Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Dein Warenkorb</h1>
            <div className="space-y-4">
                {cartItems.map((item, index) => (
                    <Cart
                        key={item._id || item.productId?._id || index}
                        item={item}
                        onRemove={removeFromCart}
                    />
                ))}
            </div>
            <div className="mt-6 text-right text-xl font-semibold">
                Gesamt: {total.toFixed(2)} €
            </div>
            <div className="text-right mt-4">
                <Link
                    to="/checkout"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                    Zur Kasse
                </Link>
            </div>
        </div>
    );
}
