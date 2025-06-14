import axios from 'axios';
import { store } from './store';
import { logout, setToken } from './authSlice';

const api = axios.create({
    baseURL: process.env.REACT_APP_DB_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});

// Track ongoing refresh requests to prevent race conditions
let isRefreshing = false;
let refreshPromise = null; // Store the actual refresh promise
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Attach access token when sending request
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if it's a 401 error and not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Mark request as retried to prevent infinite loops
            originalRequest._retry = true;

            if (isRefreshing) {
                // If already refreshing, wait for the same refresh promise
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    if (token) {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return api(originalRequest);
                    } else {
                        return Promise.reject(new Error('Token refresh failed'));
                    }
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            isRefreshing = true;

            // Create a single refresh promise that all requests will share
            refreshPromise = (async () => {
                try {
                    // this is only called for the first request that encounters a 401
                    // so the token is only refreshed once for all queued requests
                    // this is very important
                    /*
                    react render twice, so it will send two request when a api is called in an event handler or useEffect,
                    hence, we will receive two 401 errors, but we only want to refresh the token once,
                    that's why we use isRefreshing and refreshPromise to ensure that there is only one refresh request
                    and all other requests will wait for the same refresh promise
                    If we don't do this, we will end up with multiple refresh requests being sent to the server,
                    it will cause the first refresh token to be deleted from the database, resulting in the second request failing with a 401,
                    which fails to refresh the token as a result.
                    */
                    // Attempt to refresh the access token
                    const res = await axios.post('/user/refreshAccessToken', null, {
                        baseURL: process.env.REACT_APP_DB_URL,
                        withCredentials: true,
                        timeout: 10000
                    });

                    const { token: accessToken } = res.data;

                    // Update token in store
                    store.dispatch(setToken({
                        token: accessToken,
                        sessionKey: store.getState().auth.sessionKey
                    }));

                    // Process any queued requests with the new token
                    processQueue(null, accessToken);

                    return accessToken;

                } catch (refreshError) {
                    console.error('Error refreshing access token:', refreshError);

                    // Process failed queue - all queued requests will fail
                    processQueue(refreshError, null);

                    // Handle different refresh error scenarios
                    if (refreshError.response?.status === 401) {
                        // Refresh token is invalid/expired/already used
                        console.log('Refresh token expired, invalid, or already used - logging out');
                        store.dispatch(logout());

                        // Optional: Clear any remaining auth cookies
                        try {
                            await axios.post('/user/logout', null, {
                                baseURL: process.env.REACT_APP_DB_URL,
                                withCredentials: true,
                                timeout: 5000
                            });
                        } catch (logoutError) {
                            console.error('Logout request failed:', logoutError);
                        }
                    } else if (refreshError.response?.status === 403) {
                        console.log('Refresh forbidden - logging out');
                        store.dispatch(logout());
                    } else if (refreshError.code === 'ECONNABORTED' || refreshError.code === 'NETWORK_ERROR') {
                        console.log('Network error during token refresh - not logging out');
                    } else {
                        console.log('Unexpected error during token refresh:', refreshError.message);
                    }

                    throw refreshError;
                }
            })();

            try {
                // Wait for the refresh to complete
                const accessToken = await refreshPromise;

                // Update authorization header for original request
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                // Retry the original request
                return api(originalRequest);

            } catch (refreshError) {
                return Promise.reject(refreshError);
            } finally {
                // Reset state
                isRefreshing = false;
                refreshPromise = null;
            }
        }

        // Handle other errors
        return Promise.reject(error);
    }
);

export default api;