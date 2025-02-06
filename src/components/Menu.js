import React, { useEffect, useState } from "react";
import api from "../services/api";

const Menu = ({ setOrder }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

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
        setSelectedItems((prevItems) => [...prevItems, item]);
    };

    const handlePlaceOrder = () => {
        const tableNumber = prompt("Enter Table Number:");
        const orderRequest = { tableNumber, items: selectedItems };

        api.post("/orders/place-order", orderRequest)
            .then((response) => {
                setOrder(response.data); // Update parent with the placed order
                alert("Order placed successfully!");
            })
            .catch((error) => {
                console.error("Error placing order:", error);
            });
    };

    return (
        <div className="menu-container">
            <h2 className="text-2xl font-semibold mb-4">Menu</h2>
            <div className="menu-items">
                {menuItems.map((item) => (
                    <div key={item.id} className="menu-item">
                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24" />
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <button
                            onClick={() => handleSelectItem(item)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg"
                        >
                            Add to Order
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={handlePlaceOrder}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
                Place Order
            </button>
        </div>
    );
};

export default Menu;
