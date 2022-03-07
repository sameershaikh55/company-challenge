import React from "react";
import "./style.css";
import loader from "../../assets/images/loader.svg";

const Loader = () => {
	return (
		<div className="login__loading">
			<img src={loader} alt="" />
		</div>
	);
};

export default Loader;
