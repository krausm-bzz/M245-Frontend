import React from 'react';

const Widerruf = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Widerrufsrecht</h1>

            <p>
                Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Widerrufsfrist</h2>
            <p>
                Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter,
                der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Widerrufserklärung</h2>
            <p>
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Kostümshop GmbH, Mustergasse 12, 8000 Zürich,
                Schweiz, info@kostuemshop.ch) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter
                Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Folgen des Widerrufs</h2>
            <p>
                Wenn Sie diesen Vertrag widerrufen, erstatten wir Ihnen alle Zahlungen, die wir von Ihnen erhalten
                haben, einschließlich der Lieferkosten, unverzüglich und spätestens binnen 14 Tagen.
            </p>

            <p className="mt-6 text-sm text-gray-600">Stand: {new Date().toLocaleDateString()}</p>
        </div>
    );
};

export default Widerruf;
