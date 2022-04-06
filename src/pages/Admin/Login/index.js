import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { auth } from "../../../firebase/index.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./styles.css";
import bg from "../../../assets/images/bg-login.jpg";
import logo from "../../../assets/images/logo.svg";
import { AuthContext } from "../../../Authentication";
import Loader from "../../../components/Loader";
import SmallLoader from "../../../components/SmallLoader/index.js";

const Login = () => {
	const history = useHistory();
	const [loginError, setLoginError] = useState("");
	const [loading, setLoading] = useState(false);
	const [loginLoading, setLoginLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const isLogin = localStorage.getItem("login");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		setLoginLoading(true);

		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(() => {
				setLoginLoading(false);
				history.push("/dashboard");
				localStorage.setItem("login", "/dashboard");
				reset();
			})
			.catch((error) => {
				const errorCode = error.code.split("/");
				setLoginError(errorCode[1]);
				setLoginLoading(false);
			});
	};

	useEffect(() => {
		const active_url = localStorage.getItem("active_url");

		if (isLogin) {
			setLoading(true);
			if (user) {
				setLoading(false);
				history.push((active_url && active_url) || "/dashboard");
			}
		}
	}, [user, history, isLogin]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="login">
			<div className="login__inner">
				<div className="login__form">
					<div className="login__form__inner">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="login__form__inner2"
						>
							<img src={logo} alt="" />
							<br />
							<div className="login__inp__handle">
								<label htmlFor="Username">Username</label>
								<br />
								<input
									type="text"
									disabled={(loginLoading && true) || false}
									className={`${
										errors.email && errors.email.message && "error_field"
									}`}
									{...register("email", {
										required: "Required*",
										pattern: {
											value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
											message: "Invalid Email*",
										},
									})}
								/>
								{errors.email && (
									<p className="login__error__message">
										{errors.email.message}
									</p>
								)}
							</div>
							<div className="login__br" />
							<div className="login__inp__handle">
								<label htmlFor="Username">Password</label>
								<br />
								<input
									disabled={(loginLoading && true) || false}
									className={`${
										errors.password && errors.password.message && "error_field"
									} ${loginError === "wrong-password" && "error_field"}`}
									type="password"
									{...register("password", {
										required: "Required*",
									})}
								/>
								{(errors.password && (
									<p className="login__error__message">
										{errors.password.message}
									</p>
								)) ||
									(loginError === "wrong-password" && (
										<p className="login__error__message">invalid password</p>
									))}
							</div>
							<br />
							<div className="login_along_error">
								<p>
									{(loginError === "user-not-found" && "User Not Found") || ""}
								</p>
								<button
									type="submit"
									disabled={(loginLoading && true) || false}
									className={`login__btn ${
										(loginLoading && "login__disabled") || ""
									}`}
								>
									{(loginLoading && <SmallLoader />) || "Login"}
								</button>
							</div>
						</form>
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
