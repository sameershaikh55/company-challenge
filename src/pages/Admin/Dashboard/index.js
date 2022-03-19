import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../../layout";
import Loader from "../../../components/Loader";
import plus from "../../../assets/images/plus.svg";
import search from "../../../assets/images/search.svg";
import cross from "../../../assets/images/cross.svg";
import SingleClient from "../../../components/Admin/SingleClient";
import SingleChallenge from "../../../components/Admin/SingleChallenge";
import selectIcon from "../../../assets/images/select-icon.svg";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { storingRoute } from "../../../utils/storingRoute";
import { filterActiveClient } from "../../../utils/filterActiveClient";
import { useParams } from "react-router-dom";

const Dashboard = ({ allData }) => {
	const history = useHistory();
	const { client_id } = useParams();

	// API CALL
	useEffect(() => {
		storingRoute(history);
	}, [history]);

	// FILTER TO GET ACTIVE CLIENT
	const activeClient =
		client_id && filterActiveClient(allData, client_id, "id");

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

	filteredData.sort(
		(date1, date2) => new Date(date2.created_at) - new Date(date1.created_at)
	);

	// CLIENT ID PUSHING
	// useEffect(() => {
	// 	if (!client_id && filteredData.length) {
	// 		history.push(`/dashboard/${filteredData[0].id}`);
	// 	}
	// }, [allData]);

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
							<div className="dashboard__clients__header__search">
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
							{filteredData.map((item, i) => {
								return <SingleClient item={item} key={i} />;
							}) || <p>No data</p>}
						</div>
					</div>
				</div>
				<div className="dashboard__challenges">
					<div
						style={{
							display: (!client_id && "flex") || "",
							justifyContent: (!client_id && "center") || "",
							alignItems: (!client_id && "center") || "",
						}}
						className="dashboard__challenges__inner"
					>
						{client_id && (
							<div className="dashboard__challenges__header">
								<Link to={`/client/${client_id && activeClient[0].id}`}>
									<span>
										→ Edit client (
										<span className="bold">{activeClient[0].client_name}</span>)
									</span>
								</Link>
								<button
									onClick={() =>
										history.push(
											`/challenge/${client_id && activeClient[0].id}`
										)
									}
								>
									<img src={plus} alt="" /> <span>Add challenge</span>
								</button>
							</div>
						)}

						{(client_id && (
							<div className="dashboard__challenges__body">
								<h1>Challenges</h1>
								<br />
								<div className="dashboard__challenges__body__inner">
									{(client_id &&
										activeClient[0].challenges.length &&
										activeClient[0].challenges.map((item, i) => {
											return (
												<SingleChallenge
													item={item}
													activeClientId={activeClient[0].id}
													key={i}
												/>
											);
										})) || <div className="no_data_container">No data</div>}
								</div>
							</div>
						)) || <img className="select-icon" src={selectIcon} alt="" />}
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

export default connect(mapStatetoProps, null)(Dashboard);
