import React from "react";
import "./styles.css";
import bg from "../../../assets/images/bg-login.jpg";
import logo from "../../../assets/images/logo.svg";

const Login = () => {
	return (
		<div className="login">
			<div className="login__inner">
				<div className="login__form">
					<div className="login__form__inner">
						<div className="login__form__inner2">
							<img src={logo} alt="" />
							<br />
							<label htmlFor="Username">Username</label>
							<br />
							<input type="text" name="" id="" />
							<div className="login__br" />
							<label htmlFor="Username">Password</label>
							<br />
							<input type="text" name="" id="" />
							<br />
							<button className="login__btn">Login</button>
						</div>
					</div>
				</div>
				<div className="login__image">
					<img src={bg} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Login;
