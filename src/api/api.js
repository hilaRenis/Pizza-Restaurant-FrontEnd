import axios from "axios";
import {BASE_URL} from "./backend";

const REFRESH_TOKEN = `${BASE_URL}/auth/tokens/refresh`

const api = axios.create({
    baseURL: BASE_URL,
});

if (localStorage.getItem("jwtToken")) {
    api.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;
}

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const loadRefreshToken = localStorage.getItem('refreshToken');
                const response = await axios.put(REFRESH_TOKEN, null, {
                    headers: {
                        "Authorization": `Bearer ${loadRefreshToken}`
                    }
                });

                const {token, refreshToken} = response.data.data;

                localStorage.setItem('jwtToken', token);
                localStorage.setItem('refreshToken', refreshToken);
                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                localStorage.clear()
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
