import React from "react";
import { Link } from "react-router-dom";

import "components/Header/Header.scss";
import Logo from "assets/logo.png";

function Header({ currentUser }) {
  return (
    <div className="header container">
      <Link className="header__logo" to={"/"}>
        <img src={Logo} alt="FindMyRestaurant Logo"/>
      </Link>
      <div className="header__nav-links">
        {currentUser ? (
          <div className="nav-link" onClick={() => {console.log("write logout code....")}}>
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
