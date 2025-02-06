import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderPage from "./pages/OrdersPage";
import MenuPage from "./pages/MenuPage";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [order, setOrder] = useState(null);  // Define the order state here

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/orders" element={<OrderPage />} /> 
        <Route path="/menu" element={<MenuPage setOrder={setOrder} />} />
      </Routes>
    </Router>
  );
}

export default App;
