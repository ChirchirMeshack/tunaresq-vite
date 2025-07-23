import axios from "axios";
import { BASE_URL } from "config";
import useLocalStorage from "@hooks/use-local-storage";

const axiosInstance = axios.create({
	baseURL: BASE_URL
});

export const authenticatedAxiosInstance = axios.create({
	baseURL: BASE_URL
});

// Add request interceptor to include authentication token
authenticatedAxiosInstance.interceptors.request.use(
	async (config) => {
		try {
			const { retrieveItem } = useLocalStorage();
			const token = await retrieveItem("tunaresq-access-token");
			
			console.log('Retrieved token:', token ? 'Token exists' : 'No token found');
			
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
				console.log('Added Authorization header to request');
			} else {
				console.warn('No authentication token found');
			}
		} catch (error) {
			console.warn("Failed to retrieve auth token:", error);
		}
		
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add response interceptor to handle authentication errors
authenticatedAxiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response?.status === 401) {
			// Token is invalid or expired, redirect to login
			console.warn("Authentication failed, redirecting to login");
			// You can add navigation logic here if needed
			// window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
