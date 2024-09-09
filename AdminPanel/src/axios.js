import axios from 'axios';

axios.interceptors.request.use(
	(cfg) => {
		const config = { ...cfg };
		const token = localStorage.getItem('token');
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		}
		return config;
	},
	(error) => Promise.reject(error),
);

export default axios;
