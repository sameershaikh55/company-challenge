import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import info from "../../../assets/images/info.svg";
import Popup from "../../Popup";
import "./styles.css";

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
			<div className="password__assignment__top">
				<div className="inp_container">
					<input
						autoFocus
						value={passInpHandle}
						onChange={(e) => setPassInpHandle(e.target.value.toLowerCase())}
						type="text"
						placeholder="Secret code"
					/>
					{passSubmit === "wrong" && passInpHandle !== "" ? (
						<p className="error_message">wrong secret code</p>
					) : (
						""
					)}
				</div>
				<img onClick={() => setPopUp2(true)} src={info} alt="" />
			</div>
			<button onClick={passwordSubmit}>Start</button>
		</div>
	);
	// assignment_password

	const children1 = (
		<div className="password__instruction__assignment">
			<p
				dangerouslySetInnerHTML={{
					__html: activeClientChallenges[0].challenge_password_instruction,
				}}
			></p>
			{/* <br /> */}
			{/* <p>EN: {activeClientChallenges[0].challenge_password_instruction}</p> */}
		</div>
	);

	return (
		<>
			{popUp && (
				<Popup
					title="Secret code"
					setPopUp={setPopUp}
					children={children}
					bgColor={
						activeClientChallenges &&
						"challenge_background_color" in activeClientChallenges[0] &&
						activeClientChallenges[0].challenge_background_color
					}
				/>
			)}
			{popUp2 && (
				<Popup
					title="Secret code Instruction"
					setPopUp={setPopUp2}
					children={children1}
					bgColor={
						activeClientChallenges &&
						"challenge_background_color" in activeClientChallenges[0] &&
						activeClientChallenges[0].challenge_background_color
					}
				/>
			)}

			<div className="single__assignment__user">
				<div className="single__assignment__user__inner">
					<div>
						<div
							style={{ opacity: (media === "" && "0.5") || "1" }}
							className="single__assignment__user__image"
						>
							<img
								src={(media === "" && activeClient[0].logo) || media}
								alt=""
							/>
						</div>
						<p className="line-limit-2">{assignment_title}</p>
					</div>

					<div>
						<ul>
							<li>{assignment_subtitle}</li>
						</ul>

						<button onClick={assignmentStart}>Start</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleAssignment;
