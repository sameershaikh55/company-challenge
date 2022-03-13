export function dateTime() {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	var currentdate = new Date();
	var datetime = `${
		months[currentdate.getMonth()]
	} ${currentdate.getDate()}, ${currentdate.getFullYear()} ${
		(currentdate.getHours() < 10 && `0${currentdate.getHours()}`) ||
		currentdate.getHours()
	}:${
		(currentdate.getMinutes() < 10 && `0${currentdate.getMinutes()}`) ||
		currentdate.getMinutes()
	}:${
		(currentdate.getSeconds() < 10 && `0${currentdate.getSeconds()}`) ||
		currentdate.getSeconds()
	}`;

	return datetime;
}
