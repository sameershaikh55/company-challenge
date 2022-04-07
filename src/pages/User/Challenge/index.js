import React, { useEffect, useState } from "react";
import "./styles.css";
import info from "../../../assets/images/info.svg";
import { useHistory } from "react-router-dom";
import { storingRoute } from "../../../utils/storingRoute";
import Popup from "../../../components/Popup";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const Challenge = ({
	activeClient,
	activeClientChallenges,
	inpChange,
	setViewScreen,
	allData,
}) => {
	const location = useLocation().pathname.split("/")[1];
	const [popUp, setPopUp] = useState(false);
	const history = useHistory();

	useEffect(() => {
		storingRoute(history);
	}, [history]);

	// CONVERTING EDITOR OBJECT INTO HTML
	const convertIntoHtml = (value) => {
		return (
			(inpChange && draftToHtml(convertToRaw(value.getCurrentContent()))) ||
			value
		);
	};

	const findingUrlData =
		!activeClient &&
		allData.filter((item) => {
			const fetchingChallenges = item.challenges.filter((item2) => {
				return item2.challenge_url === location;
			});

			return fetchingChallenges.length && item;
		});
	const findingUrlDataChallenge =
		!activeClient &&
		findingUrlData[0].challenges.filter(
			(item) => item.challenge_url === location
		);

	const children = (
		<div className="support__instruction__assignment">
			<p
				dangerouslySetInnerHTML={{
					__html: convertIntoHtml(
						(inpChange && inpChange.challenge_support) ||
							findingUrlDataChallenge[0].challenge_support
					),
				}}
				className="support__instruction__assignment__header"
			/>
			<br />
			<p
				dangerouslySetInnerHTML={{
					__html: convertIntoHtml(
						(inpChange && inpChange.challenge_info) ||
							(findingUrlDataChallenge &&
								"challenge_info" in findingUrlDataChallenge[0] &&
								findingUrlDataChallenge[0].challenge_info)
					),
				}}
				className="support__instruction__assignment__body"
			/>
		</div>
	);

	return (
		<>
			{popUp && (
				<Popup title="Support" setPopUp={setPopUp} children={children} />
			)}

			<div
				style={{
					background:
						(inpChange && inpChange.challenge_background_color) ||
						(findingUrlDataChallenge &&
							"challenge_background_color" in findingUrlDataChallenge[0] &&
							findingUrlDataChallenge[0].challenge_background_color),
				}}
				className="user__challenge"
			>
				<div className="user__challenge__inner">
					<div className="user__challenge__header">
						<img
							className="user__challenge__icon"
							src={
								(activeClient && activeClient[0].logo) || findingUrlData[0].logo
							}
							alt=""
						/>
						<ul>
							<li>
								{activeClient && (
									<button onClick={() => setViewScreen(false)}>← Back</button>
								)}
							</li>
							<li>
								<button
									onClick={() => {
										if (activeClient) {
											history.push(
												`/assignments_view/${activeClient[0].id}/${activeClientChallenges[0].challenge_id}`
											);
										} else {
											history.push(
												`/assignments_view/${findingUrlData[0].id}/${findingUrlDataChallenge[0].challenge_id}`
											);
										}
									}}
								>
									Start
								</button>
							</li>
							<li>
								<button onClick={() => setPopUp(true)}>
									<img src={info} alt="" />
								</button>
							</li>
						</ul>
					</div>

					<h3>
						{(inpChange && inpChange.challenge_title) ||
							findingUrlDataChallenge[0].challenge_title}
					</h3>

					<div
						dangerouslySetInnerHTML={{
							__html: convertIntoHtml(
								(inpChange && inpChange.challenge_description) ||
									findingUrlDataChallenge[0].challenge_description
							),
						}}
						className="user__challenge__body"
					/>
				</div>
			</div>
		</>
	);
};

const mapStatetoProps = (state) => {
	return {
		allData: state.allDataRed.allData,
	};
};

export default connect(mapStatetoProps, null)(Challenge);
