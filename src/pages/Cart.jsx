import React from 'react';

export default function Cart({ item, onRemove }) {
    return (
        <div className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center gap-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                />
                <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                        {item.quantity} × {item.price.toFixed(2)} €
                    </p>
                    <p className="text-gray-800 font-bold">
                        {(item.quantity * item.price).toFixed(2)} €
                    </p>
                </div>
            </div>

            <button
                onClick={() => onRemove(item.id)}
                className="text-red-600 hover:underline"
            >
                Entfernen
            </button>
        </div>
    );
}
