import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../ui/Button";
import "./nav.css";
import ham from "./ham.png";
import back from "./back.png";

const NavBar = () => {
  const [user] = useState(false);
  const [open, setOpen] = useState("");
  const [navs, setNavs] = useState("");
  const [close, setClose] = useState("hidden");
  const p = useParams();

  useEffect(() => {
    console.log(p);
    setClose("hidden");
    setNavs("");
    setOpen("");
  }, [p]);

  const showNav = () => {
    console.log("clicked open");
    setClose("");
    setNavs("active");
    setOpen("hidden");
  };

  const hideNav = () => {
    console.log("clicked close");
    setClose("hidden");
    setNavs("");
    setOpen("");
  };

  return (
    <div className="bg-gray-300 navbar -mt-12">
      <div className="logo">
        <Link to="/">Zournal</Link>
      </div>
      <div className="ham">
        <img
          onClick={showNav}
          className={`open ${open}`}
          src={ham}
          alt="menu"
        />
        <img
          onClick={hideNav}
          className={`close ${close}`}
          src={back}
          alt="menu"
        />
      </div>
      <div className={`navs ${navs}`}>
        <ul>
          <li>
            <Link to="/">
              <Button value="Home" className="btn w-100" />
            </Link>
          </li>
          {user && (
            <div className="user name">
              <li>
                <Link to="/logout">
                  <Button value="Logout" className="w-100" />
                </Link>
              </li>
              {/* <span>Abhishek Dubey</span> */}
            </div>
          )}
          {!user && (
            <div className="user">
              <li>
                <Link to="/login">
                  <Button value="Login" className="w-100" />
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <Button value="Register" className="w-100" />
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
