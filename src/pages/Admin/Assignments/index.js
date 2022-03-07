import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../../layout";
import Popup from "../../../components/Popup";
import SingleAssignment from "../../../components/Admin/SingleAssignment";
import plus from "../../../assets/images/plus.svg";
import eye from "../../../assets/images/eye.svg";
import cloud from "../../../assets/images/cloud.svg";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { allDataApi } from "../../../redux/action";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import { filterActiveClient } from "../../../utils/filterActiveClient";
import Loader from "../../../components/Loader";

const Assignments = ({ allData, allDataApi }) => {
	const { client_id, challenge_id } = useParams();
	const history = useHistory();

	useEffect(() => {
		storingRoute(history);
		allDataApi();
	}, [allDataApi, history]);

	const [popUp, setPopUp] = useState(false);

	// FILTER TO GET ACTIVE CLIENT
	const activeClient = filterActiveClient(allData, client_id, "id");
	const activeClientChallenges =
		activeClient.length &&
		filterActiveClient(
			activeClient[0].challenges,
			challenge_id,
			"challenge_id"
		);

	const children = (
		<div className="upload__assignment">
			<img src={cloud} alt="" />
			<p>Select file (.xls)</p>
			<button>Upload Assignments</button>
		</div>
	);

	// LOADER
	if (!allData.length) {
		return <Loader />;
	}

	return (
		<Layout>
			{popUp && (
				<Popup
					title="Upload Assignments"
					setPopUp={setPopUp}
					children={children}
				/>
			)}

			<div className="assignment">
				<div className="assignment__header">
					<Link to={`/challenge/${client_id}/${challenge_id}`}>
						→ Edit challenge
					</Link>
					<ul>
						<li>
							<button
								onClick={() =>
									history.push(`/assignment/${client_id}/${challenge_id}`)
								}
							>
								<img src={plus} alt="" />
							</button>
						</li>
						<li>
							<button onClick={() => setPopUp(true)}>Upload Assignments</button>
						</li>
						<li>
							<button
								onClick={() =>
									history.push(`/assignments_view/${client_id}/${challenge_id}`)
								}
							>
								<img src={eye} alt="" />
							</button>
						</li>
					</ul>
				</div>

				<br />
				<br />

				<div className="assignment__title">
					<p>
						Client: <span>{activeClient[0].client_name}</span>
					</p>
					<p>
						Challenge: <span>{activeClientChallenges[0].challenge_name}</span>
					</p>
				</div>

				<div className="assignment__list">
					<h1>Assignments</h1>
					<br />
					<div
						style={{
							justifyContent:
								!activeClientChallenges[0].assignments.length && "center",
							alignItems:
								!activeClientChallenges[0].assignments.length && "center",
						}}
						className="assignment__list__inner"
					>
						{(activeClientChallenges[0].assignments.length &&
							activeClientChallenges[0].assignments.map((item, i) => {
								return (
									<SingleAssignment
										item={item}
										index={i}
										key={i}
										client_id={client_id}
										challenge_id={challenge_id}
									/>
								);
							})) || <p>No Data</p>}
					</div>
				</div>
			</div>
		</Layout>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(Assignments);
