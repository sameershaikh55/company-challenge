import React from "react";
import "./styles.css";
import arrow from "../../../assets/images/arrow.svg";
import { useHistory, useParams } from "react-router-dom";

const SingleClient = ({ item }) => {
	const history = useHistory();
	const { client_id } = useParams();

	const { logo, client_name, challenges, id } = item;

	return (
		<div
			style={{
				background: (client_id === id && "#ECEEF2") || "",
			}}
			onClick={() => history.push(`/dashboard/${id}`)}
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
