import React from 'react';

export default function Cart({ item, onRemove }) {
    if (!item) return null; // 🛡️ Schutz gegen null/undefined

    // Wenn item.productId ein Objekt ist (vom Server z.B.), verwende das, sonst item selbst
    const product = typeof item.productId === 'object' ? item.productId : item;

    const image = product?.images?.[0]
        ? 'http://localhost:5000' + product.images[0].replace(/\\/g, '/')
        : '/placeholder.png';
    const name = product?.name || 'Unbekanntes Produkt';
    const price = product?.price || 0;
    const quantity = item.quantity || 1;
    const totalPrice = (quantity * price).toFixed(2);
    const productId = product?._id || item._id;

    return (
        <div className="flex items-center justify-between border p-4 rounded shadow-sm bg-white">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded overflow-hidden flex-shrink-0">
                    <img
                        src={image}
                        alt={name}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-gray-600">
                        {quantity} × {price.toFixed(2)} €
                    </p>
                    <p className="text-gray-800 font-bold">{totalPrice} €</p>
                </div>
            </div>
            <button
                onClick={() => onRemove(productId)}
                className="text-red-600 hover:underline"
            >
                Entfernen
            </button>
        </div>
    );
}
