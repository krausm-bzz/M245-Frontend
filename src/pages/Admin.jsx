import React, { useEffect, useState } from 'react';
import productService from '../services/api'; // passt das ggf. an, je nach Struktur
import ProductList from '../components/ProductList'; // zur Not erstellen wir einfache Darstellung

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const res = await productService.getAllProducts();
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
        if (confirm('Produkt wirklich löschen?')) {
            try {
                await productService.deleteProduct(id);
                loadProducts();
            } catch (err) {
                console.error('Fehler beim Löschen', err);
            }
        }
    };

    const handleSave = async (data) => {
        try {
            if (editingProduct) {
                await productService.updateProduct(editingProduct.id, data);
            } else {
                await productService.createProduct(data);
            }
            setShowForm(false);
            loadProducts();
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
