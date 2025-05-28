import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products = [], onEdit, onDelete }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product._id} className="relative group">
                    <ProductCard product={product} />
                    {onEdit && onDelete && (
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(product)}
                                className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
                            >
                                Bearbeiten
                            </button>
                            <button
                                onClick={() => onDelete(product._id)}
                                className="bg-red-500 text-white text-sm px-2 py-1 rounded"
                            >
                                Löschen
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
