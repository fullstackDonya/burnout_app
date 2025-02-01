import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAxios = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
  },
});

MyAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default MyAxios;