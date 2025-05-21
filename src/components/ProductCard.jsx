import { Link } from "react-router-dom";
import React from 'react';

export default function ProductCard({ product }) {
    // Get the first image (if available)
    const mainImage = product.images && product.images.length > 0 ? product.images[0] : null;

    // Calculate the price after discount (if applicable)
    const priceWithDiscount = product.discount
        ? product.price - product.discount.amount
        : product.price;

    return (
        <div className="border rounded-xl shadow hover:shadow-lg transition p-4">
            <Link to={`/product/${product._id}`}> {/* Change `product.id` to `product._id` if you are using MongoDB */}
                {mainImage && (
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded"
                    />
                )}
                <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">
                    {product.discount && (
                        <span className="line-through text-gray-400">{product.price} €</span>
                    )}
                    {priceWithDiscount} €
                </p>
            </Link>
        </div>
    );
}
