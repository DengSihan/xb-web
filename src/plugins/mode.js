const getCurrentMode = () => {

	let { hostname } = window.location;

	return hostname === import.meta.env.VITE_APP_HOST
		? 'index'
		: hostname.split('.')[0];
}

export default getCurrentMode;