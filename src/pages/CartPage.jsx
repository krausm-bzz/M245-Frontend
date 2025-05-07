import Cart from './Cart';

// ...
{cartItems.map((item) => (
    <Cart key={item.id} item={item} onRemove={removeFromCart} />
))}
// ...
