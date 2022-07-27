/* eslint-disable no-undef */
import axios from 'axios';

const backendHttpInstance = () => {
  const axiosInstance = axios.create();
  axiosInstance.defaults.baseURL = process.env.REACT_APP_CONQUEST_SERVER_URL;
  axiosInstance.defaults.headers.common.Authorization = process.env.REACT_APP_CONQUEST_ACCESS_TOKEN;

  axiosInstance.interceptors.response.use(
    (config) => {
      // update jwt
      const { authorization } = config.headers;
      console.log(authorization);

      return config;
    },
    (error) => {
      error && console.log(error.response);

      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

const http = (endpoint, config) => {
  const axiosInstance = backendHttpInstance();
  return axiosInstance(endpoint, { ...config });
};

export const nextapi = (endpoint, config) => {
  const axiosInstance = axios.create();
  return axiosInstance(endpoint, { ...config });
};

export default http;