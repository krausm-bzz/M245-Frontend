import React, { useEffect, useState } from 'react';
import { fetchProductImage } from '../services/api'; // make sure this exists!

const API_BASE = 'http://localhost:5000/'; // or wherever your backend lives

export default function ProductCard({ product }) {
    const { name, description, price, discount, sizes, images } = product;
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (images?.[0]) {
            fetchProductImage(images[0])
                .then(url => setImageUrl(url))
                .catch(() => setImageUrl(null));
        }
    }, [images]);

    const discountedPrice = discount && new Date(discount.expiresAt) > new Date()
        ? (price - discount.amount).toFixed(2)
        : null;

    const availableSizes = sizes?.filter(s => s.stock > 0).map(s => s.size).join(', ');

    return (
        <div className="p-4 border rounded shadow hover:shadow-md transition">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-48 object-cover rounded mb-3"
                />
            )}
            <h3 className="text-lg font-semibold mb-1">{name}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>

            <div className="mb-2">
                {discountedPrice ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-red-600 font-bold">{discountedPrice} €</span>
                        <span className="line-through text-gray-500">{price.toFixed(2)} €</span>
                    </div>
                ) : (
                    <span className="font-bold">{price.toFixed(2)} €</span>
                )}
            </div>

            {availableSizes && (
                <p className="text-sm text-gray-700">
                    Größen: <span className="font-medium">{availableSizes}</span>
                </p>
            )}
        </div>
    );
}
