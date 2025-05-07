import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-sm mt-10">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Company Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Kostümshop GmbH</h4>
                    <p>Mustergasse 12<br />8000 Zürich<br />Schweiz</p>
                    <p className="mt-2">Tel: +41 44 123 45 67</p>
                    <p>Email: info@kostuemshop.ch</p>
                </div>

                {/* Legal Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Rechtliches</h4>
                    <ul className="space-y-1">
                        <li><Link to="/impressum" className="hover:underline">Impressum</Link></li>
                        <li><Link to="/datenschutz" className="hover:underline">Datenschutzerklärung</Link></li>
                        <li><Link to="/AGB" className="hover:underline">AGB</Link></li>
                        <li><Link to="/Widerrufsrecht" className="hover:underline">Widerrufsrecht</Link></li>
                    </ul>
                </div>

                {/* Payment & Security Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Zahlung & Versand</h4>
                    <p>Sichere Zahlung mit SSL-Verschlüsselung.</p>
                    <p className="mt-1">Versand durch zuverlässige Partner in der Schweiz.</p>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-6 py-4 text-center text-xs">
                © {new Date().getFullYear()} Kostümshop GmbH. Alle Rechte vorbehalten.
            </div>
        </footer>
    );
};

export default Footer;