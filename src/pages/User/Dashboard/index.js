import React, { useState } from "react";
import "./styles.css";
import clientIcon from "../../../assets/images/clientIcon.svg";
import info from "../../../assets/images/info.svg";
import UserDashboard from "../../../components/User/UserDashboard";
import Popup from "../../../components/Popup";

const Dashboard = () => {
	const [popUp, setPopUp] = useState(false);
	const [popUp2, setPopUp2] = useState(false);
	const [popUp3, setPopUp3] = useState(false);

	const children = (
		<div className="password__assignment">
			<img onClick={() => setPopUp2(true)} src={info} alt="" />
			<p>Pitza</p>
			<button>Start</button>
		</div>
	);

	const children1 = (
		<div className="password__instruction__assignment">
			<p>
				NL: Mauris gravida sapien quis risus ultricies condimentum. Cras eu
				lacus nunc.
			</p>
			<br />
			<p>
				EN: Proin congue mi tortor, eu vehicula nisl suscipit quis. Quisque a
				metus commodo, volutpat risus ut, iaculis elit.
			</p>
		</div>
	);

	const children2 = (
		<div className="support__instruction__assignment">
			<p className="support__instruction__assignment__header">
				Afdeling HR: +31 (0) 6 123 456 78
				<br />
				Mail naar: challenge@hr.nl
			</p>
			<br />
			<p>Info</p>
			<p className="support__instruction__assignment__body">
				Mauris gravida sapien quis risus ultricies condimentum. Cras eu lacus
				nunc. Proin congue mi tortor, eu vehicula nisl suscipit quis. Quisque a
				metus commodo, volutpat risus ut, iaculis elit.
				<br />
				<br />
				Vestibulum convallis vestibulum ante. Curabitur sagittis mollis mi ac
				cursus.
				<br />
				<br />
				Fusce massa diam, tincidunt eget arcu eu, convallis vehicula ipsum.
			</p>
		</div>
	);

	return (
		<div className="user__dashboard">
			{popUp && (
				<Popup title="Password" setPopUp={setPopUp} children={children} />
			)}
			{popUp2 && (
				<Popup
					title="[PasswordInstruction]"
					setPopUp={setPopUp2}
					children={children1}
				/>
			)}
			{popUp3 && (
				<Popup title="[support]" setPopUp={setPopUp3} children={children2} />
			)}

			<div className="user__dashboard__header">
				<img src={clientIcon} alt="" />
				<button onClick={() => setPopUp(true)}>
					<img src={info} alt="" />
				</button>
			</div>
			<div className="user__dashboard__body">
				<h2>Assignments</h2>
				<br />
				<div className="user__dashboard__body__inner">
					{[
						1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
						1, 1, 1,
					].map(() => {
						return <UserDashboard setPopUp3={setPopUp3} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
