import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import info from "../../../assets/images/info.svg";
import Popup from "../../Popup";
import "./styles.css";
import clientIcon from "../../../assets/images/clientIcon.svg";

const SingleAssignment = ({ activeClient, activeClientChallenges, item }) => {
	const history = useHistory();

	const { assignment_title, assignment_subtitle, assignment_password, media } =
		item;
	const [popUp, setPopUp] = useState(false);
	const [popUp2, setPopUp2] = useState(false);
	const [passInpHandle, setPassInpHandle] = useState("");
	const [passSubmit, setPassSubmit] = useState();

	function passwordSubmit() {
		if (passInpHandle === assignment_password) {
			setPassSubmit("correct");
			history.push(
				`/assignment_view/${activeClient[0].id}/${activeClientChallenges[0].challenge_id}/${item.assignment_id}`
			);
		} else {
			setPassSubmit("wrong");
		}
	}

	function assignmentStart() {
		if (assignment_password === "") {
			history.push(
				`/assignment_view/${activeClient[0].id}/${activeClientChallenges[0].challenge_id}/${item.assignment_id}`
			);
		} else {
			setPopUp(true);
		}
	}

	const children = (
		<div className="password__assignment">
			<img onClick={() => setPopUp2(true)} src={info} alt="" />
			<div className="inp_container">
				<input
					value={passInpHandle}
					onChange={(e) => setPassInpHandle(e.target.value)}
					type="text"
					placeholder="Password"
				/>
				{passSubmit === "wrong" && passInpHandle !== "" ? (
					<p className="error_message">wrong password</p>
				) : (
					""
				)}
			</div>
			<button onClick={passwordSubmit}>Start</button>
		</div>
	);
	// assignment_password

	const children1 = (
		<div className="password__instruction__assignment">
			<p>NL: {activeClientChallenges[0].challenge_password_instruction}</p>
			<br />
			<p>EN: {activeClientChallenges[0].challenge_password_instruction}</p>
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
					<div className="single__assignment__user__image">
						<img src={(media === "" && activeClient[0].logo) || media} alt="" />
					</div>

					<p>{assignment_title}</p>

					<ul>
						<li>{assignment_subtitle}</li>
					</ul>

					<button onClick={assignmentStart}>Start</button>
				</div>
			</div>
		</>
	);
};

export default SingleAssignment;
