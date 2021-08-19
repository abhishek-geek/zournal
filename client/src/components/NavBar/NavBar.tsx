import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import "./nav.css";

const NavBar = () => {
  return (
    <div className="bg-gray-300 navbar -mt-12">
      <div className="logo">
        <Link to="/">Zournal</Link>
      </div>
      <div className="navs">
        <ul>
          <li>
            <Link to="/">
              <Button value="Home" className="btn" />
            </Link>
          </li>
          <li>
            <Link to="/login">
              <Button value="Login" />
            </Link>
          </li>
          <li>
            <Link to="/register">
              <Button value="Register" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
