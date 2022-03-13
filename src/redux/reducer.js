import { ALL_DATA, CHALLENGE_VIEW } from "./type";

const initialState = {
	allData: [],
	challengePreview: { picture: "", title: "", description: "" },
};

const allDataRed = (state = initialState, action) => {
	switch (action.type) {
		case ALL_DATA:
			return {
				...state,
				allData: action.payload,
				activeClient: action.payload[0],
			};
		case CHALLENGE_VIEW:
			localStorage.setItem("challengePreview", JSON.stringify(action.payload));
			return {
				...state,
				challengePreview: action.payload,
			};
		default:
			return state;
	}
};
export default allDataRed;
