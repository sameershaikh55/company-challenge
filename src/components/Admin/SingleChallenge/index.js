import React from "react";
import { Link } from "react-router-dom";
import edit from "../../../assets/images/edit.svg";
import "./styles.css";

const SingleChallenge = () => {
	return (
		<div className="single__challenge">
			<div className="single__challenge__inner">
				<div className="single__challenge__header">
					<h4>Voorjaar 2022</h4>
					<img src={edit} alt="" />
				</div>

				<ul>
					<li>Project x</li>
				</ul>

				<div className="single__challenge__body">
					<div>
						<span className="single__challenge__body__url">URL</span>
						<span className="single__challenge__body__number">/028BY78</span>
					</div>
					<Link to="/assignments">Assignments</Link>
				</div>
			</div>
		</div>
	);
};

export default SingleChallenge;
