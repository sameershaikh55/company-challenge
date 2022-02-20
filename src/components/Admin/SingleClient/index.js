import React from "react";
import "./styles.css";
import clientIcon from "../../../assets/images/clientIcon.svg";
import arrow from "../../../assets/images/arrow.svg";

const SingleClient = () => {
	return (
		<div className="client">
			<div className="client__left">
				<img src={clientIcon} alt="" />
				<div className="client__left__text">
					<h3>KPN</h3>
					<p>6 challenges</p>
				</div>
			</div>
			<img src={arrow} alt="" />
		</div>
	);
};

export default SingleClient;
