import React from "react";
import "./NavBar.css";
import Logo from "../Logo.tsx";

const NavBar = () => {
  return (
    <div className="navbar">
      <a href="/" className="logo">
        <Logo />
      </a>
    </div>
  );
};

export default NavBar;
