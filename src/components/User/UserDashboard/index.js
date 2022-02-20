import React from "react";
import "./styles.css";

const SingleAssignment = ({ setPopUp3 }) => {
	return (
		<div className="single__assignment__user">
			<div className="single__assignment__user__inner">
				<div className="single__assignment__user__image"></div>

				<p>HackerTime Final Assignment</p>

				<ul>
					<li>Makkelijk</li>
				</ul>

				<button onClick={() => setPopUp3(true)}>Start</button>
			</div>
		</div>
	);
};

export default SingleAssignment;
