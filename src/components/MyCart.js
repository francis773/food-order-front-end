const MyCart = ({ cart, setCart }) => {
    const incrementQuantity = (id) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decrementQuantity = (id) => {
        setCart(cart.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="border p-4 rounded-lg shadow-lg mt-6">
            <h2 className="text-lg font-bold mb-2">My Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id} className="flex justify-between items-center mb-2">
                            <span>{item.name} - {item.quantity}</span>
                            <div>
                                <button className="btn px-2" onClick={() => decrementQuantity(item.id)}>-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button className="btn px-2" onClick={() => incrementQuantity(item.id)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <p className="font-bold mt-4">Total: {'\u20B9'} {totalAmount}</p>
        </div>
    );
};

export default MyCart;
