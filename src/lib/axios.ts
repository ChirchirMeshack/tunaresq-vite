import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "config";

// Basic axios instance without authentication
const axiosInstance = axios.create({
	baseURL: BASE_URL
});

// Type definitions for debugging utilities
interface DebugCookies {
  showAll: () => string;
  get: (name: string) => string | null;
  setTest: () => void;
  clearAll: () => void;
  testRequest: (endpoint?: string) => Promise<AxiosResponse | AxiosError>;
}

// Extend Window interface for debugging tools
declare global {
  interface Window {
    debugCookies: DebugCookies;
  }
}

// Extend InternalAxiosRequestConfig to include _retry property
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Authenticated axios instance with cookie support and extensive debugging
export const authenticatedAxiosInstance = axios.create({
	baseURL: BASE_URL,
	withCredentials: true, // Enable cookies for cross-origin requests
	headers: {
		'Content-Type': 'application/json',
	}
});

// Helper function to get token from cookies
const getTokenFromCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }
  return null;
};

// Helper function to get authentication token (tries multiple cookie names)
const getAuthToken = (): string | null => {
  // Try common cookie names for access token
  const possibleNames = ['access_token', 'access', 'accessToken', 'token'];
  
  for (const name of possibleNames) {
    const token = getTokenFromCookie(name);
    if (token) {
      console.log(`🔐 Found auth token in cookie: ${name}`);
      return token;
    }
  }
  
  console.warn('⚠️  No auth token found in cookies');
  return null;
};

// Request interceptor for debugging cookie issues and adding authentication
authenticatedAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const baseURL = config.baseURL || BASE_URL || '';
    const url = config.url || '';
    const fullURL = baseURL + url;

    // Get authentication token from cookies
    const accessToken = getAuthToken();
    
    // Add Authorization header if token exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.group('🚀 AXIOS REQUEST DEBUG');
    console.log('📍 Request URL:', fullURL);
    console.log('🌐 Frontend Domain:', window.location.hostname);
    console.log('🔐 Access Token Found:', !!accessToken);
    console.log('🔑 Authorization Header:', config.headers.Authorization || 'Not set');
    console.log('🍪 Available Cookies:', document.cookie || 'No cookies found');
    console.log('✅ withCredentials:', config.withCredentials);
    console.log('📋 Request Headers:', config.headers);
    
    // Check if cookies should be sent
    const cookies = document.cookie;
    if (!cookies) {
      console.warn('⚠️  NO COOKIES FOUND - Check if login/verify endpoint set cookies');
    } else {
      const cookieArray = cookies.split('; ');
      console.log('🔍 Cookie Details:');
      cookieArray.forEach(cookie => {
        const [name, value] = cookie.split('=');
        console.log(`   ${name}: ${value?.substring(0, 20)}...`);
      });
    }
    
    // Authentication warning if no token found
    if (!accessToken && !config.url?.includes('/auth/') && !config.url?.includes('/login/') && !config.url?.includes('/register/')) {
      console.warn('⚠️  NO AUTHENTICATION TOKEN - Request may fail with 401');
      console.warn('   Make sure your login/verify endpoint sets the access token cookie');
    }
    
    // Domain mismatch warning
    try {
      const requestDomain = new URL(baseURL || BASE_URL).hostname;
      const frontendDomain = window.location.hostname;
      if (requestDomain !== frontendDomain && !requestDomain.includes(frontendDomain)) {
        console.warn('⚠️  DOMAIN MISMATCH DETECTED:');
        console.warn(`   Frontend: ${frontendDomain}`);
        console.warn(`   Backend:  ${requestDomain}`);
        console.warn('   Cookies may not be sent due to domain mismatch!');
      }
    } catch (domainError) {
      console.warn('⚠️  Could not parse domain for comparison');
    }
    
    console.groupEnd();
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors with debugging
authenticatedAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.group('📥 AXIOS RESPONSE DEBUG');
    console.log('✅ Response Status:', response.status);
    console.log('🍪 Set-Cookie Headers:', response.headers['set-cookie'] || 'None');
    console.log('🔐 Access-Control-Allow-Credentials:', response.headers['access-control-allow-credentials']);
    console.log('🌍 Access-Control-Allow-Origin:', response.headers['access-control-allow-origin']);
    
    // Check cookies after response
    setTimeout(() => {
      console.log('🍪 Cookies After Response:', document.cookie || 'No cookies');
    }, 100);
    
    console.groupEnd();
    return response;
  },
  async (error: AxiosError) => {
    console.group('❌ AXIOS ERROR DEBUG');
    console.log('💥 Error Status:', error.response?.status);
    console.log('📍 Failed URL:', error.config?.url);
    console.log('🍪 Cookies at Error Time:', document.cookie || 'No cookies');
    console.log('🔑 Authorization Header at Error:', error.config?.headers?.Authorization || 'Not set');
    
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // If we get a 401 and haven't already tried to refresh
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('🔄 Attempting token refresh...');
        
        // Get refresh token from cookies
        const refreshToken = getTokenFromCookie('refresh_token') || getTokenFromCookie('refresh');
        
        if (!refreshToken) {
          console.error('❌ No refresh token found in cookies');
          throw new Error('No refresh token available');
        }
        
        // Call your refresh token endpoint - UPDATE THIS URL TO MATCH YOUR BACKEND
        const refreshResponse = await authenticatedAxiosInstance.post('/api/auth/token/refresh/', {
          refresh: refreshToken
        });
        
        console.log('✅ Token refresh successful:', refreshResponse.status);
        console.log('🍪 Cookies after refresh:', document.cookie);
        
        // Retry the original request with new token
        const newToken = getAuthToken();
        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        
        console.log('🔁 Retrying original request with new token...');
        return authenticatedAxiosInstance(originalRequest);
      } catch (refreshError) {
        const refreshErr = refreshError as AxiosError;
        console.error('❌ Token refresh failed:', refreshErr.response?.status);
        console.log('🍪 Cookies after failed refresh:', document.cookie);
        
        // Clear potentially invalid tokens
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // COMMENTED OUT FOR DEVELOPMENT - Uncomment in production
        // console.warn("Token refresh failed, redirecting to login");
        // window.location.href = PATHS.login(window.location.pathname);
        
        console.warn("🔧 LOGIN REDIRECT DISABLED FOR DEVELOPMENT");
        console.warn("   Uncomment the redirect lines for production");
        
        console.groupEnd();
        return Promise.reject(refreshError);
      }
    }

    // Handle other authentication errors
    if (error.response?.status === 401) {
      console.warn("❌ Authentication failed");
      console.warn("🔍 Debugging suggestions:");
      console.warn("   1. Check if access token cookie is set after login/verify");
      console.warn("   2. Verify cookie domain matches your frontend domain");
      console.warn("   3. Check if cookie is httpOnly (won't be visible in document.cookie)");
      console.warn("   4. Ensure backend CORS settings allow credentials");
      
      // COMMENTED OUT FOR DEVELOPMENT - Uncomment in production
      // console.warn("Redirecting to login...");
      // window.location.href = PATHS.login(window.location.pathname);
      
      console.warn("🔧 LOGIN REDIRECT DISABLED FOR DEVELOPMENT");
      console.warn("   Uncomment the redirect lines for production");
    }

    // Additional debugging for common cookie issues
    if (error.response?.status === 403) {
      console.warn("🚫 403 Forbidden - Possible CSRF token issue");
      console.log("🍪 Check if CSRF cookie is present:", document.cookie.includes('csrf'));
    }

    console.groupEnd();
    return Promise.reject(error);
  }
);

