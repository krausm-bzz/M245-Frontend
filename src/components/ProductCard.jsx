import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="border rounded-xl shadow hover:shadow-lg transition p-4">
            <Link to={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.price} €</p>
            </Link>
        </div>
    );
}
