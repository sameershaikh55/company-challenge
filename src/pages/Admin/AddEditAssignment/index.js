import React, { useState } from "react";
import "./styles.css";
import Layout from "../../../layout";
import deleteIcon from "../../../assets/images/delete.svg";
import eye from "../../../assets/images/eye.svg";
import info from "../../../assets/images/info.svg";
import Popup from "../../../components/Popup";

const AddEditAssignment = () => {
	const [popUp, setPopUp] = useState(false);

	const children = (
		<div className="delete__assignment">
			<p>Are you sure you want to delete this!</p>
			<div>
				<button>Delete</button>
				<button>Cancel</button>
			</div>
		</div>
	);

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
							<button>Cancel</button>
						</li>
						<li>
							<button>Save</button>
						</li>
						<li>
							<button onClick={() => setPopUp(true)}>
								<img src={deleteIcon} alt="" />
							</button>
						</li>
						<li>
							<button>
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
							<input type="text" name="" id="" />
						</div>
						<div>
							<label htmlFor="Subtitle">Subtitle</label>
							<br />
							<input type="text" name="" id="" />
						</div>
					</div>

					<div className="add_edit_assignment__body_row_two">
						<div>
							<label htmlFor="Description">Description</label>
							<br />
							<textarea name="" id="" cols="30" rows="10"></textarea>
						</div>
					</div>

					<div className="add_edit_assignment__body_row_three">
						<div>
							<label htmlFor="Asignment">Asignment</label>
							<br />
							<textarea name="" id="" cols="30" rows="10"></textarea>
						</div>
					</div>

					<div className="add_edit_assignment__body_row_four">
						<div className="col-2">
							<button>Upload image</button>
							<br />
							<p>JPEG, PNG, GIF - (800 x 600px)</p>
						</div>
						<div className="col-8">
							<label htmlFor="Video URL">Video URL</label>
							<br />
							<input type="text" name="" id="" />
						</div>
						<div className="col-2">
							<label htmlFor="Password">Password</label>
							<br />
							<div>
								<input type="text" name="" id="" />
								<img src={info} alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AddEditAssignment;
