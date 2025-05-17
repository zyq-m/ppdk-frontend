import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API,
});

// Axios interceptor handle access token authentication
api.interceptors.request.use(
	function (config) {
		const token = sessionStorage.getItem("accessToken");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const token = await renewToken();

			sessionStorage.setItem("accessToken", token.data.accessToken);

			api.defaults.headers.common["Authorization"] =
				`Bearer ${token.data.accessToken}`;

			return api(originalRequest);
		}
		return Promise.reject(error);
	}
);

async function renewToken() {
	return axios({
		url: `${import.meta.env.VITE_API}/auth/refresh`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("refreshToken")}`,
		},
	});
}
