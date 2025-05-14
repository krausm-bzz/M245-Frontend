import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader'; // falls vorhanden
import { getAllProducts } from '../services/api.js'; // API-Fetch

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getAllProducts(); // Beispiel-Fetch
                setProducts(result);
            } catch (error) {
                console.error('Fehler beim Laden der Produkte:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Alle Kostüme</h1>

            {loading ? (
                <Loader />
            ) : products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <p className="text-gray-600">Keine Produkte gefunden.</p>
            )}
        </div>
    );
}
