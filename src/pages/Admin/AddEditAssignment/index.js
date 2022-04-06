import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../../layout";
import deleteIcon from "../../../assets/images/delete.svg";
import eye from "../../../assets/images/eye.svg";
import Popup from "../../../components/Popup";
import AssignmentView from "../../User/Assignment";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../../../components/Loader";
import { filterActiveClient } from "../../../utils/filterActiveClient";
import { doc, updateDoc } from "firebase/firestore";
import { database, storage } from "../../../firebase";
import { dateTime } from "../../../utils/gettingTime";
import { generateID } from "../../../utils/generatingID";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { allDataApi } from "../../../redux/action";

const AddEditAssignment = ({ allData, allDataApi }) => {
	const history = useHistory();

	// URL PARAMS
	const { client_id, challenge_id, assignment_id } = useParams();

	useEffect(() => {
		storingRoute(history);
	}, [history]);

	// STATES
	const [inpChange, setInpChange] = useState({
		assignment: "",
		assignment_description: "",
		assignment_password: "",
		assignment_subtitle: "",
		assignment_title: "",
		media: "",
		video_url: "",
	});
	const [popUp, setPopUp] = useState(false);
	const [imgLoader, setImgLoader] = useState(false);
	const [viewScreen, setViewScreen] = useState(false);

	// FILTER TO GET ACTIVE CLIENT
	const activeClient = filterActiveClient(allData, client_id, "id");
	const activeClientChallenges =
		activeClient.length &&
		filterActiveClient(
			activeClient[0].challenges,
			challenge_id,
			"challenge_id"
		);
	const activeClientAssignment =
		activeClientChallenges.length &&
		filterActiveClient(
			activeClientChallenges[0].assignments,
			assignment_id,
			"assignment_id"
		);

	useEffect(() => {
		if (
			activeClientAssignment &&
			activeClientAssignment.length &&
			inpChange.assignment_title === ""
		) {
			// CHALLENGES DATA
			const addingAssignmentData = (key) => {
				return activeClientAssignment[0][key];
			};

			setInpChange({
				assignment: addingAssignmentData("assignment"),
				assignment_description: addingAssignmentData("assignment_description"),
				assignment_password: addingAssignmentData("assignment_password"),
				assignment_subtitle: addingAssignmentData("assignment_subtitle"),
				assignment_title: addingAssignmentData("assignment_title"),
				media: addingAssignmentData("media"),
				video_url: addingAssignmentData("video_url"),
			});
		}
	}, [activeClientAssignment, allData, inpChange.assignment_title]);

	// HANDLE CHANGE FOR INPUTS
	const handleChange = (e) => {
		const { name, value } = e.target;

		setInpChange((item) => {
			return { ...item, [name]: value };
		});

		if (name === "media") {
			const file = e.target.files[0];
			uploadFiles(file);
		}
	};

	// IMAGE UPLOAD TO FIREBASE
	const uploadFiles = (file) => {
		setImgLoader(true);

		if (!file) return;
		const sotrageRef = ref(storage, `assignments/${file.name}`);
		const uploadTask = uploadBytesResumable(sotrageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => console.log(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImgLoader(false);
					setInpChange((item) => {
						return { ...item, media: downloadURL };
					});
				});
			}
		);
	};

	const handleSubmit = async () => {
		if (assignment_id) {
			// FIREBASE UPDATE FUNCTION
			await updateDoc(doc(database, "clients", client_id), {
				...activeClient[0],
				created_at: dateTime(),
				challenges: activeClient[0].challenges.map((content, i) =>
					content.challenge_id === activeClientChallenges[0].challenge_id
						? (content = {
								...activeClientChallenges[0],
								challenge_created_at: dateTime(),
								assignments: activeClientChallenges[0].assignments.map(
									(content2) =>
										content2.assignment_id ===
										activeClientAssignment[0].assignment_id
											? {
													...activeClientAssignment[0],
													...inpChange,
													challenge_created_at: dateTime(),
											  }
											: content2
								),
						  })
						: content
				),
			});
		} else {
			// FIREBASE ADD FUNCTION
			await updateDoc(doc(database, "clients", client_id), {
				...activeClient[0],
				created_at: dateTime(),
				challenges: activeClient[0].challenges.map((content, i) =>
					content.challenge_id === activeClientChallenges[0].challenge_id
						? (content = {
								...activeClientChallenges[0],
								challenge_created_at: dateTime(),
								assignments: [
									...activeClientChallenges[0].assignments,
									{
										...inpChange,
										assignment_id: generateID(25),
										assignment_created_at: dateTime(),
									},
								],
						  })
						: content
				),
			});
		}

		history.goBack();
		allDataApi();
	};

	// CLIENT DELETE FUNCTION
	const deleteClient = async () => {
		// FIREBASE UPDATE FUNCTION
		await updateDoc(doc(database, "clients", client_id), {
			...activeClient[0],
			created_at: dateTime(),
			challenges: activeClient[0].challenges.map((content, i) =>
				content.challenge_id === activeClientChallenges[0].challenge_id
					? (content = {
							...activeClientChallenges[0],
							assignments: activeClientChallenges[0].assignments.filter(
								(content) =>
									content.assignment_id !==
										activeClientAssignment[0].assignment_id && content
							),
					  })
					: content
			),
		});

		history.goBack();
		allDataApi();
	};

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

	// VIEW SCREEN
	if (viewScreen) {
		return (
			<AssignmentView
				inpChange={inpChange}
				setViewScreen={setViewScreen}
				viewScreen={viewScreen}
			/>
		);
	}

	return (
		<Layout>
			{popUp && (
				<Popup title="Delete" setPopUp={setPopUp} children={children} />
			)}

			<div className="add_edit_assignment">
				<div className="add_edit_assignment__header">
					<h2>Assignment information</h2>
					<ul>
						<li>
							<button onClick={() => history.goBack()}>Cancel</button>
						</li>
						<li>
							<button
								disabled={
									inpChange.assignment_title && inpChange.assignment_subtitle
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
								disabled={assignment_id ? false : true}
								onClick={() => setPopUp(true)}
							>
								<img src={deleteIcon} alt="" />
							</button>
						</li>
						<li>
							<button
								disabled={
									inpChange.assignment_title && inpChange.assignment_subtitle
										? false
										: true
								}
								onClick={() => setViewScreen(true)}
							>
								<img src={eye} alt="" />
							</button>
						</li>
					</ul>
				</div>

				<div className="add_edit_assignment__body">
					<div className="add_edit_assignment__body_row_one">
						<div>
							<label htmlFor="Title">Title</label>
							<br />
							<input
								onChange={handleChange}
								value={inpChange.assignment_title}
								type="text"
								name="assignment_title"
							/>
						</div>
						<div>
							<label htmlFor="Subtitle">Subtitle</label>
							<br />
							<input
								onChange={handleChange}
								value={inpChange.assignment_subtitle}
								type="text"
								name="assignment_subtitle"
							/>
						</div>
					</div>

					<div className="add_edit_assignment__body_row_two">
						<div>
							<label htmlFor="Description">Description</label>
							<br />
							<textarea
								onChange={handleChange}
								value={inpChange.assignment_description}
								name="assignment_description"
								cols="30"
								rows="10"
							></textarea>
						</div>
					</div>

					<div className="add_edit_assignment__body_row_three">
						<div>
							<label htmlFor="Asignment">Assignment</label>
							<br />
							<textarea
								onChange={handleChange}
								value={inpChange.assignment}
								name="assignment"
								cols="30"
								rows="10"
							></textarea>
						</div>
					</div>

					<div className="add_edit_assignment__body_row_four">
						<div className="col-2 add_edit_assignment__body_row_four__right_inp">
							{(imgLoader && (
								<img
									className="loader_img"
									src={
										"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/480px-Loader.gif"
									}
									alt="loader"
								/>
							)) || (
								<img
									src={
										(inpChange.media && inpChange.media) ||
										"https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
									}
									alt="client"
								/>
							)}
							<div>
								<input
									className="custom-file-input"
									type="file"
									onChange={handleChange}
									name="media"
								/>
								<br />
								<p>JPEG, PNG, GIF - (800 x 600px)</p>
							</div>
						</div>
						<div className="col-8">
							<label htmlFor="Video URL">Video URL</label>
							<br />
							<input
								onChange={handleChange}
								value={inpChange.video_url}
								type="text"
								name="video_url"
							/>
						</div>
						<div className="col-2">
							<label htmlFor="Password">Password</label>
							<br />
							<input
								onChange={handleChange}
								value={inpChange.assignment_password}
								type="text"
								name="assignment_password"
							/>
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
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AddEditAssignment);
