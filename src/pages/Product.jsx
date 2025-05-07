import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Um die Produkt-ID aus der URL zu holen
import { useAuth } from '../context/AuthContext';  // AuthContext für den aktuellen Benutzer
import { getProductById } from '../services/api.js'; // API-Service zum Abrufen von Produktdetails

function Product() {
    const { id } = useParams(); // Hole die Produkt-ID aus der URL
    const { isAuthenticated, user } = useAuth(); // Überprüfen, ob der Benutzer eingeloggt ist
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Produktdaten laden
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

    // In den Warenkorb legen
    const addToCart = () => {
        if (isAuthenticated) {
            // Hier könnte eine Funktion aus dem `CartContext` aufgerufen werden, um das Produkt hinzuzufügen
            console.log('Produkt zum Warenkorb hinzugefügt:', product);
        } else {
            alert('Bitte logge dich ein, um Produkte hinzuzufügen.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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

export default Product;
