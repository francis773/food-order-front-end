import React, { useEffect, useState } from "react";
import api from "../services/api";

const Menu = ({ setOrder }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({}); // Store items with quantity

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await api.get("/menu");
                setMenuItems(response.data);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenu();
    }, []);

    const handleSelectItem = (item) => {
        setSelectedItems((prevItems) => ({
            ...prevItems,
            [item.id]: {
                ...item,
                quantity: (prevItems[item.id]?.quantity || 0) + 1, // ✅ Increment quantity
            },
        }));
    };

    const handlePlaceOrder = () => {
        const tableNumber = prompt("Enter Table Number:");
        if (!tableNumber) return; // Prevent empty table number

        const orderRequest = {
            tableNumber,
            items: Object.values(selectedItems), // Convert object to array
        };
        
        console.log("🚀 Order Request Payload:", JSON.stringify(orderRequest, null, 2));
        
        api.post("/orders/place-order", orderRequest)
            .then((response) => {
                setOrder(response.data);
                alert("Order placed successfully!");
                setSelectedItems({}); // ✅ Clear order after submission
            })
            .catch((error) => {
                console.error("Error placing order:", error);
            });
    };

    return (
        <div className="menu-container p-6">
            <h2 className="text-2xl font-semibold mb-4">Menu</h2>
            <div className="grid grid-cols-2 gap-4">
                {menuItems.map((item) => (
                    <div key={item.id} className="border p-4 rounded-lg shadow-md text-center">
                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 mx-auto mb-2" />
                        <p className="font-bold">{item.name}</p>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                        <button
                            onClick={() => handleSelectItem(item)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg mt-2"
                        >
                            Add to Order
                        </button>
                    </div>
                ))}
            </div>

            {/* Show Cart Summary */}
            {Object.keys(selectedItems).length > 0 && (
                <div className="mt-6 p-4 border rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">Your Order</h3>
                    <ul>
                        {Object.values(selectedItems).map((item) => (
                            <li key={item.id} className="flex justify-between items-center">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg w-full"
                    >
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default Menu;
