import React from "react";

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
import UseerChallenge from "./pages/User/Challenge";
import UseerAssignment from "./pages/User/Assignment";

function App() {
	const routes = [
		{
			route: "/",
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
		{
			route: ["/assignments_view/:client_id/:challenge_id"],
			page: UserDashboard,
		},
		{
			route: "/challenge",
			page: UseerChallenge,
		},
		{
			route: "/assignment",
			page: UseerAssignment,
		},
	];

	return (
		<div className="app">
			<Switch>
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

export default App;
