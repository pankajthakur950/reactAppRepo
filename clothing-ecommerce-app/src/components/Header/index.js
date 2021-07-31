import React from "react";
import { Link } from "react-router-dom";

import "components/Header/Header.scss";
import { ReactComponent as Logo } from "assets/Logo.svg";
import { auth } from "firebase/firebase.util";

function Header({ currentUser }) {
  return (
    <div className="header">
      <Link className="header__logo" to={"/"}>
        <Logo />
      </Link>
      <div className="header__nav-links">
        <Link className="nav-link" to={"/shop"}>
          SHOP
        </Link>
        <Link className="nav-link" to={"/contact"}>
          CONTACT
        </Link>
        {currentUser ? (
          <div className="nav-link" onClick={() => auth.signOut()}>
            SIGNOUT
          </div>
        ) : (
          <Link className="nav-link" to={"/login"}>
            SIGNIN
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
