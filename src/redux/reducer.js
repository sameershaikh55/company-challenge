import { ALL_DATA, ACTIVE_CLIENT, CHALLENGE_VIEW } from "./type";

const initialState = {
	allData: [],
	activeClient: null,
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
		case ACTIVE_CLIENT:
			return {
				...state,
				activeClient: action.payload,
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
