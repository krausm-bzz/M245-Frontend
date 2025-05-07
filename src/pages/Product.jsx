import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProductById } from '../services/api.js';
import ProductDetail from '../pages/ProductDetail.jsx';

function Product() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
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
        if (isAuthenticated) {
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
