import React, { useState } from "react";
import "./styles.css";
import Layout from "../../../layout";
import Popup from "../../../components/Popup";
import SingleAssignment from "../../../components/Admin/SingleAssignment";
import plus from "../../../assets/images/plus.svg";
import eye from "../../../assets/images/eye.svg";
import cloud from "../../../assets/images/cloud.svg";
import { Link } from "react-router-dom";

const Assignments = () => {
	const [popUp, setPopUp] = useState(false);

	const children = (
		<div className="upload__assignment">
			<img src={cloud} alt="" />
			<p>Select file (.xls)</p>
			<button>Upload Assignments</button>
		</div>
	);

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
					<Link to="/addEditChallenge">→ Edit challenge</Link>
					<ul>
						<li>
							<button>
								<img src={plus} alt="" />
							</button>
						</li>
						<li>
							<button onClick={() => setPopUp(true)}>Upload Assignments</button>
						</li>
						<li>
							<button>
								<img src={eye} alt="" />
							</button>
						</li>
					</ul>
				</div>

				<br />
				<br />

				<div className="assignment__title">
					<p>
						Client: <span>KPN</span>
					</p>
					<p>
						Challenge: <span>Voorjaar 2022</span>
					</p>
				</div>

				<div className="assignment__list">
					<h1>Assignments</h1>
					<br />
					<div className="assignment__list__inner">
						{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => {
							return <SingleAssignment />;
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Assignments;