// Cookie debugging utilities - call these from console for testing
const debugCookies: DebugCookies = {
  // Check all cookies
  showAll: (): string => {
    console.log('🍪 All Cookies:', document.cookie || 'No cookies found');
    return document.cookie;
  },
  
  // Get specific cookie
  get: (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      if (cookieValue) {
        console.log(`🍪 ${name}:`, cookieValue);
        return cookieValue;
      }
    }
    console.log(`🍪 ${name}: Not found`);
    return null;
  },
  
  // Set test cookie
  setTest: (): void => {
    document.cookie = "test_cookie=test_value; path=/";
    console.log('🍪 Test cookie set. Check with debugCookies.get("test_cookie")');
  },
  
  // Clear all cookies (for testing)
  clearAll: (): void => {
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    console.log('🍪 All cookies cleared');
  },
  
  // Test axios request
  testRequest: async (endpoint: string = '/auth/me/'): Promise<AxiosResponse | AxiosError> => {
    console.log('🧪 Testing authenticated request...');
    try {
      const response = await authenticatedAxiosInstance.get(endpoint);
      console.log('✅ Test request successful:', response.status);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('❌ Test request failed:', axiosError.response?.status);
      return axiosError;
    }
  }
};

// Attach to window for global access
window.debugCookies = debugCookies;

console.log('🔧 Cookie debugging tools available at window.debugCookies');
console.log('   Usage:');
console.log('   - debugCookies.showAll() - Show all cookies');
console.log('   - debugCookies.get("access_token") - Get specific cookie');
console.log('   - debugCookies.setTest() - Set test cookie');
console.log('   - debugCookies.testRequest() - Test authenticated request');

export default axiosInstance;