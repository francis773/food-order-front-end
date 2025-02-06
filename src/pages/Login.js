import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/LoginStyle.css';
import Front from '../images/loginbackground.jpg'

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", credentials);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data)); // Store user
        setUser(response.data);
        navigate("/"); // Redirect to home
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div id="container">
        <div id="id1">
          <img src={Front} height="668" width="700" alt="Banner"/>
        </div>

        <div id="id2">
          {/* <center><img src={AppLogo} alt="logo"/></center> */}
          <center><h1 id="logoApp">FOODIE</h1></center>
          <div id="id3">
            <center>
              <h2>LOG IN</h2>
              <br />
              {/* Removed clickable credentials debug */}
              <form onSubmit={handleLogin} id="form">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Username"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  id="input"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  id="input"
                />
                <br />
                <button type="submit" id="btn">Login</button>
              </form>
            </center>
            <br />
            <span style={{ marginLeft: '123px' }}>New User? <a href="/register">Click Here</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
