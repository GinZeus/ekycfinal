import axios from 'axios';
import { SERVER_API_URL } from './constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const instance = axios.create({
  baseURL: SERVER_API_URL,
  timeout: TIMEOUT,
});

const onRequestSuccess = (config: any) => {
  const token = localStorage.getItem('access_key') || sessionStorage.getItem('access_key');
  if (token) {
    config.headers = { ...config.headers, 'X-AccessKey': token };
  }
  return config;
};

const onResponseSuccess = (response: any) => response;

// const onResponseError = (err: any) => {
//   const status = err.status || (err.response ? err.response.status : 0);
//     if (status >= 400 && status < 500) {
//       handleClientErrors(err.response);
//     }
//     return Promise.reject(err);
// };

instance.interceptors.request.use(onRequestSuccess);
instance.interceptors.response.use(onResponseSuccess);

export default instance;
