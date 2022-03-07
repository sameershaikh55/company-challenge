import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../../layout";
import Loader from "../../../components/Loader";
import deleteIcon from "../../../assets/images/delete.svg";
import eye from "../../../assets/images/eye.svg";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import { generateID } from "../../../utils/generatingID";
import { filterActiveClient } from "../../../utils/filterActiveClient";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { allDataApi, challengePreview } from "../../../redux/action";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase";
import { dateTime } from "../../../utils/gettingTime";
import Popup from "../../../components/Popup";

const AddEditChallenge = ({ allData, allDataApi, challengePreview }) => {
	const history = useHistory();

	// GETTING PARAMS
	const { client_id, challenge_id } = useParams();

	// STORING ROUTES
	useEffect(() => {
		allDataApi();
		storingRoute(history);
	}, [allDataApi, history]);

	// STATES
	const [inpChange, setInpChange] = useState({
		challenge_contact: "",
		challenge_description: "",
		challenge_info: "",
		challenge_name: "",
		challenge_password_instruction: "",
		challenge_support: "",
		challenge_title: "",
	});
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

	useEffect(() => {
		challengePreview({
			picture: activeClient.length && activeClient[0].logo,
			title: inpChange.challenge_title,
			description: inpChange.challenge_description,
		});

		if (activeClientChallenges.length && inpChange.challenge_name === "") {
			// CHALLENGES DATA
			const addingChallengeData = (key) => {
				return activeClientChallenges[0][key];
			};

			setInpChange({
				challenge_contact: addingChallengeData("challenge_contact"),
				challenge_description: addingChallengeData("challenge_description"),
				challenge_info: addingChallengeData("challenge_info"),
				challenge_name: addingChallengeData("challenge_name"),
				challenge_password_instruction: addingChallengeData(
					"challenge_password_instruction"
				),
				challenge_support: addingChallengeData("challenge_support"),
				challenge_title: addingChallengeData("challenge_title"),
			});
		}
	}, [
		activeClient,
		activeClientChallenges,
		activeClientChallenges.length,
		allData,
		challengePreview,
		inpChange,
	]);

	// HANDLE CHANGE FOR INPUTS
	const handleChange = (e) => {
		const { name, value } = e.target;

		setInpChange((item) => {
			return { ...item, [name]: value };
		});
	};

	// FORM SUBMIT
	const handleSubmit = async () => {
		if (challenge_id) {
			// FIREBASE UPDATE FUNCTION
			await updateDoc(doc(database, "clients", client_id), {
				...activeClient[0],
				created_at: dateTime(),
				challenges: activeClient[0].challenges.map((content, i) =>
					content.challenge_id === activeClientChallenges[0].challenge_id
						? (content = {
								...activeClientChallenges[0],
								...inpChange,
								challenge_created_at: dateTime(),
						  })
						: content
				),
			});
		} else {
			// FIREBASE ADD FUNCTION
			await updateDoc(doc(database, "clients", client_id), {
				...activeClient[0],
				created_at: dateTime(),
				challenges: [
					...activeClient[0].challenges,
					{
						...inpChange,
						assignments: [],
						challenge_id: generateID(20),
						challenge_created_at: dateTime(),
						challenge_url: generateID(7),
					},
				],
			});
		}

		history.push("/");
	};

	// CLIENT DELETE FUNCTION
	const deleteClient = async () => {
		// FIREBASE UPDATE FUNCTION
		await updateDoc(doc(database, "clients", client_id), {
			...activeClient[0],
			created_at: dateTime(),
			challenges: activeClient[0].challenges.filter(
				(content) =>
					content.challenge_id !== activeClientChallenges[0].challenge_id &&
					content
			),
		});

		history.push("/");
	};

	// DELETE POPUP
	const children = (
		<div className="delete__assignment">
			<p>Are you sure you want to delete this!</p>
			<div>
				<button onClick={deleteClient}>Delete</button>
				<button onClick={() => setPopUp(false)}>Cancel</button>
			</div>
		</div>
	);

	// LOADER
	if (!allData.length) {
		return <Loader />;
	}

	return (
		<Layout>
			{popUp && (
				<Popup title="Delete" setPopUp={setPopUp} children={children} />
			)}

			<div className="add_edit_challenge">
				<div className="add_edit_challenge__header">
					<h2>Challenge information</h2>
					<ul>
						<li>
							<Link to="/">
								<button>Cancel</button>
							</Link>
						</li>
						<li>
							<button
								disabled={
									inpChange.challenge_name && inpChange.challenge_title
										? false
										: true
								}
								onClick={handleSubmit}
							>
								Save
							</button>
						</li>
						<li>
							<button
								onClick={() => setPopUp(true)}
								disabled={challenge_id ? false : true}
							>
								<img src={deleteIcon} alt="" />
							</button>
						</li>
						<li>
							<button
								disabled={
									inpChange.challenge_name && inpChange.challenge_description
										? false
										: true
								}
								onClick={() => history.push("/challenge")}
							>
								<img src={eye} alt="" />
							</button>
						</li>
					</ul>
				</div>

				<div className="add_edit_challenge__body">
					<div className="add_edit_challenge__body_row_one">
						<div>
							<label htmlFor="Name">Name</label>
							<br />
							<input
								value={inpChange.challenge_name}
								onChange={handleChange}
								name="challenge_name"
								type="text"
							/>
						</div>
						<div>
							<label htmlFor="Title">Title</label>
							<br />
							<input
								value={inpChange.challenge_title}
								onChange={handleChange}
								name="challenge_title"
								type="text"
							/>
						</div>
						<div>
							<label htmlFor="Contact">Contact</label>
							<br />
							<input
								value={inpChange.challenge_contact}
								onChange={handleChange}
								name="challenge_contact"
								type="text"
							/>
						</div>
					</div>

					<div className="add_edit_challenge__body_row_two">
						<div>
							<label htmlFor="Description">Description</label>
							<br />
							<textarea
								value={inpChange.challenge_description}
								onChange={handleChange}
								name="challenge_description"
								cols="30"
								rows="10"
							></textarea>
						</div>
						<div>
							<label htmlFor="PasswordInstruction">PasswordInstruction</label>
							<br />
							<textarea
								value={inpChange.challenge_password_instruction}
								onChange={handleChange}
								name="challenge_password_instruction"
								cols="30"
								rows="10"
							></textarea>
						</div>
					</div>

					<div className="add_edit_challenge__body_row_three">
						<div>
							<label htmlFor="Support">Support</label>
							<br />
							<textarea
								value={inpChange.challenge_support}
								onChange={handleChange}
								name="challenge_support"
								cols="30"
								rows="10"
							></textarea>
						</div>
					</div>

					<div className="add_edit_challenge__body_row_four">
						<div>
							<label htmlFor="Info">Info</label>
							<br />
							<textarea
								value={inpChange.challenge_info}
								onChange={handleChange}
								name="challenge_info"
								cols="30"
								rows="10"
							></textarea>
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
	};
};
const mapDispatchtoProps = (dispatch) => {
	return {
		allDataApi: function () {
			dispatch(allDataApi());
		},
		challengePreview: function (data) {
			dispatch(challengePreview(data));
		},
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AddEditChallenge);
