import React from "react";
import "./styles.css";
import arrow from "../../../assets/images/arrow.svg";

const SingleClient = ({ activeClient, item, activeClientFunc }) => {
	const { logo, client_name, challenges, id } = item;

	return (
		<div
			style={{
				background: (activeClient && activeClient.id === id && "#ECEEF2") || "",
			}}
			onClick={() => activeClientFunc(item)}
			className="client"
		>
			<div className="client__left">
				<img src={logo} alt="" />
				<div className="client__left__text">
					<h3>{client_name}</h3>
					<p>{challenges.length} challenges</p>
				</div>
			</div>
			<img src={arrow} alt="" />
		</div>
	);
};

export default SingleClient;
