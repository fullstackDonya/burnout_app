import axios from 'axios';
const apiUrl = 'http://localhost:5060';

const myAxios = axios.create({
    baseURL: apiUrl, // Replace with your API base URL
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

// Add a request interceptor
myAxios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        console.log('Request Interceptor:', config);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default myAxios;