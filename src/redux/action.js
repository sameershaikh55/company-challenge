import { ALL_DATA, CHALLENGE_VIEW, DRAG_DROP_HANDLE } from "./type";

// IMPORTING FIREBASE
import { database } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const allDataFunc = (data) => {
	return {
		type: ALL_DATA,
		payload: data,
	};
};

export const allDataApi = () => {
	return (dispatch) => {
		getDocs(collection(database, "clients")).then((data) => {
			const mapingData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			dispatch(allDataFunc(mapingData));
		});
	};
};

// DRAG AND DROP DATA CHANGING
export const dragDropChangeHandle = (data) => {
	return {
		type: DRAG_DROP_HANDLE,
		payload: data,
	};
};

// ACTIVE CLIENT DATA
export const challengePreview = (data) => {
	return {
		type: CHALLENGE_VIEW,
		payload: data,
	};
};
