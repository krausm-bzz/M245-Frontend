import React from 'react';

const Impressum = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Impressum</h1>

            <p><strong>Firma:</strong> Kostümshop GmbH</p>
            <p><strong>Adresse:</strong> Mustergasse 12, 8000 Zürich, Schweiz</p>
            <p><strong>Vertretungsberechtigt:</strong> Max Muster, Geschäftsführer</p>
            <p><strong>Telefon:</strong> +41 44 123 45 67</p>
            <p><strong>E-Mail:</strong> info@kostuemshop.ch</p>
            <p><strong>Handelsregister:</strong> CH-123.456.789</p>
            <p><strong>UID-Nummer:</strong> CHE-123.456.789</p>

            <h2 className="text-xl font-semibold mt-8 mb-2">Haftungsausschluss</h2>
            <p>
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
                externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
        </div>
    );
};

export default Impressum;