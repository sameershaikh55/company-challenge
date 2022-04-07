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
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase";
import { dateTime } from "../../../utils/gettingTime";
import Popup from "../../../components/Popup";
import UserChallenge from "../../User/Challenge";
import { allDataApi } from "../../../redux/action";
import TextEditor from "../../../components/TextEditor";
import {
	EditorState,
	ContentState,
	convertToRaw,
	convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

const AddEditChallenge = ({ allData, allDataApi }) => {
	const history = useHistory();

	// GETTING PARAMS
	const { client_id, challenge_id } = useParams();

	// STORING ROUTES
	useEffect(() => {
		storingRoute(history);
	}, [history]);

	// STATES
	let editorState = EditorState.createEmpty();

	const [inpChange, setInpChange] = useState({
		challenge_contact: "",
		challenge_description: editorState,
		challenge_info: editorState,
		challenge_name: "",
		challenge_password_instruction: editorState,
		challenge_support: editorState,
		challenge_title: "",
		challenge_background_color: "#f4f4f4",
	});
	const [popUp, setPopUp] = useState(false);
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

	useEffect(() => {
		if (activeClientChallenges.length && inpChange.challenge_name === "") {
			// CHALLENGES DATA
			const addingChallengeData = (key) => {
				return activeClientChallenges[0][key];
			};

			// EDITOR'S HTML INTO EDITOR OBJECT FORMAT
			const htmlIntoEditor = (key) => {
				return EditorState.createWithContent(
					ContentState.createFromBlockArray(
						convertFromHTML(addingChallengeData(key))
					)
				);
			};

			setInpChange({
				challenge_contact: addingChallengeData("challenge_contact"),
				challenge_description: htmlIntoEditor("challenge_description"),
				challenge_info: htmlIntoEditor("challenge_info"),
				challenge_name: addingChallengeData("challenge_name"),
				challenge_password_instruction: htmlIntoEditor(
					"challenge_password_instruction"
				),
				challenge_support: htmlIntoEditor("challenge_support"),
				challenge_title: addingChallengeData("challenge_title"),
				challenge_background_color: addingChallengeData(
					"challenge_background_color"
				),
			});
		}
	}, [
		activeClient,
		activeClientChallenges,
		activeClientChallenges.length,
		allData,
	]);

	// HANDLE CHANGE FOR INPUTS
	const handleChange = (e) => {
		const { name, value } = e.target;

		setInpChange((item) => {
			return { ...item, [name]: value };
		});
	};

	// HANDLE CHANGE FOR EDITORS
	const handleChangeEditor = (name, value) => {
		setInpChange((item) => {
			return { ...item, [name]: value };
		});
	};

	// FORM SUBMIT
	const handleSubmit = async () => {
		// CONVERTING EDITOR OBJECT INTO HTML
		const convertIntoHtml = (value) => {
			return draftToHtml(convertToRaw(value.getCurrentContent()));
		};

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
								challenge_description: convertIntoHtml(
									inpChange.challenge_description
								),
								challenge_info: convertIntoHtml(inpChange.challenge_info),
								challenge_password_instruction: convertIntoHtml(
									inpChange.challenge_password_instruction
								),
								challenge_support: convertIntoHtml(inpChange.challenge_support),
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
						challenge_description: convertIntoHtml(
							inpChange.challenge_description
						),
						challenge_info: convertIntoHtml(inpChange.challenge_info),
						challenge_password_instruction: convertIntoHtml(
							inpChange.challenge_password_instruction
						),
						challenge_support: convertIntoHtml(inpChange.challenge_support),
						challenge_id: generateID(20),
						challenge_created_at: dateTime(),
						challenge_url: generateID(7),
					},
				],
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
			challenges: activeClient[0].challenges.filter(
				(content) =>
					content.challenge_id !== activeClientChallenges[0].challenge_id &&
					content
			),
		});

		history.goBack();
		allDataApi();
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

	if (viewScreen) {
		return (
			<UserChallenge
				activeClient={activeClient}
				activeClientChallenges={activeClientChallenges}
				inpChange={inpChange}
				setViewScreen={setViewScreen}
			/>
		);
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
							<button onClick={() => history.goBack()}>Cancel</button>
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
								onClick={() => setViewScreen(true)}
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
						<div>
							<label htmlFor="Contact">Background Color</label>
							<br />
							<input
								value={inpChange.challenge_background_color}
								onChange={handleChange}
								name="challenge_background_color"
								type="color"
							/>
						</div>
					</div>

					<div className="add_edit_challenge__body_row_two">
						<div className="add_edit_challenge__body_row_two_col">
							<label htmlFor="Description">Description</label>
							<br />
							<TextEditor
								name="challenge_description"
								editorContent={inpChange.challenge_description}
								handleChangeEditor={handleChangeEditor}
							/>
						</div>
						<div className="add_edit_challenge__body_row_two_col">
							<label htmlFor="PasswordInstruction">PasswordInstruction</label>
							<br />
							<TextEditor
								name="challenge_password_instruction"
								editorContent={inpChange.challenge_password_instruction}
								handleChangeEditor={handleChangeEditor}
							/>
						</div>
					</div>

					<div className="add_edit_challenge__body_row_three">
						<div className="add_edit_challenge__body_row_three_col">
							<label htmlFor="Support">Support</label>
							<br />
							<TextEditor
								name="challenge_support"
								editorContent={inpChange.challenge_support}
								handleChangeEditor={handleChangeEditor}
							/>
						</div>
					</div>

					<div className="add_edit_challenge__body_row_four">
						<div className="add_edit_challenge__body_row_four_col">
							<label htmlFor="Info">Info</label>
							<br />
							<TextEditor
								name="challenge_info"
								editorContent={inpChange.challenge_info}
								handleChangeEditor={handleChangeEditor}
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

export default connect(mapStatetoProps, mapDispatchtoProps)(AddEditChallenge);
