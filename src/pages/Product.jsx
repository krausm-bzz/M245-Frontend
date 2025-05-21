import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProduct } from '../services/api.js';
import ProductDetail from '../pages/ProductDetail.jsx';
import { useCart } from '../context/CartContext'; // ✅ import this


function Product() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const { addToCart: addItemToCart } = useCart(); // ✅ get the context method

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct(id);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Produkt konnte nicht geladen werden');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = () => {
        if (!product) return;

        if (isAuthenticated) {
            addItemToCart(product); // ✅ this adds it to the cart
            console.log('Produkt zum Warenkorb hinzugefügt:', product);
        } else {
            alert('Bitte logge dich ein, um Produkte hinzuzufügen.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return <ProductDetail product={product} addToCart={addToCart} />;
}

export default Product;
