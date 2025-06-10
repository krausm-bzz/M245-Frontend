import React from 'react';

function ProductDetail({ product, addToCart }) {
    // Extract the first image (if available) to display as the main image
    const mainImage =
        product.images && product.images.length > 0
            ? 'http://localhost:5000' + product.images[0].replace(/\\/g, '/')
            : null;

    console.log(mainImage);

    // Check if there's a valid discount (amount > 0 and not expired)
    const hasValidDiscount = product.discount &&
        product.discount.amount > 0 &&
        product.discount.expiresAt &&
        new Date(product.discount.expiresAt) > new Date();

    // Calculate the price after discount (if applicable)
    const priceWithDiscount = hasValidDiscount
        ? (product.price - product.discount.amount).toFixed(2)
        : product.price;



    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex flex-col md:flex-row">
                {mainImage && (
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full md:w-1/2 rounded-md"
                    />
                )}
                <div className="md:ml-8 mt-4 md:mt-0">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="mt-2 text-lg text-gray-700">{product.description}</p>
                    <p className="mt-4 text-xl font-semibold">
                        {hasValidDiscount && (
                            <span className="line-through text-gray-500 mr-2">{product.price} €</span>
                        )}
                        {priceWithDiscount} €
                    </p>

                    {/* Display available sizes and stock */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Sizes & Stock</h3>
                            <ul className="space-y-2">
                                {product.sizes.map((size, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{size.size}</span>
                                        <span>{size.stock > 0 ? `${size.stock} in stock` : 'Out of stock'}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Display discount if available and valid */}
                    {hasValidDiscount && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-green-600">Discount</h3>
                            <p className="text-sm">Save {product.discount.amount} €</p>
                            <p className="text-sm text-gray-500">
                                Expires on {new Date(product.discount.expiresAt).toLocaleDateString()}
                            </p>
                        </div>
                    )}

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