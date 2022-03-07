import React, { useState } from "react";
import info from "../../../assets/images/info.svg";
import Popup from "../../Popup";
import "./styles.css";

const SingleAssignment = ({ item }) => {
	const {
		assignment_title,
		assignment_subtitle,
		challenge_password_instruction,
	} = item;
	const [popUp, setPopUp] = useState(false);
	const [popUp2, setPopUp2] = useState(false);

	const children = (
		<div className="password__assignment">
			<img onClick={() => setPopUp2(true)} src={info} alt="" />
			<input type="text" placeholder="Password" />
			<button>Start</button>
		</div>
	);

	const children1 = (
		<div className="password__instruction__assignment">
			<p>NL: {challenge_password_instruction}</p>
			<br />
			<p>EN: {challenge_password_instruction}</p>
		</div>
	);

	return (
		<>
			{popUp && (
				<Popup title="Password" setPopUp={setPopUp} children={children} />
			)}
			{popUp2 && (
				<Popup
					title="Password Instruction"
					setPopUp={setPopUp2}
					children={children1}
				/>
			)}

			<div className="single__assignment__user">
				<div className="single__assignment__user__inner">
					<div className="single__assignment__user__image"></div>

					<p>{assignment_title}</p>

					<ul>
						<li>{assignment_subtitle}</li>
					</ul>

					<button onClick={() => setPopUp(true)}>Start</button>
				</div>
			</div>
		</>
	);
};

export default SingleAssignment;
