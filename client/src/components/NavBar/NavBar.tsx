import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../ui/Button/Button";
import "./nav.css";
import ham from "./ham.png";
import back from "./back.png";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import { User } from "../../types";

const NavBar = () => {
  const [open, setOpen] = useState("");
  const [navs, setNavs] = useState("");
  const [close, setClose] = useState("hidden");
  const p = useParams();
  const user = useSelector(
    (state: RootState): User | null => state.currentUser
  );

  useEffect(() => {
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
    <div className="navbar ">
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
            <Link to="/journals">
              <Button value="Journal" className=" w-100" />
            </Link>
          </li>
          <li>
            <Link to="/tasks">
              <Button value="Tasks" className=" w-100" />
            </Link>
          </li>
          <li>
            <Link to="/events">
              <Button value="Events" className=" w-100" />
            </Link>
          </li>
          <li>
            <Link to="/notes">
              <Button value="Notes" className=" w-100" />
            </Link>
          </li>
          {user && (
            <div className="user name">
              <li>
                <Link to="/logout">
                  <Button value="Logout" className="w-100" />
                </Link>
              </li>
              <li>
                <Link to="/logout">
                  <Button value={user.name} className="w-100" />
                </Link>
              </li>
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
