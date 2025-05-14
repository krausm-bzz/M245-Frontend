import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, createProduct, updateProduct } from '../services/api'; // Passe den Importpfad nach Bedarf an
import ProductList from '../components/ProductList'; // Zur Not erstellen wir einfache Darstellung
import ProductForm from '../components/ProductForm'; // Annahme: Du hast ein Formular zur Bearbeitung von Produkten

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Lädt alle Produkte, wenn die Seite geladen wird
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res);
        } catch (err) {
            console.error('Fehler beim Laden der Produkte', err);
        }
    };

    const handleAdd = () => {
        setEditingProduct(null); // Keines zum Bearbeiten
        setShowForm(true); // Formular anzeigen
    };

    const handleEdit = (product) => {
        setEditingProduct(product); // Produkt zum Bearbeiten auswählen
        setShowForm(true); // Formular anzeigen
    };

    const handleDelete = async (id) => {
        if (window.confirm('Produkt wirklich löschen?')) {
            try {
                await deleteProduct(id); // Löscht das Produkt
                loadProducts(); // Lade die Produktliste nach dem Löschen neu
            } catch (err) {
                console.error('Fehler beim Löschen', err);
            }
        }
    };

    const handleSave = async (data) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, data); // Produkt aktualisieren
            } else {
                await createProduct(data); // Neues Produkt erstellen
            }
            setShowForm(false); // Formular schließen
            loadProducts(); // Lade die Produktliste nach dem Speichern neu
        } catch (err) {
            console.error('Fehler beim Speichern', err);
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
