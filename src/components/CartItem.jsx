export default function CartItem({ item, onUpdate, onRemove }) {
    return (
        <div className="flex justify-between items-center border-b py-4">
            <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p>{item.price} € x {item.quantity}</p>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button onClick={() => onUpdate(item.id, item.quantity - 1)} className="px-2 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdate(item.id, item.quantity + 1)} className="px-2 bg-gray-200 rounded">+</button>
                <button onClick={() => onRemove(item.id)} className="text-red-600 ml-4">Entfernen</button>
            </div>
        </div>
    );
}
