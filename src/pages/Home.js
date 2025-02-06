import { Link, useNavigate } from "react-router-dom";

const Home = ({ setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Welcome to Food Ordering</h1>
            <p className="text-lg text-gray-700 mb-4">Order your favorite meals anytime.</p>
            <div className="flex space-x-4">
                <Link to="/menu" className="px-4 py-2 bg-blue-600 text-white rounded-lg">View Menu</Link>
                <Link to="/orders" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Order Menu</Link>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">Logout</button>
            </div>
        </div>
    );
};

export default Home;
