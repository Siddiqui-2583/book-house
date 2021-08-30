import React from 'react';
import './Header.css'
import logo from "../../images/logo book.jpg";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
const Header = () => {
  
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <div className="cart-badge">
        <Link to="/add-book">
          <Button type="submit" variant="contained" color="#000">
            Add New Book
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;