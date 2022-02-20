import React from "react";
import "./styles.css";
import Layout from "../../../layout";
import deleteIcon from "../../../assets/images/delete.svg";
import eye from "../../../assets/images/eye.svg";

const AddEditChallenge = () => {
	return (
		<Layout>
			<div className="add_edit_challenge">
				<div className="add_edit_challenge__header">
					<h2>Challenge information</h2>
					<ul>
						<li>
							<button>Cancel</button>
						</li>
						<li>
							<button>Save</button>
						</li>
						<li>
							<button>
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

				<div className="add_edit_challenge__body">
					<div className="add_edit_challenge__body_row_one">
						<div>
							<label htmlFor="Name">Name</label>
							<br />
							<input type="text" name="" id="" />
						</div>
						<div>
							<label htmlFor="Title">Title</label>
							<br />
							<input type="text" name="" id="" />
						</div>
						<div>
							<label htmlFor="Contact">Contact</label>
							<br />
							<input type="text" name="" id="" />
						</div>
					</div>

					<div className="add_edit_challenge__body_row_two">
						<div>
							<label htmlFor="Description">Description</label>
							<br />
							<textarea name="" id="" cols="30" rows="10"></textarea>
						</div>
						<div>
							<label htmlFor="PasswordInstruction">PasswordInstruction</label>
							<br />
							<textarea name="" id="" cols="30" rows="10"></textarea>
						</div>
					</div>

					<div className="add_edit_challenge__body_row_three">
						<div>
							<label htmlFor="Support">Support</label>
							<br />
							<textarea name="" id="" cols="30" rows="10"></textarea>
						</div>
					</div>

					<div className="add_edit_challenge__body_row_four">
						<div>
							<label htmlFor="Info">Info</label>
							<br />
							<textarea name="" id="" cols="30" rows="10"></textarea>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AddEditChallenge;
