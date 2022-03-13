import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../../layout";
import Popup from "../../../components/Popup";
import SingleAssignment from "../../../components/Admin/SingleAssignment";
import plus from "../../../assets/images/plus.svg";
import eye from "../../../assets/images/eye.svg";
import cloud from "../../../assets/images/cloud.svg";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { allDataApi, dragDropChangeHandle } from "../../../redux/action";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import { filterActiveClient } from "../../../utils/filterActiveClient";
import { doc, updateDoc } from "firebase/firestore";
import Loader from "../../../components/Loader";
import ExportExcelTable from "../../../components/ExportExcelTable";
import readXlsxFile from "read-excel-file";
import { dateTime } from "../../../utils/gettingTime";
import { database } from "../../../firebase";
import { generateID } from "../../../utils/generatingID";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Assignments = ({ allData, allDataApi, dragDropChangeHandle }) => {
	const { client_id, challenge_id } = useParams();
	const history = useHistory();

	useEffect(() => {
		storingRoute(history);
	}, [history]);

	const [popUp, setPopUp] = useState(false);
	const [uploadedFileData, setUploadedFileData] = useState();

	// FILTER TO GET ACTIVE CLIENT
	const activeClient = filterActiveClient(allData, client_id, "id");
	const activeClientChallenges =
		activeClient.length &&
		filterActiveClient(
			activeClient[0].challenges,
			challenge_id,
			"challenge_id"
		);

	// FILE UPLOAD API CALL
	const fileUploadToDatabase = async (uploadedFileData) => {
		// MAKING SEND ARRAY
		let assignments = [];
		for (let i = 1; i < uploadedFileData[0].length - 1; i++) {
			assignments.push({
				assignment_title: uploadedFileData[i][0],
				assignment_subtitle: uploadedFileData[i][1],
				assignment_description: uploadedFileData[i][2],
				assignment: uploadedFileData[i][3],
				video_url: uploadedFileData[i][4],
				assignment_password: uploadedFileData[i][5],
				media: "",
				assignment_created_at: dateTime(),
				assignment_id: generateID(25),
			});
		}

		// FIREBASE ADD FUNCTION
		await updateDoc(doc(database, "clients", client_id), {
			...activeClient[0],
			created_at: dateTime(),
			challenges: activeClient[0].challenges.map((content, i) =>
				content.challenge_id === activeClientChallenges[0].challenge_id
					? (content = {
							...activeClientChallenges[0],
							assignments: [
								...activeClientChallenges[0].assignments,
								...assignments,
							],
					  })
					: content
			),
		});

		setPopUp(false);
		allDataApi();
	};

	const children = (
		<div className="upload__assignment">
			<img src={cloud} alt="" />
			<input
				type="file"
				id="input"
				className="custom-file-input-upload"
				onChange={(e) => fileUpload(e.target.files[0])}
			/>
			<button
				disabled={(!uploadedFileData && true) || false}
				onClick={() => fileUploadToDatabase(uploadedFileData)}
			>
				Upload File
			</button>
		</div>
	);

	function fileUpload(file) {
		readXlsxFile(file).then((rows) => {
			setUploadedFileData(rows);
		});
	}

	// DRAG CHANGE HANDLE
	const handleDragEnd = async (e) => {
		if (!e.destination) return;
		let tempData = Array.from(
			activeClientChallenges &&
				activeClientChallenges[0].assignments.length &&
				activeClientChallenges[0].assignments
		);
		let [source_data] = tempData.splice(e.source.index, 1);
		tempData.splice(e.destination.index, 0, source_data);

		// LOCAL CHANGE HANDLE
		dragDropChangeHandle({
			...activeClient[0],
			created_at: dateTime(),
			challenges: activeClient[0].challenges.map((content, i) =>
				content.challenge_id === activeClientChallenges[0].challenge_id
					? (content = {
							...activeClientChallenges[0],
							assignments: tempData,
					  })
					: content
			),
		});

		// FIREBASE UPDATE FUNCTION
		await updateDoc(doc(database, "clients", client_id), {
			...activeClient[0],
			created_at: dateTime(),
			challenges: activeClient[0].challenges.map((content, i) =>
				content.challenge_id === activeClientChallenges[0].challenge_id
					? (content = {
							...activeClientChallenges[0],
							assignments: tempData,
					  })
					: content
			),
		});
	};

	// LOADER
	if (!allData.length) {
		return <Loader />;
	}

	return (
		<Layout>
			{popUp && (
				<Popup
					title="Upload Assignments"
					setPopUp={setPopUp}
					children={children}
				/>
			)}

			<div className="assignment">
				<div className="assignment__header">
					<button onClick={() => history.goBack()} className="go_back">
						← Go Back
					</button>
					<ul>
						<li>
							<button
								onClick={() =>
									history.push(`/assignment/${client_id}/${challenge_id}`)
								}
							>
								<img src={plus} alt="" />
							</button>
						</li>
						<li>
							<button onClick={() => setPopUp(true)}>Upload Assignments</button>
						</li>
						<li>
							<ExportExcelTable
								clientName={activeClient[0].client_name}
								challengeName={activeClientChallenges[0].challenge_name}
								assignmentList={
									activeClientChallenges[0].assignments.length &&
									activeClientChallenges[0].assignments
								}
							/>
						</li>
						<li>
							<button
								onClick={() =>
									history.push(`/assignments_view/${client_id}/${challenge_id}`)
								}
							>
								<img src={eye} alt="" />
							</button>
						</li>
					</ul>
				</div>

				<br />
				<br />

				<div className="assignment__title">
					<p>
						Client:{" "}
						<button onClick={() => history.push(`/client/${client_id}`)}>
							{activeClient[0].client_name}
						</button>
					</p>
					<p>
						Challenge:{" "}
						<button
							onClick={() =>
								history.push(`/challenge/${client_id}/${challenge_id}`)
							}
						>
							{activeClientChallenges[0].challenge_name}
						</button>
					</p>
				</div>

				<DragDropContext onDragEnd={handleDragEnd}>
					<div className="assignment__list">
						<h1>Assignments</h1>
						<br />
						<Droppable droppableId="droppable-1">
							{(provider) => (
								<div
									ref={provider.innerRef}
									{...provider.droppableProps}
									style={{
										justifyContent:
											!activeClientChallenges[0].assignments.length && "center",
										alignItems:
											!activeClientChallenges[0].assignments.length && "center",
									}}
									className="assignment__list__inner"
								>
									{activeClientChallenges[0].assignments.length &&
										activeClientChallenges[0].assignments.map((item, i) => (
											<Draggable
												key={item.assignment_id}
												draggableId={item.assignment_id}
												index={i}
											>
												{(provider) => (
													<div
														{...provider.draggableProps}
														ref={provider.innerRef}
													>
														<SingleAssignment
															providerProp={{ ...provider.dragHandleProps }}
															item={item}
															index={i}
															key={i}
															client_id={client_id}
															challenge_id={challenge_id}
														/>
													</div>
												)}
											</Draggable>
										))}
									{provider.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</DragDropContext>
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
		dragDropChangeHandle: function (data) {
			dispatch(dragDropChangeHandle(data));
		},
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Assignments);
