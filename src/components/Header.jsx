import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo.png";

export default function Header() {
    const { cartItems } = useContext(CartContext);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/">
                    <img src={logo} alt="Kostuemshop Logo" className="h-10" />
                </Link>
                <nav className="flex gap-4 items-center">
                    <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
                    <Link to="/cart" className="relative">
                        🛒
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cartItems.length}
            </span>
                    </Link>
                    <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
                </nav>
            </div>
        </header>
    );
}
