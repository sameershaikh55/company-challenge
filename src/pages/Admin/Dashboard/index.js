import React from "react";
import "./styles.css";
import Layout from "../../../layout";
import plus from "../../../assets/images/plus.svg";
import search from "../../../assets/images/search.svg";
import SingleClient from "../../../components/Admin/SingleClient";
import SingleChallenge from "../../../components/Admin/SingleChallenge";
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<Layout>
			<div className="dashboard">
				<div className="dashboard__clients">
					<div className="dashboard__clients__inner">
						<button>
							<img src={plus} alt="" /> <span>Add new client</span>
						</button>

						<div className="dashboard__clients__header">
							<h2>Clients</h2>
							<img src={search} alt="" />
						</div>

						<div className="dashboard__clients__body">
							{[1, 1, 1, 1].map(() => {
								return <SingleClient />;
							})}
						</div>
					</div>
				</div>
				<div className="dashboard__challenges">
					<div className="dashboard__challenges__inner">
						<div className="dashboard__challenges__header">
							<Link to="/addEditClient">
								→ Edit client (<span>KPN</span>)
							</Link>
							<button>
								<img src={plus} alt="" /> <span>Add challenge</span>
							</button>
						</div>

						<div className="dashboard__challenges__body">
							<h1>Challenges</h1>
							<br />
							<div className="dashboard__challenges__body__inner">
								{[1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => {
									return <SingleChallenge />;
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
