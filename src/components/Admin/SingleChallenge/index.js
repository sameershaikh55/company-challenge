import React from "react";
import { Link } from "react-router-dom";
import edit from "../../../assets/images/edit.svg";
import "./styles.css";

const SingleChallenge = ({ item, activeClientId }) => {
	const { challenge_name, challenge_title, challenge_url, challenge_id } = item;

	return (
		<div className="single__challenge">
			<div className="single__challenge__inner">
				<div className="single__challenge__header">
					<h4>{challenge_name}</h4>
					<Link to={`/challenge/${activeClientId}/${challenge_id}`}>
						<img src={edit} alt="" />
					</Link>
				</div>

				<ul>
					<li>{challenge_title}</li>
				</ul>

				<div className="single__challenge__body">
					<div>
						<span className="single__challenge__body__url">URL</span>
						<span className="single__challenge__body__number">
							/{challenge_url}
						</span>
					</div>
					<Link to={`/assignments/${activeClientId}/${challenge_id}`}>
						Assignments
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SingleChallenge;
