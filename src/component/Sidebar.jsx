import React, { useState } from "react";
import { FaHome, FaShoppingBasket, FaThList, FaBars } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faUserFriends,
  faBoxOpen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // You can use fetch or any other library to make an HTTP request
      await fetch("http://localhost:5000/logout", {
        method: "DELETE", // You may need to adjust the HTTP method based on your API requirements
        headers: {
          // Add any headers needed for your API
          "Content-Type": "application/json",
          // You may need to include authentication headers if required
        },
        // You can include a body if your API requires it
        // body: JSON.stringify({ /* any data you want to send */ }),
      });

      // Redirect to the login page or any other page after successful logout
      navigate("/login"); // Change '/login' to the path you want to redirect to
    } catch (error) {
      console.error("Logout failed", error);
      // Handle error, show a notification, or redirect to an error page
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Utama",
      icon: <FaHome />,
    },
    {
      path: "/packet",
      name: "Paket",
      icon: <FontAwesomeIcon icon={faBoxesStacked} />, // Use the imported FontAwesome icon
    },
    {
      path: "/transaction",
      name: "Penjualan",
      icon: <FaThList />,
    },
    {
      path: "/product",
      name: "Produk",
      icon: <FaShoppingBasket />,
    },
    {
      path: "/product-menu",
      name: "Produk Menu",
      icon: <FontAwesomeIcon icon={faBoxOpen} />,
    },
    {
      path: "/users",
      name: "Pengguna",
      icon: <FontAwesomeIcon icon={faUserFriends} />,
    },
    {
      path: "",
      name: "Logout",
      icon: <FontAwesomeIcon icon={faRightFromBracket} />, // Use the imported FontAwesome icon
      onClick: handleLogout,
    },
  ];

  return (
    <div className="container">
      <div
        className="sidebar"
        style={{
          width: isOpen ? "250px" : "50px",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 99,
          overflowY: "auto",
        }}
      >
        <div className="top_section">
          <h3 style={{ display: isOpen ? "block" : "none" }} className="logo">
            NUKARI MASIH
          </h3>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            activeclassName="active"
            className="link"
          >
            <div className="icon">{item.icon}</div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>

      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
