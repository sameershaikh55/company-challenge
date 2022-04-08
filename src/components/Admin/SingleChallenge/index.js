import React, { useState } from "react";
import { Link } from "react-router-dom";
import edit from "../../../assets/images/edit.svg";
import copy from "copy-to-clipboard";
import "./styles.css";

const SingleChallenge = ({ item, activeClientId }) => {
	const [copyState, setCopyState] = useState(false);
	const { challenge_name, challenge_title, challenge_url, challenge_id } = item;

	return (
		<div className="single__challenge">
			<div className="single__challenge__inner">
				<div className="single__challenge__header">
					<h4>{challenge_name}</h4>
					<div className="single__Challenge__header__right">
						{/* <Link
							to={`/challenge/${activeClientId}/${challenge_id}?view_mode=true`}
						>
							<img src={edit} alt="" />
						</Link> */}
						<Link to={`/challenge/${activeClientId}/${challenge_id}`}>
							<img src={edit} alt="" />
						</Link>
					</div>
				</div>

				<ul>
					<li>{challenge_title}</li>
				</ul>

				<div className="single__challenge__body">
					<div>
						<span className="single__challenge__body__url">URL</span>
						<span
							onMouseOver={() => setCopyState("copy")}
							onMouseOut={() => setCopyState(false)}
							onClick={() => {
								copy(`https://app.companychallenges.com/${challenge_url}`);
								setCopyState("copied");
							}}
							className="single__challenge__body__number"
						>
							/{challenge_url}
							{copyState && (
								<div
									data-aos="zoom-in"
									className="single__challenge__body__copytext"
								>
									{copyState === "copy" && "copy"}
									{copyState === "copied" && "copied!"}
								</div>
							)}
						</span>
					</div>
					<Link to={`/assignments/${activeClientId}/${challenge_id}`}>
						Assignments
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SingleChallenge;
