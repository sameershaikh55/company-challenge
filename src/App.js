import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Authentication";

// This is a React Router v6 app
import { Switch, Route } from "react-router-dom";

// GLOBAL CSS
import "./App.css";

// PAGES ADMIN
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminAddEditClient from "./pages/Admin/AddEditClient";
import AdminAssignments from "./pages/Admin/Assignments";
import AdminAddEditChallenge from "./pages/Admin/AddEditChallenge";
import AdminAddEditAssignment from "./pages/Admin/AddEditAssignment";
import ProtectedRoute from "./Authentication/ProtectedRoute";

// PAGES USER
import UserDashboard from "./pages/User/Dashboard";
import UserChallenge from "./pages/User/Challenge";
import UseerAssignment from "./pages/User/Assignment";
import { connect } from "react-redux";
import { allDataApi } from "./redux/action";
import Loader from "./components/Loader";

function App({ allData, allDataApi }) {
	const { user } = useContext(AuthContext);

	const routes = [
		{
			route: ["/", "/dashboard", "/dashboard/:client_id"],
			page: AdminDashboard,
		},
		{
			route: ["/client", "/client/:client_id"],
			page: AdminAddEditClient,
		},
		{
			route: "/assignments/:client_id/:challenge_id",
			page: AdminAssignments,
		},
		{
			route: ["/challenge/:client_id", "/challenge/:client_id/:challenge_id"],
			page: AdminAddEditChallenge,
		},
		{
			route: [
				"/assignment/:client_id/:challenge_id",
				"/assignment/:client_id/:challenge_id/:assignment_id",
			],
			page: AdminAddEditAssignment,
		},
	];

	const publicUrls = [
		{
			route: ["/assignments_view/:client_id/:challenge_id"],
			page: UserDashboard,
		},
		{
			route: ["/assignment_view/:client_id/:challenge_id/:assignment_id"],
			page: UseerAssignment,
		},
	];

	useEffect(() => {
		// if (user) {
		allDataApi();
		// }
	}, [user]);

	const fetchingChallengeRoutes = allData
		.map((item) => {
			const fetchingChallenges = item.challenges.map((item2) => {
				return `/${item2.challenge_url}`;
			});

			return fetchingChallenges;
		})
		.flat(10);

	// LOADER
	if (!allData.length) {
		return <Loader />;
	}

	return (
		<div className="app">
			<Switch>
				{fetchingChallengeRoutes.length &&
					fetchingChallengeRoutes.map((item, i) => {
						return (
							<Route exact path={item} component={UserChallenge} key={i} />
						);
					})}

				{publicUrls.map((item, i) => {
					return (
						<Route key={i} exact path={item.route} component={item.page} />
					);
				})}

				{/* ADMIN */}
				<Route exact path="/login" component={AdminLogin} />

				{routes.map((item, i) => {
					return (
						<ProtectedRoute
							key={i}
							exact
							path={item.route}
							component={item.page}
						/>
					);
				})}
			</Switch>
		</div>
	);
}

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

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
