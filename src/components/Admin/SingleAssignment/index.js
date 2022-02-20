import React from "react";
import edit from "../../../assets/images/edit.svg";
import "./styles.css";

const SingleAssignment = () => {
	return (
		<div className="single__assignment">
			<div className="single__assignment__left">
				<div>
					<h4>1</h4>
					<h4>Voorjaar 2022</h4>
				</div>

				<ul>
					<li>Project x</li>
				</ul>
			</div>

			<div className="single__assignment__right">
				<img src={edit} alt="" />
			</div>
		</div>
	);
};

export default SingleAssignment;
