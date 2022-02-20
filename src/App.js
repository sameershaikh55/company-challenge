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

// PAGES USER
import UserDashboard from "./pages/User/Dashboard";
import UseerChallenge from "./pages/User/Challenge";
import UseerAssignment from "./pages/User/Assignment";

function App() {
	return (
		<div className="app">
			<Switch>
				{/* ADMIN */}
				<Route exact path="/" component={AdminLogin} />
				<Route exact path="/dashboard" component={AdminDashboard} />
				<Route exact path="/addEditClient" component={AdminAddEditClient} />
				<Route exact path="/assignments" component={AdminAssignments} />
				<Route
					exact
					path="/addEditChallenge"
					component={AdminAddEditChallenge}
				/>
				<Route
					exact
					path="/addEditAssignment"
					component={AdminAddEditAssignment}
				/>
				{/* ADMIN */}

				{/* USER */}
				<Route exact path="/userDashboard" component={UserDashboard} />
				<Route exact path="/challenge" component={UseerChallenge} />
				<Route exact path="/assignment" component={UseerAssignment} />
				{/* USER */}
			</Switch>
		</div>
	);
}

export default App;
