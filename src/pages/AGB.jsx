import React from 'react';

const AGB = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Allgemeine Geschäftsbedingungen (AGB)</h1>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Geltungsbereich</h2>
            <p>
                Diese AGB gelten für alle Bestellungen über unseren Online-Shop durch Verbraucher und Unternehmer.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Vertragspartner, Vertragsschluss</h2>
            <p>
                Der Kaufvertrag kommt zustande mit der Kostümshop GmbH. Die Darstellung der Produkte im Online-Shop stellt
                kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Preise und Versandkosten</h2>
            <p>
                Alle Preise verstehen sich in CHF inklusive gesetzlicher Mehrwertsteuer. Versandkosten werden im Warenkorb
                und vor Abschluss der Bestellung separat ausgewiesen.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Bezahlung</h2>
            <p>
                Die Zahlung erfolgt wahlweise per Kreditkarte, TWINT oder Vorauskasse.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Eigentumsvorbehalt</h2>
            <p>
                Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.
            </p>

            <p className="mt-6 text-sm text-gray-600">Stand: {new Date().toLocaleDateString()}</p>
        </div>
    );
};

export default AGB;
