import React, { useEffect } from "react";
import "./styles.css";
import info from "../../../assets/images/info.svg";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import { connect } from "react-redux";

const Challenge = ({ challengePreview }) => {
	const history = useHistory();
	const challengePreviewStorage = JSON.parse(
		localStorage.getItem("challengePreview")
	);

	useEffect(() => {
		storingRoute(history);
	}, [history]);

	return (
		<div className="user__challenge">
			<div className="user__challenge__inner">
				<div className="user__challenge__header">
					<img
						className="user__challenge__icon"
						src={challengePreviewStorage.picture}
						alt=""
					/>
					<ul>
						<li>
							<button>Start</button>
						</li>
						<li>
							<button>
								<img src={info} alt="" />
							</button>
						</li>
					</ul>
				</div>

				<h3>{challengePreviewStorage.title}</h3>

				<div className="user__challenge__body">
					{challengePreviewStorage.description}
				</div>
			</div>
		</div>
	);
};

const mapStatetoProps = (state) => {
	return {
		challengePreview: state.allDataRed.challengePreview,
	};
};

export default connect(mapStatetoProps, null)(Challenge);
