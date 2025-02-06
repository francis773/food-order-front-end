import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import MyCart from "../components/MyCart";
import '../styles/OrderStyle.css';
import User from "../images/loginbackground.jpg"; 
import api from "../services/api";

const Orders = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]); // Stores selected items with quantity
    const [restaurant] = useState({ name: "WELCOME TO FOOKWAY", address: "xxxxxxxxxxx" });

    useEffect(() => {
        // Fetch menu items from API
        axios.get("http://localhost:8080/api/menu")
            .then(response => {
                // Ensure unique menu items
                const uniqueItems = Array.from(new Map(response.data.map(item => [item.id, item])).values());
                setMenuItems(uniqueItems);
            })
            .catch(error => console.error("Error fetching menu items:", error));
    }, []);

    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const handlePlaceOrder = () => {
        const tableNumber = prompt("Enter Table Number:");
        if (!tableNumber) return; // Prevent empty table number
    
        // Structure the order request to match backend model
        const orderRequest = {
            tableNumber: tableNumber,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        };
    
        console.log("🚀 Order Request Payload:", JSON.stringify(orderRequest, null, 2));
    
        api.post("/orders/place-order", orderRequest)
            .then((response) => {
                alert("Order placed successfully!");
                setCart([]); // Clear the cart after submission
            })
            .catch((error) => {
                console.error("Error placing order:", error);
            });
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return (
        <div>
            <div className="nav">
                <div id="logo">
                    <h2>FOOKWAY</h2>
                </div>
                <div id="user">
                    <div className="name">Hello, BBQ</div>
                    <div className="profile">
                        <img src="../images/loginbackground.jpg" id="img" height="45" width="45" alt="profile" />
                    </div>
                </div>
            </div>

            <div id="content">
                <div id="head">
                    <h1 className="hname">{restaurant.name}</h1>
                    <h5 className="aname"><i className="fa fa-map-marker" style={{ fontSize: 18 }}></i> {restaurant.address}</h5>
                    <div id="items">
                        <center><h2>Order Now</h2></center>
                        <br />
                        {/* Pass menuItems and addToCart function */}
                        <div className="menu-container p-6">
                            <h2 className="text-2xl font-semibold mb-4">Menu</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {menuItems.map((item) => (
                                    <div key={item.id} className="border p-4 rounded-lg shadow-md text-center">
                                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 mx-auto mb-2" />
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg mt-2"
                                        >
                                            Add to Order
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="panel">
                    <div id="right">
                        <div id="right-in">
                            <h4>My Cart</h4>

                            {/* Cart Summary */}
                            <div className="mt-6 p-4 border rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Your Order</h3>
                                <ul>
                                    {cart.map((item) => (
                                        <li key={item.id} className="flex justify-between items-center">
                                            <span>{item.name} (x{item.quantity})</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4">
                                    <p>Total: ${calculateTotal().toFixed(2)}</p>
                                    {/* Input button for "Pay Now" */}
                                    <input id = "pay"
                                        type="button"
                                        value="Pay Now"
                                        onClick={handlePlaceOrder}
                                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg w-full"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
