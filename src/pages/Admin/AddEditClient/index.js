import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../../layout";
import deleteIcon from "../../../assets/images/delete.svg";
import Loader from "../../../components/Loader";
import Popup from "../../../components/Popup";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import { filterActiveClient } from "../../../utils/filterActiveClient";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { storage, database } from "../../../firebase";
import { dateTime } from "../../../utils/gettingTime";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { allDataApi } from "../../../redux/action";

const AddEditClient = ({ allData, allDataApi }) => {
	const { client_id } = useParams();
	const history = useHistory();

	useEffect(() => {
		storingRoute(history);
	}, [history]);

	// FILTER TO GET ACTIVE CLIENT
	const activeClient = filterActiveClient(allData, client_id, "id");

	// STATES
	const [inpChange, setInpChange] = useState("");
	const [uploadedImage, setUploadedImage] = useState();
	const [imgLoader, setImgLoader] = useState(false);
	const [popUp, setPopUp] = useState(false);

	useEffect(() => {
		if (activeClient.length && inpChange === "") {
			setInpChange(activeClient[0].client_name);
			setUploadedImage(activeClient[0].logo);
		}
	}, [activeClient, allData, inpChange]);

	// IMAGR HANDLER
	const formHandler = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		uploadFiles(file);
	};

	// IMAGE UPLOAD TO FIREBASE
	const uploadFiles = (file) => {
		setImgLoader(true);

		if (!file) return;
		const sotrageRef = ref(storage, `clients/${file.name}`);
		const uploadTask = uploadBytesResumable(sotrageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => console.log(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImgLoader(false);
					setUploadedImage(downloadURL);
				});
			}
		);
	};

	// FORM SUBMIT
	const handleSubmit = async () => {
		if (client_id) {
			// FIREBASE UPDATE FUNCTION
			await updateDoc(doc(database, "clients", client_id), {
				...activeClient[0],
				client_name: inpChange,
				created_at: dateTime(),
				logo: uploadedImage,
			});
		} else {
			// FIREBASE ADD FUNCTION
			await addDoc(collection(database, "clients"), {
				client_name: inpChange,
				created_at: dateTime(),
				logo: uploadedImage,
				challenges: [],
			});
		}

		history.goBack();
		allDataApi();
	};

	// CLIENT DELETE FUNCTION
	const deleteClient = async () => {
		await deleteDoc(doc(database, "clients", client_id));
		history.push("/dashboard");
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

	return (
		<Layout>
			{popUp && (
				<Popup title="Delete" setPopUp={setPopUp} children={children} />
			)}

			<div className="client__information">
				<div className="client__information__header">
					<h2>Client information</h2>
					<ul>
						<li>
							<button onClick={() => history.goBack()}>Cancel</button>
						</li>
						<li>
							<button
								disabled={inpChange && uploadedImage ? false : true}
								onClick={handleSubmit}
							>
								Save
							</button>
						</li>
						<li>
							<button
								disabled={client_id ? false : true}
								onClick={() => setPopUp(true)}
							>
								<img src={deleteIcon} alt="" />
							</button>
						</li>
					</ul>
				</div>

				<div className="client__information__input">
					<label htmlFor="Name">Name</label>
					<br />
					<input
						onChange={(e) => setInpChange(e.target.value)}
						value={inpChange}
						type="text"
					/>
				</div>

				<div className="client__information__uploader">
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
								(uploadedImage && uploadedImage) ||
								"https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
							}
							alt="client"
						/>
					)}
					<div className="client__information__uploader__right">
						<div>
							<input
								type="file"
								onChange={formHandler}
								className="custom-file-input"
							/>
						</div>
						<p>SVG or PNG - 200 x 200 px</p>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(AddEditClient);
