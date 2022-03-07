import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../../layout";
import Loader from "../../../components/Loader";
import plus from "../../../assets/images/plus.svg";
import search from "../../../assets/images/search.svg";
import cross from "../../../assets/images/cross.svg";
import SingleClient from "../../../components/Admin/SingleClient";
import SingleChallenge from "../../../components/Admin/SingleChallenge";
import { Link, useHistory } from "react-router-dom";
import { allDataApi, activeClientFunc } from "../../../redux/action";
import { connect } from "react-redux";
import { storingRoute } from "../../../utils/storingRoute";

const Dashboard = ({ allData, allDataApi, activeClient, activeClientFunc }) => {
	const history = useHistory();

	// API CALL
	useEffect(() => {
		allDataApi();
		storingRoute(history);
	}, [allDataApi, history]);

	// STATES
	const [searchActive, setSearchActive] = useState(false);
	const [inpChange, setInpChange] = useState("");

	// SEARCH INPUT HANDLE
	const inputHandler = (e) => {
		//convert input text to lower case
		var lowerCase = e.target.value.toLowerCase();
		setInpChange(lowerCase);
	};

	//create a new array by filtering the original array
	const filteredData = allData.filter((el) => {
		//if no input the return the original
		if (inpChange === "") {
			return el;
		}
		//return the item which contains the user input
		else {
			return el.client_name.toLowerCase().includes(inpChange);
		}
	});

	// INACTIVE SEARCH
	const inActiveSearch = () => {
		setSearchActive(false);
		setInpChange("");
	};

	// LOADER
	if (!allData.length) {
		return <Loader />;
	}

	return (
		<Layout>
			<div className="dashboard">
				<div className="dashboard__clients">
					<div className="dashboard__clients__inner">
						<Link to="/client">
							<button>
								<img src={plus} alt="" /> <span>Add new client</span>
							</button>
						</Link>

						<div className="dashboard__clients__header">
							<h2>Clients</h2>
							<div>
								{(searchActive && (
									<div className="inp_container">
										<input
											type="text"
											onChange={inputHandler}
											value={inpChange}
											placeholder="Search"
										/>
										<img onClick={inActiveSearch} src={cross} alt="" />
									</div>
								)) || (
									<img
										className="pointer"
										onClick={() => setSearchActive(true)}
										src={search}
										alt=""
									/>
								)}
							</div>
						</div>

						<div
							style={{
								justifyContent: !allData.length && "center",
								alignItems: !allData.length && "center",
							}}
							className="dashboard__clients__body"
						>
							{(allData.length &&
								filteredData.map((item, i) => {
									return (
										<SingleClient
											activeClient={activeClient}
											activeClientFunc={activeClientFunc}
											item={item}
											key={i}
										/>
									);
								})) || <p>No data</p>}
						</div>
					</div>
				</div>
				<div className="dashboard__challenges">
					<div className="dashboard__challenges__inner">
						<div className="dashboard__challenges__header">
							<Link to={`/client/${activeClient.id}`}>
								→ Edit client (<span>KPN</span>)
							</Link>
							<button
								onClick={() => history.push(`/challenge/${activeClient.id}`)}
							>
								<img src={plus} alt="" /> <span>Add challenge</span>
							</button>
						</div>

						<div className="dashboard__challenges__body">
							<h1>Challenges</h1>
							<br />
							<div className="dashboard__challenges__body__inner">
								{(activeClient.challenges.length &&
									activeClient.challenges.map((item, i) => {
										return (
											<SingleChallenge
												item={item}
												activeClientId={activeClient.id}
												key={i}
											/>
										);
									})) || <div className="no_data_container">No data</div>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

const mapStatetoProps = (state) => {
	return {
		allData: state.allDataRed.allData,
		activeClient: state.allDataRed.activeClient,
	};
};
const mapDispatchtoProps = (dispatch) => {
	return {
		allDataApi: function () {
			dispatch(allDataApi());
		},
		activeClientFunc: function (data) {
			dispatch(activeClientFunc(data));
		},
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Dashboard);
