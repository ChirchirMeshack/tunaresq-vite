import axios from "axios";
import { BASE_URL, PATHS } from "config";

const axiosInstance = axios.create({
	baseURL: BASE_URL
});

export const authenticatedAxiosInstance = axios.create({
	baseURL: BASE_URL,
	withCredentials: true, // This tells axios to send cookies with requests
});

// Response interceptor to handle token refresh and errors
authenticatedAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If we get a 401 and haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call your refresh token endpoint
        // The refresh token should also be an httpOnly cookie
        await authenticatedAxiosInstance.post('/auth/refresh-token/');
        
        // Retry the original request
        return authenticatedAxiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = PATHS.login(window.location.pathname);
        return Promise.reject(refreshError);
      }
    }

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
      // window.location.href = PATHS.login(window.location.pathname);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
