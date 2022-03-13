import React, { useContext } from "react";
import "./styles.css";
import logo from "../../assets/images/logo.svg";
import { AuthContext } from "../../Authentication";

//ICONS
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link } from "react-router-dom";

function Header() {
	const { logout } = useContext(AuthContext);

	return (
		<div className="header">
			<Link to="/dashboard">
				<img src={logo} alt="Logo" className="header__logo" />
			</Link>

			<div className="header__nav">
				<div className="header__option">
					<Link to="/dashboard">Dashboard</Link>
				</div>
				<div
					onClick={() => logout()}
					className="header__option header__option_outline"
				>
					Log Out <LockOpenIcon className="header__lockIcon" />
				</div>
			</div>
		</div>
	);
}

export default Header;
