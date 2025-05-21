import React, {useEffect, useRef, useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllProducts, deleteProduct, createProduct, updateProduct } from '../services/api';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { user, token, isAuthenticated } = useAuth();
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const didFetch = useRef(false);

    useEffect(() => {
        if (!isAuthenticated || !user?.isAdmin) {
            navigate('/');
        } else if (!didFetch.current) {
            didFetch.current = true;
            loadProducts();
        }
    }, [isAuthenticated, user]);

    const loadProducts = async () => {
        try {
            const res = await getAllProducts(token);
            setProducts(res);
        } catch (err) {
            console.error('Fehler beim Laden der Produkte', err);
        }
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Produkt wirklich löschen?')) {
            try {
                await deleteProduct(id, token);
                loadProducts();
            } catch (err) {
                console.error('Fehler beim Löschen', err);
            }
        }
    };

    const handleSave = async (data) => {
        try {
            // Überprüfen, ob das Produkt bearbeitet oder neu erstellt wird
            if (editingProduct) {
                // Wenn ein Produkt bearbeitet wird
                const updatedProduct = await updateProduct(editingProduct.id, data, token);
                console.log('Produkt erfolgreich aktualisiert:', updatedProduct);
            } else {
                // Wenn ein neues Produkt erstellt wird
                const newProduct = await createProduct(data, token);
                console.log('Neues Produkt erfolgreich erstellt:', newProduct);
            }

            setShowForm(false); // Formular schließen
            loadProducts(); // Liste der Produkte neu laden
        } catch (err) {
            console.error('Fehler beim Speichern des Produkts:', err);
        }
    };




    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Adminbereich</h1>
            <button
                onClick={handleAdd}
                className="bg-green-600 text-white px-4 py-2 rounded mb-4"
            >
                + Neues Produkt
            </button>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <ProductList
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Admin;
