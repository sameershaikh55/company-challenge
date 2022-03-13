import React, { useEffect, useState } from "react";
import "./styles.css";
import clientIcon from "../../../assets/images/clientIcon.svg";
import info from "../../../assets/images/info.svg";
import UserDashboard from "../../../components/User/UserDashboard";
import Popup from "../../../components/Popup";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { filterActiveClient } from "../../../utils/filterActiveClient";
import Loader from "../../../components/Loader";

const Dashboard = ({ allData }) => {
	const { client_id, challenge_id } = useParams();

	const [popUp3, setPopUp3] = useState(false);
	const history = useHistory();

	useEffect(() => {
		storingRoute(history);
	}, [history]);

	// FILTER TO GET ACTIVE CLIENT
	const activeClient = filterActiveClient(allData, client_id, "id");
	const activeClientChallenges =
		activeClient.length &&
		filterActiveClient(
			activeClient[0].challenges,
			challenge_id,
			"challenge_id"
		);

	const children2 = (
		<div className="support__instruction__assignment">
			<p className="support__instruction__assignment__header">
				Afdeling HR:{" "}
				{activeClientChallenges && activeClientChallenges[0].challenge_contact}
				<br />
				Mail naar:{" "}
				{activeClientChallenges && activeClientChallenges[0].challenge_title}
			</p>
			<br />
			<p>
				{activeClientChallenges && activeClientChallenges[0].challenge_info}
			</p>
			<p className="support__instruction__assignment__body">
				{activeClientChallenges &&
					activeClientChallenges[0].challenge_description}
			</p>
		</div>
	);

	// LOADER
	if (!allData.length) {
		return <Loader />;
	}

	return (
		<div className="user__dashboard">
			{popUp3 && (
				<Popup
					title={activeClientChallenges[0].challenge_support}
					setPopUp={setPopUp3}
					children={children2}
				/>
			)}

			<div className="user__dashboard__header">
				<img
					onClick={() => history.goBack()}
					className="client_img pointer"
					src={activeClient[0].logo}
					alt=""
				/>
				<div className="assignment_right">
					<h2>Assignments</h2>
					<button onClick={() => setPopUp3(true)}>
						<img src={info} alt="" />
					</button>
				</div>
			</div>
			<div className="user__dashboard__body">
				<div className="user__dashboard__body__inner">
					{activeClientChallenges[0].assignments.map((item, i) => {
						return (
							<UserDashboard
								activeClient={activeClient}
								activeClientChallenges={activeClientChallenges}
								item={item}
								key={i}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

const mapStatetoProps = (state) => {
	return {
		allData: state.allDataRed.allData,
	};
};

export default connect(mapStatetoProps, null)(Dashboard);
