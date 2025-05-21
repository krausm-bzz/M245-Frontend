import React, { useState, useEffect, useRef } from 'react';
import { createProduct } from "../services/api.js";

const ProductForm = ({ product, onCancel }) => {
    const [newSize, setNewSize] = useState('');
    const [newStock, setNewStock] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        images: [],
        category: '',
        sizes: [],
        discount: { amount: '', expiresAt: '' },
        tags: '',
        material: '',
        gender: '',
        ageGroup: '',
    });

    const hasSubmitted = useRef(false);
    const initialized = useRef(false); // ✅ Fix: define initialized ref

    useEffect(() => {
        if (product && !initialized.current) {
            initialized.current = true;
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                images: [],
                category: product.category || '',
                sizes: product.sizes || [],
                discount: product.discount || { amount: '', expiresAt: '' },
                tags: product.tags?.join(', ') || '',
                material: product.material || '',
                gender: product.gender || '',
                ageGroup: product.ageGroup || '',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'discountAmount') {
            setFormData(prev => ({
                ...prev,
                discount: {
                    ...prev.discount,
                    amount: value
                }
            }));
        } else if (name === 'expiresAt') {
            setFormData(prev => ({
                ...prev,
                discount: {
                    ...prev.discount,
                    expiresAt: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSave = async () => {
        if (hasSubmitted.current) return;
        hasSubmitted.current = true;


        try {
            const token = localStorage.getItem('token');
            const formPayload = new FormData();

            formPayload.append('name', formData.name);
            formPayload.append('description', formData.description);
            formPayload.append('price', formData.price);
            formPayload.append('category', formData.category);
            formPayload.append('material', formData.material);
            formPayload.append('gender', formData.gender);
            formPayload.append('ageGroup', formData.ageGroup);
            formPayload.append('discount[amount]', formData.discount.amount || '');
            formPayload.append('discount[expiresAt]', formData.discount.expiresAt || '');
            formPayload.append('sizes', JSON.stringify(formData.sizes));
            formPayload.append('tags', JSON.stringify(formData.tags.split(',').map(t => t.trim()).filter(Boolean)));

            if (formData.images && formData.images.length > 0) {
                formData.images.forEach(file => formPayload.append('images', file));
            }

            await createProduct(formPayload, token);

            // ✅ Reset form after successful submission
            setFormData({
                name: '',
                description: '',
                price: '',
                images: [],
                category: '',
                sizes: [],
                discount: { amount: '', expiresAt: '' },
                tags: '',
                material: '',
                gender: '',
                ageGroup: '',
            });

            setNewSize('');
            setNewStock('');
            initialized.current = false;
            hasSubmitted.current = false;

        } catch (err) {
            console.error('Fehler beim Erstellen des Produkts:', err);
            hasSubmitted.current = false;
        }
    };

    const handleAddSize = () => {
        if (newSize && newStock && !isNaN(newStock)) {
            setFormData(prev => ({
                ...prev,
                sizes: [...prev.sizes, { size: newSize.trim(), stock: parseInt(newStock, 10) }]
            }));
            setNewSize('');
            setNewStock('');
        }
    };

    const handleRemoveSize = (index) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{product ? 'Produkt bearbeiten' : 'Neues Produkt erstellen'}</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Beschreibung</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium">Preis (€)</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label htmlFor="images" className="block text-sm font-medium">Bilder (Dateien auswählen)</label>
                    <input type="file" id="images" name="images" multiple accept="image/*" onChange={(e) => setFormData(prev => ({ ...prev, images: Array.from(e.target.files) }))} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium">Kategorie</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Größen & Lagerbestand</label>
                    <div className="flex gap-2 mb-2">
                        <input type="text" placeholder="Größe" value={newSize} onChange={(e) => setNewSize(e.target.value)} className="p-2 border rounded w-1/2" />
                        <input type="number" placeholder="Lagerbestand" value={newStock} onChange={(e) => setNewStock(e.target.value)} className="p-2 border rounded w-1/2" />
                        <button type="button" onClick={handleAddSize} className="bg-green-500 text-white px-4 py-2 rounded">Hinzufügen</button>
                    </div>

                    {formData.sizes.length > 0 && (
                        <ul className="space-y-1">
                            {formData.sizes.map((s, index) => (
                                <li key={index} className="flex justify-between items-center border px-2 py-1 rounded">
                                    <span>{s.size} - {s.stock} Stück</span>
                                    <button type="button" onClick={() => handleRemoveSize(index)} className="text-red-500 hover:underline">Entfernen</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <label htmlFor="discount" className="block text-sm font-medium">Rabatt</label>
                    <div className="flex space-x-4">
                        <input type="number" id="discountAmount" name="discountAmount" value={formData.discount.amount} onChange={handleChange} className="w-1/2 p-2 border rounded-md" placeholder="Rabattbetrag" />
                        <input type="date" id="expiresAt" name="expiresAt" value={formData.discount.expiresAt} onChange={handleChange} className="w-1/2 p-2 border rounded-md" placeholder="Ablaufdatum" />
                    </div>
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium">Tags (durch Kommas trennen)</label>
                    <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label htmlFor="material" className="block text-sm font-medium">Material</label>
                    <input type="text" id="material" name="material" value={formData.material} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label htmlFor="gender" className="block text-sm font-medium">Geschlecht</label>
                    <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                    <label htmlFor="ageGroup" className="block text-sm font-medium">Zielgruppe</label>
                    <input type="text" id="ageGroup" name="ageGroup" value={formData.ageGroup} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>

                <div className="flex space-x-4 mt-4">
                    <button type="button" onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md">Speichern</button>
                    <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded-md">Abbrechen</button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
