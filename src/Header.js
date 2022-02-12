import React from "react";
import "./Header.css";
import logo from "./images/logo.svg";

//ICONS
import LockOpenIcon from "@material-ui/icons/LockOpen";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="header__logo" />

      <div className="header__nav">
        <div className="header__option">Dashboard</div>
        <div className="header__option header__option_outline">
          Log Out <LockOpenIcon className="header__lockIcon" />
        </div>
      </div>
    </div>
  );
}

export default Header;
