import React from 'react';

function ProductDetail({ product, addToCart }) {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex flex-col md:flex-row">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full md:w-1/2 rounded-md"
                />
                <div className="md:ml-8 mt-4 md:mt-0">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="mt-2 text-lg text-gray-700">{product.description}</p>
                    <p className="mt-4 text-xl font-semibold">{product.price} €</p>
                    <button
                        onClick={addToCart}
                        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md"
                    >
                        In den Warenkorb
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
