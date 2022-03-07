export function storingRoute(history) {
	localStorage.setItem("active_url", history.location.pathname);
}
