import React from "react";
import "./styles.css";
import Layout from "../../../layout";
import deleteIcon from "../../../assets/images/delete.svg";
import avtar from "../../../assets/images/clientIcon.svg";

const AddEditClient = () => {
	return (
		<Layout>
			<div className="client__information">
				<div className="client__information__header">
					<h2>Client information</h2>
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
					</ul>
				</div>

				<div className="client__information__input">
					<label htmlFor="Name">Name</label>
					<br />
					<input type="text" name="" id="" />
				</div>

				<div className="client__information__uploader">
					<img src={avtar} alt="" />
					<div className="client__information__uploader__right">
						<button>Upload icon</button>
						<p>SVG or PNG - 200 x 200 px</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AddEditClient;
