import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8082"; 

const setupInterceptors = (store) => {
    axios.interceptors.request.use(
        (config) => {
            const token = store.getState().auth.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized access
                store.dispatch({ type: 'LOGOUT' });
            }
            return Promise.reject(error);
        }
    );
};

export default setupInterceptors;