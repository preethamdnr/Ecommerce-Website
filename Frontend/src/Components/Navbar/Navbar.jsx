import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar = () => {
  const [menu, setMenu] = useState("Shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();
  
  const tokener = localStorage.getItem("token");

  const handleToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  useEffect(() => {
    handleToken();
  }, [tokener]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Logged out successfully!");
    navigate("/Login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>Luxora</p>
      </div>
      <div className="nav-hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />} 
      </div>
      <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <li onClick={() => setMenu("Shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "Shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Men")}>
          <Link style={{ textDecoration: "none" }} to="/Men">
            Men
          </Link>
          {menu === "Men" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Women")}>
          <Link style={{ textDecoration: "none" }} to="/Women">
            Women
          </Link>
          {menu === "Women" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Kids")}>
          <Link style={{ textDecoration: "none" }} to="/Kids">
            Kids
          </Link>
          {menu === "Kids" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="auth-button">
            Logout
          </button>
        ) : (
          <Link to="/Login">
            <button className="auth-button">Login</button>
          </Link>
        )}
        <Link to="/Cart">
          <img src={cart_icon} alt="Cart" className="nav-cart-icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
