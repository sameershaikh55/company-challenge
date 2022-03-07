import React, { useEffect, useState } from "react";
import "./styles.css";
import clientIcon from "../../../assets/images/clientIcon.svg";
import info from "../../../assets/images/info.svg";
import UserDashboard from "../../../components/User/UserDashboard";
import Popup from "../../../components/Popup";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import { allDataApi } from "../../../redux/action";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { filterActiveClient } from "../../../utils/filterActiveClient";
import Loader from "../../../components/Loader";

const Dashboard = ({ allData, allDataApi }) => {
	const { client_id, challenge_id } = useParams();

	const [popUp3, setPopUp3] = useState(false);
	const history = useHistory();

	useEffect(() => {
		storingRoute(history);
		allDataApi();
	}, [allDataApi, history]);

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

	// LOADER
	if (!allData.length) {
		return <Loader />;
	}

	return (
		<div className="user__dashboard">
			{popUp3 && (
				<Popup title="[support]" setPopUp={setPopUp3} children={children2} />
			)}

			<div className="user__dashboard__header">
				<img className="client_img" src={clientIcon} alt="" />
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
						return <UserDashboard item={item} key={i} />;
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
const mapDispatchtoProps = (dispatch) => {
	return {
		allDataApi: function () {
			dispatch(allDataApi());
		},
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Dashboard);
