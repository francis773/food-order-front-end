// import { useEffect, useState } from "react";
// import axios from "axios";

// const TableOrders = ({ tableNumber }) => {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/orders/table/${tableNumber}`)
//             .then(response => setOrders(response.data))
//             .catch(error => console.error("Error fetching orders:", error));
//     }, [tableNumber]);

//     return (
//         <div className="border p-4 rounded-lg shadow-lg">
//             <h2 className="text-lg font-bold mb-2">Table {tableNumber} Orders</h2>
//             {orders.length === 0 ? (
//                 <p>No orders yet.</p>
//             ) : (
//                 <ul>
//                     {orders.map(order => (
//                         <li key={order.id}>{order.menuItemName} - {order.totalQuantity}</li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default TableOrders;

import { useEffect, useState } from "react";
import axios from "axios";

const TableOrders = ({ tableNumber }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/orders/table/${tableNumber}`)
            .then(response => setOrders(response.data))
            .catch(error => console.error("Error fetching orders:", error));
    }, [tableNumber]);

    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Table {tableNumber} Orders</h2>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order.menuItemId}>{order.menuItemName} - {order.totalQuantity}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TableOrders;
