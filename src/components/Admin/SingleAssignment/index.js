import React from "react";
import { useHistory } from "react-router-dom";
import edit from "../../../assets/images/edit.svg";
import "./styles.css";

const SingleAssignment = ({ item, index, client_id, challenge_id }) => {
	const history = useHistory();
	const { assignment_subtitle, assignment_title, assignment_id } = item;

	return (
		<div className="single__assignment">
			<div className="single__assignment__left">
				<div>
					<h4>{index + 1}</h4>
					<h4>{assignment_title}</h4>
				</div>

				<ul>
					<li>{assignment_subtitle}</li>
				</ul>
			</div>

			<div className="single__assignment__right">
				<button
					onClick={() =>
						history.push(
							`/assignment/${client_id}/${challenge_id}/${assignment_id}`
						)
					}
				>
					<img src={edit} alt="" />
				</button>
			</div>
		</div>
	);
};

export default SingleAssignment;
