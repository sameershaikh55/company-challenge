export const filterActiveClient = (data, id, valID) => {
	// FILTER TO GET ACTIVE CLIENT
	return data.filter((item) => item[valID] === id);
};
