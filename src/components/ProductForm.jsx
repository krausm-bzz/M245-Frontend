import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        images: '',
        category: '',
        sizes: '',
        discount: { amount: '', expiresAt: '' },
        tags: '',
        material: '',
        gender: '',
        ageGroup: '',
    });

    // Populate the form if editing an existing product
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                images: product.images?.join(', ') || '',
                category: product.category || '',
                sizes: product.sizes?.map(size => `${size.size}:${size.stock}`).join(', ') || '',
                discount: product.discount || { amount: '', expiresAt: '' },
                tags: product.tags?.join(', ') || '',
                material: product.material || '',
                gender: product.gender || '',
                ageGroup: product.ageGroup || '',
            });
        }
    }, [product]);

    // Handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Convert sizes to the right format
    const handleSave = () => {
        const sizesArray = formData.sizes.split(',').map(size => {
            const [sizeName, stock] = size.split(':');
            return { size: sizeName.trim(), stock: parseInt(stock.trim()) };
        });

        const dataToSave = {
            ...formData,
            sizes: sizesArray,
            images: formData.images.split(',').map(img => img.trim()),
            tags: formData.tags.split(',').map(tag => tag.trim()),
        };

        onSave(dataToSave); // Pass the form data to the parent for saving
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{product ? 'Produkt bearbeiten' : 'Neues Produkt erstellen'}</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Beschreibung</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium">Preis (€)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="images" className="block text-sm font-medium">Bilder (URLs durch Kommas trennen)</label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium">Kategorie</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="sizes" className="block text-sm font-medium">Größen & Lager (Größe:Bestand, durch Kommas trennen)</label>
                    <input
                        type="text"
                        id="sizes"
                        name="sizes"
                        value={formData.sizes}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="discount" className="block text-sm font-medium">Rabatt</label>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            id="discountAmount"
                            name="discountAmount"
                            value={formData.discount.amount}
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded-md"
                            placeholder="Rabattbetrag"
                        />
                        <input
                            type="date"
                            id="expiresAt"
                            name="expiresAt"
                            value={formData.discount.expiresAt}
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded-md"
                            placeholder="Ablaufdatum"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="tags" className="block text-sm font-medium">Tags (durch Kommas trennen)</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="material" className="block text-sm font-medium">Material</label>
                    <input
                        type="text"
                        id="material"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="gender" className="block text-sm font-medium">Geschlecht</label>
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="ageGroup" className="block text-sm font-medium">Zielgruppe</label>
                    <input
                        type="text"
                        id="ageGroup"
                        name="ageGroup"
                        value={formData.ageGroup}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="flex space-x-4 mt-4">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Speichern
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md"
                    >
                        Abbrechen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
