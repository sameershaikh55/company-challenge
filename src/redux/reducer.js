import { ALL_DATA, CHALLENGE_VIEW, DRAG_DROP_HANDLE } from "./type";

const initialState = {
	allData: [],
};

const allDataRed = (state = initialState, action) => {
	switch (action.type) {
		case ALL_DATA:
			return {
				...state,
				allData: action.payload,
			};
		case DRAG_DROP_HANDLE:
			return {
				...state,
				allData: state.allData.map((item) =>
					item.id === action.payload.id ? (item = action.payload) : item
				),
			};
		default:
			return state;
	}
};
export default allDataRed;
