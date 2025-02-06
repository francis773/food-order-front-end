import TableOrders from "../components/TableOrders";

const OrdersPage = () => {
    const tables = [1, 2, 3, 4]; // ✅ Example tables

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Table Orders</h1>
            <div className="grid grid-cols-2 gap-4">
                {tables.map(table => (
                    <TableOrders key={table} tableNumber={table} />
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
